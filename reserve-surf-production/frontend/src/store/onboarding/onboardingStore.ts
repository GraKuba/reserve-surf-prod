import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { 
  OnboardingState, 
  OnboardingStep, 
  OnboardingUser, 
  AssessmentData, 
  EmergencyContact, 
  WaiverData, 
  LessonBooking, 
  PaymentData 
} from '@/types/onboarding'

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
        set((state: OnboardingState) => ({
          completedSteps: [...new Set([...state.completedSteps, step])]
        }))
      },

      updateUser: (data: Partial<OnboardingUser>) => {
        set((state: OnboardingState) => ({
          user: { ...state.user, ...data }
        }))
      },

      updateAssessment: (data: Partial<AssessmentData>) => {
        set((state: OnboardingState) => ({
          assessment: { ...state.assessment, ...data }
        }))
      },

      updateEmergencyContact: (data: Partial<EmergencyContact>) => {
        set((state: OnboardingState) => ({
          emergencyContact: { ...state.emergencyContact, ...data }
        }))
      },

      updateWaiver: (data: Partial<WaiverData>) => {
        set((state: OnboardingState) => ({
          waiver: { ...state.waiver, ...data }
        }))
      },

      updateBooking: (data: Partial<LessonBooking>) => {
        set((state: OnboardingState) => ({
          booking: { ...state.booking, ...data }
        }))
      },

      updatePayment: (data: Partial<PaymentData>) => {
        set((state: OnboardingState) => ({
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
      partialize: (state: OnboardingState) => ({
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
  const currentStep = useOnboardingStore((state: OnboardingState) => state.currentStep)
  const completedSteps = useOnboardingStore((state: OnboardingState) => state.completedSteps)
  const setCurrentStep = useOnboardingStore((state: OnboardingState) => state.setCurrentStep)
  const markStepCompleted = useOnboardingStore((state: OnboardingState) => state.markStepCompleted)
  const canAccessStep = useOnboardingStore((state: OnboardingState) => state.canAccessStep)

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
  const user = useOnboardingStore((state: OnboardingState) => state.user)
  const updateUser = useOnboardingStore((state: OnboardingState) => state.updateUser)
  return { user, updateUser }
}

export const useOnboardingAssessment = () => {
  const assessment = useOnboardingStore((state: OnboardingState) => state.assessment)
  const updateAssessment = useOnboardingStore((state: OnboardingState) => state.updateAssessment)
  return { assessment, updateAssessment }
}

export const useOnboardingBooking = () => {
  const booking = useOnboardingStore((state: OnboardingState) => state.booking)
  const updateBooking = useOnboardingStore((state: OnboardingState) => state.updateBooking)
  return { booking, updateBooking }
}

export const useOnboardingPayment = () => {
  const payment = useOnboardingStore((state) => state.payment)
  const updatePayment = useOnboardingStore((state) => state.updatePayment)
  return { payment, updatePayment }
}