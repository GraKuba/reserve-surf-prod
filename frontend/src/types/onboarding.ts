export interface OnboardingUser {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  avatarUrl?: string
}

export interface PhysicalInfo {
  height?: number
  weight?: number
  shoeSize?: string
  wetsuitSize?: string
}

export interface EmergencyContact {
  name?: string
  phone?: string
  relationship?: string
}

export interface AssessmentData {
  sport?: 'surfing' | 'kitesurfing' | 'both'
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  goals?: string[]
  physicalInfo?: PhysicalInfo
  swimAbility?: number
  previousExperience?: string
  medicalConditions?: string[]
  specialRequirements?: string
}

export interface WaiverData {
  agreed: boolean
  signature?: string
  signedName?: string
  signedDate?: string
  ipAddress?: string
}

export interface LessonBooking {
  lessonId?: string
  lessonTitle?: string
  instructorId?: string
  instructorName?: string
  date?: string
  timeSlot?: string
  duration?: number
  price?: number
  location?: string
  equipmentIncluded?: boolean
  groupSize?: number
  spotsAvailable?: number
}

export interface PaymentData {
  method?: 'card' | 'paypal' | 'bank_transfer'
  cardLast4?: string
  transactionId?: string
  amount?: number
  currency?: string
  status?: 'pending' | 'processing' | 'completed' | 'failed'
}

export type OnboardingStep = 
  | 'welcome'
  | 'auth'
  | 'assessment'
  | 'profile'
  | 'waiver'
  | 'emergency'
  | 'recommendations'
  | 'booking'
  | 'payment'
  | 'confirmation'

export interface OnboardingState {
  currentStep: OnboardingStep
  completedSteps: OnboardingStep[]
  user: OnboardingUser
  assessment: AssessmentData
  emergencyContact: EmergencyContact
  waiver: WaiverData
  booking: LessonBooking
  payment: PaymentData
  sessionId: string
  startedAt: string
  completedAt?: string
  
  // Actions
  setCurrentStep: (step: OnboardingStep) => void
  markStepCompleted: (step: OnboardingStep) => void
  updateUser: (data: Partial<OnboardingUser>) => void
  updateAssessment: (data: Partial<AssessmentData>) => void
  updateEmergencyContact: (data: Partial<EmergencyContact>) => void
  updateWaiver: (data: Partial<WaiverData>) => void
  updateBooking: (data: Partial<LessonBooking>) => void
  updatePayment: (data: Partial<PaymentData>) => void
  resetOnboarding: () => void
  canAccessStep: (step: OnboardingStep) => boolean
}

export interface Lesson {
  id: string
  title: string
  description: string
  sport: 'surfing' | 'kitesurfing'
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'
  instructor: {
    id: string
    name: string
    avatar: string
    rating: number
    specialties: string[]
  }
  duration: number
  groupSize: number
  price: number
  currency: string
  location: string
  images: string[]
  equipmentIncluded: boolean
  equipmentList?: string[]
  requirements?: string[]
  whatToExpect?: string[]
  availability: {
    date: string
    timeSlots: {
      time: string
      spotsAvailable: number
      totalSpots: number
    }[]
  }[]
  rating: number
  reviewCount: number
  tags: string[]
}

export interface BookingSummary {
  lesson: Lesson
  selectedDate: string
  selectedTime: string
  participants: number
  totalPrice: number
  equipmentRequests?: string[]
  specialRequests?: string
}