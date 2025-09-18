import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { OnboardingState, OnboardingStep } from '@/types/onboarding'

const STEP_ORDER: OnboardingStep[] = [
  'welcome',
  'auth',
  'assessment',
  'profile',
  'waiver',
  'emergency',
  'recommendations',
  'booking',
  'payment',
  'confirmation'
]

const STEP_DEPENDENCIES: Partial<Record<OnboardingStep, OnboardingStep[]>> = {
  assessment: ['auth'],
  profile: ['auth', 'assessment'],
  waiver: ['auth'],
  emergency: ['auth'],
  recommendations: ['auth', 'assessment'],
  booking: ['auth', 'assessment'],
  payment: ['auth', 'booking'],
  confirmation: ['auth', 'booking', 'payment']
}

const initialState = {
  currentStep: 'welcome' as OnboardingStep,
  completedSteps: [] as OnboardingStep[],
  user: {},
  assessment: {},
  emergencyContact: {},
  waiver: { agreed: false },
  booking: {},
  payment: {},
  sessionId: crypto.randomUUID(),
  startedAt: new Date().toISOString()
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step: OnboardingStep) => {
        set({ currentStep: step })
      },

      markStepCompleted: (step: OnboardingStep) => {
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])]
        }))
      },

      updateUser: (data) => {
        set((state) => ({
          user: { ...state.user, ...data }
        }))
      },

      updateAssessment: (data) => {
        set((state) => ({
          assessment: { ...state.assessment, ...data }
        }))
      },

      updateEmergencyContact: (data) => {
        set((state) => ({
          emergencyContact: { ...state.emergencyContact, ...data }
        }))
      },

      updateWaiver: (data) => {
        set((state) => ({
          waiver: { ...state.waiver, ...data }
        }))
      },

      updateBooking: (data) => {
        set((state) => ({
          booking: { ...state.booking, ...data }
        }))
      },

      updatePayment: (data) => {
        set((state) => ({
          payment: { ...state.payment, ...data }
        }))
      },

      resetOnboarding: () => {
        set({
          ...initialState,
          sessionId: crypto.randomUUID(),
          startedAt: new Date().toISOString()
        })
      },

      canAccessStep: (step: OnboardingStep) => {
        const state = get()
        const dependencies = STEP_DEPENDENCIES[step] || []
        
        // Check if all required steps are completed
        return dependencies.every(dep => state.completedSteps.includes(dep))
      }
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        user: state.user,
        assessment: state.assessment,
        emergencyContact: state.emergencyContact,
        waiver: state.waiver,
        booking: state.booking,
        payment: state.payment,
        sessionId: state.sessionId,
        startedAt: state.startedAt,
        completedAt: state.completedAt
      })
    }
  )
)

// Helper hooks for specific parts of the store
export const useOnboardingStep = () => {
  const currentStep = useOnboardingStore((state) => state.currentStep)
  const completedSteps = useOnboardingStore((state) => state.completedSteps)
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep)
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted)
  const canAccessStep = useOnboardingStore((state) => state.canAccessStep)

  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[currentIndex + 1]
      if (canAccessStep(nextStep)) {
        markStepCompleted(currentStep)
        setCurrentStep(nextStep)
        return true
      }
    }
    return false
  }

  const goToPreviousStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1])
      return true
    }
    return false
  }

  const progress = (completedSteps.length / (STEP_ORDER.length - 1)) * 100

  return {
    currentStep,
    completedSteps,
    setCurrentStep,
    markStepCompleted,
    canAccessStep,
    goToNextStep,
    goToPreviousStep,
    progress,
    stepOrder: STEP_ORDER
  }
}

export const useOnboardingUser = () => {
  const user = useOnboardingStore((state) => state.user)
  const updateUser = useOnboardingStore((state) => state.updateUser)
  return { user, updateUser }
}

export const useOnboardingAssessment = () => {
  const assessment = useOnboardingStore((state) => state.assessment)
  const updateAssessment = useOnboardingStore((state) => state.updateAssessment)
  return { assessment, updateAssessment }
}

export const useOnboardingBooking = () => {
  const booking = useOnboardingStore((state) => state.booking)
  const updateBooking = useOnboardingStore((state) => state.updateBooking)
  return { booking, updateBooking }
}

export const useOnboardingPayment = () => {
  const payment = useOnboardingStore((state) => state.payment)
  const updatePayment = useOnboardingStore((state) => state.updatePayment)
  return { payment, updatePayment }
}