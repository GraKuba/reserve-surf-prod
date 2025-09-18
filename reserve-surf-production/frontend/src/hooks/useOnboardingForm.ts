import { useForm } from 'react-hook-form'
import type { UseFormProps, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useOnboardingStore } from '../store/onboarding/onboardingStore'

interface UseOnboardingFormProps<T extends z.ZodType<any, any, any>, TFieldValues extends FieldValues = z.infer<T>> {
  schema: T
  defaultValues?: UseFormProps<TFieldValues>['defaultValues']
  mode?: UseFormProps<TFieldValues>['mode']
  onSubmit?: (data: TFieldValues) => void | Promise<void>
  persistKey?: string // Key to persist form data in localStorage
  autoSave?: boolean // Auto-save form data on change
  autoSaveDelay?: number // Delay before auto-saving (ms)
}

export function useOnboardingForm<T extends z.ZodType<any, any, any>, TFieldValues extends FieldValues = z.infer<T>>({
  schema,
  defaultValues,
  mode = 'onBlur',
  onSubmit,
  persistKey,
  autoSave = false,
  autoSaveDelay = 1000
}: UseOnboardingFormProps<T, TFieldValues>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  // Load persisted data if persistKey is provided
  const getPersistedData = () => {
    if (!persistKey) return defaultValues
    
    try {
      const stored = localStorage.getItem(`onboarding_form_${persistKey}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...defaultValues, ...parsed }
      }
    } catch (error) {
      console.error('Failed to load persisted form data:', error)
    }
    
    return defaultValues
  }
  
  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: getPersistedData(),
    mode,
    criteriaMode: 'all'
  })
  
  const { watch, handleSubmit, formState } = form
  
  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !persistKey) return
    
    const subscription = watch((value) => {
      // Clear existing timer
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
      
      // Set new timer
      const timer = setTimeout(() => {
        setIsSaving(true)
        try {
          localStorage.setItem(
            `onboarding_form_${persistKey}`,
            JSON.stringify(value)
          )
          setIsSaving(false)
        } catch (error) {
          console.error('Failed to auto-save form data:', error)
          setIsSaving(false)
        }
      }, autoSaveDelay)
      
      setAutoSaveTimer(timer)
    })
    
    return () => {
      subscription.unsubscribe()
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
    }
  }, [watch, persistKey, autoSave, autoSaveDelay])
  
  // Clear persisted data
  const clearPersistedData = () => {
    if (persistKey) {
      localStorage.removeItem(`onboarding_form_${persistKey}`)
    }
  }
  
  // Enhanced submit handler
  const submitHandler = handleSubmit(async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      if (onSubmit) {
        await onSubmit(data)
      }
      
      // Clear persisted data on successful submit
      clearPersistedData()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      setSubmitError(message)
      console.error('Form submission error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  })
  
  // Helper to check if a field has an error
  const hasFieldError = (fieldName: keyof TFieldValues): boolean => {
    return !!(formState.errors as any)[fieldName as string]
  }
  
  // Helper to get field error message
  const getFieldError = (fieldName: keyof TFieldValues): string | undefined => {
    const error = (formState.errors as any)[fieldName as string]
    return typeof error?.message === 'string' ? error.message : undefined
  }
  
  // Helper to check if form is valid
  const isValid = formState.isValid || Object.keys(formState.errors).length === 0
  
  return {
    ...form,
    submitHandler,
    isSubmitting,
    submitError,
    clearPersistedData,
    hasFieldError,
    getFieldError,
    isValid,
    isSaving,
    errors: formState.errors,
    isDirty: formState.isDirty,
    isValidating: formState.isValidating
  }
}

// Specialized hook for multi-step forms
interface UseMultiStepFormProps<T extends z.ZodType<any, any, any>, TFieldValues extends FieldValues = z.infer<T>> extends UseOnboardingFormProps<T, TFieldValues> {
  stepKey: string
  onStepComplete?: (data: TFieldValues) => void | Promise<void>
}

export function useMultiStepForm<T extends z.ZodType<any, any, any>, TFieldValues extends FieldValues = z.infer<T>>({
  stepKey,
  onStepComplete,
  ...props
}: UseMultiStepFormProps<T, TFieldValues>) {
  const { updateAssessment, markStepCompleted } = useOnboardingStore()
  
  const form = useOnboardingForm({
    ...props,
    persistKey: stepKey,
    autoSave: true,
    onSubmit: async (data) => {
      // Call the original onSubmit if provided
      if (props.onSubmit) {
        await props.onSubmit(data)
      }
      
      // Call step complete handler
      if (onStepComplete) {
        await onStepComplete(data)
      }
      
      // Update store and mark step as completed
      updateAssessment(data as any)
      markStepCompleted(stepKey as any)
    }
  })
  
  return form
}

// Hook for error recovery and retry logic
export function useFormErrorRecovery() {
  const [retryCount, setRetryCount] = useState(0)
  const [lastError, setLastError] = useState<Error | null>(null)
  const maxRetries = 3
  
  const handleError = (error: Error) => {
    setLastError(error)
    
    // Categorize errors for appropriate recovery
    if (error.message.includes('Network')) {
      return {
        type: 'network',
        message: 'Connection error. Please check your internet and try again.',
        canRetry: true
      }
    }
    
    if (error.message.includes('401') || error.message.includes('403')) {
      return {
        type: 'auth',
        message: 'Authentication error. Please log in again.',
        canRetry: false
      }
    }
    
    if (error.message.includes('422') || error.message.includes('validation')) {
      return {
        type: 'validation',
        message: 'Please check your input and try again.',
        canRetry: false
      }
    }
    
    if (error.message.includes('500') || error.message.includes('server')) {
      return {
        type: 'server',
        message: 'Server error. Please try again later.',
        canRetry: retryCount < maxRetries
      }
    }
    
    return {
      type: 'unknown',
      message: error.message || 'An unexpected error occurred.',
      canRetry: retryCount < maxRetries
    }
  }
  
  const retry = async (action: () => Promise<void>) => {
    if (retryCount >= maxRetries) {
      throw new Error('Maximum retry attempts exceeded')
    }
    
    setRetryCount(prev => prev + 1)
    
    try {
      await action()
      // Reset on success
      setRetryCount(0)
      setLastError(null)
    } catch (error) {
      if (error instanceof Error) {
        const recovery = handleError(error)
        if (!recovery.canRetry) {
          throw error
        }
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000)
        await new Promise(resolve => setTimeout(resolve, delay))
        return retry(action)
      }
      throw error
    }
  }
  
  const reset = () => {
    setRetryCount(0)
    setLastError(null)
  }
  
  return {
    handleError,
    retry,
    reset,
    retryCount,
    lastError,
    canRetry: retryCount < maxRetries
  }
}