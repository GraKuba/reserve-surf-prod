import { z } from 'zod'

// Auth schemas
export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .optional(),
  dateOfBirth: z.string()
    .refine((date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear()
      return age >= 13
    }, 'You must be at least 13 years old to sign up'),
  termsAccepted: z.boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
})

export const magicLinkSchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

// Assessment schemas
export const sportSelectionSchema = z.object({
  sport: z.enum(['surfing', 'kitesurfing', 'both'], {
    errorMap: () => ({ message: 'Please select a sport' })
  })
})

export const skillLevelSchema = z.object({
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert'], {
    errorMap: () => ({ message: 'Please select your skill level' })
  }),
  previousExperience: z.string().max(500, 'Please keep your answer under 500 characters').optional()
})

export const goalsSelectionSchema = z.object({
  goals: z.array(z.string()).min(1, 'Please select at least one goal').max(5, 'Please select up to 5 goals')
})

export const physicalInfoSchema = z.object({
  height: z.number()
    .min(100, 'Height must be between 100cm and 250cm')
    .max(250, 'Height must be between 100cm and 250cm')
    .optional(),
  weight: z.number()
    .min(30, 'Weight must be between 30kg and 300kg')
    .max(300, 'Weight must be between 30kg and 300kg')
    .optional(),
  shoeSize: z.string()
    .regex(/^(EU\s)?3[6-9]|4[0-9]|5[0]$/, 'Please enter a valid shoe size (e.g., EU 42)')
    .optional(),
  wetsuitSize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
    errorMap: () => ({ message: 'Please select a wetsuit size' })
  }).optional()
})

export const swimAbilitySchema = z.object({
  swimAbility: z.number()
    .min(1, 'Please rate your swimming ability')
    .max(10, 'Please rate your swimming ability'),
  medicalConditions: z.array(z.string()).optional(),
  specialRequirements: z.string()
    .max(500, 'Please keep special requirements under 500 characters')
    .optional()
})

// Emergency contact schema
export const emergencyContactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  relationship: z.enum(['parent', 'spouse', 'sibling', 'friend', 'other'], {
    errorMap: () => ({ message: 'Please select a relationship' })
  })
})

// Optional emergency contact for skipping
export const optionalEmergencyContactSchema = emergencyContactSchema.partial()

// Waiver schema
export const digitalWaiverSchema = z.object({
  agreed: z.boolean()
    .refine((val) => val === true, 'You must agree to the waiver to continue'),
  signedName: z.string()
    .min(2, 'Please enter your full legal name')
    .max(100, 'Name is too long'),
  signature: z.string()
    .min(1, 'Please provide your signature')
})

// Booking schemas
export const lessonSelectionSchema = z.object({
  lessonId: z.string().min(1, 'Please select a lesson'),
  participants: z.number()
    .min(1, 'At least 1 participant is required')
    .max(10, 'Maximum 10 participants allowed')
    .default(1)
})

export const bookingDateTimeSchema = z.object({
  date: z.string()
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Please select a future date'),
  timeSlot: z.string().min(1, 'Please select a time slot')
})

export const bookingDetailsSchema = z.object({
  equipmentRequests: z.array(z.string()).optional(),
  specialRequests: z.string()
    .max(500, 'Please keep special requests under 500 characters')
    .optional()
})

// Payment schemas
export const cardPaymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{13,19}$/, 'Please enter a valid card number')
    .transform(val => val.replace(/\s/g, '')),
  cardholderName: z.string()
    .min(2, 'Please enter the cardholder name')
    .max(100, 'Name is too long'),
  expiryMonth: z.string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Please enter a valid month (MM)'),
  expiryYear: z.string()
    .regex(/^\d{4}$/, 'Please enter a valid year (YYYY)')
    .refine((year) => {
      const currentYear = new Date().getFullYear()
      return parseInt(year) >= currentYear
    }, 'Card has expired'),
  cvv: z.string()
    .regex(/^\d{3,4}$/, 'Please enter a valid CVV'),
  billingZip: z.string()
    .min(3, 'Please enter a valid postal code')
    .max(10, 'Postal code is too long')
})

export const paypalPaymentSchema = z.object({
  paypalEmail: z.string().email('Please enter a valid PayPal email')
})

export const bankTransferSchema = z.object({
  accountName: z.string()
    .min(2, 'Please enter the account holder name')
    .max(100, 'Name is too long'),
  bankName: z.string()
    .min(2, 'Please enter the bank name')
    .max(100, 'Bank name is too long'),
  iban: z.string()
    .regex(/^[A-Z]{2}\d{2}[A-Z0-9]+$/, 'Please enter a valid IBAN')
    .optional(),
  accountNumber: z.string()
    .min(8, 'Please enter a valid account number')
    .max(20, 'Account number is too long')
    .optional(),
  routingNumber: z.string()
    .regex(/^\d{9}$/, 'Please enter a valid routing number (9 digits)')
    .optional()
}).refine((data) => data.iban || (data.accountNumber && data.routingNumber), {
  message: "Please provide either IBAN or Account/Routing numbers",
  path: ["accountNumber"],
})

// Combined payment schema with discriminated union
export const paymentMethodSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('card'),
    ...cardPaymentSchema.shape
  }),
  z.object({
    method: z.literal('paypal'),
    ...paypalPaymentSchema.shape
  }),
  z.object({
    method: z.literal('bank_transfer'),
    ...bankTransferSchema.shape
  })
])

// User profile update schema
export const userProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
    .optional(),
  dateOfBirth: z.string()
    .refine((date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear()
      return age >= 13
    }, 'You must be at least 13 years old'),
  avatarUrl: z.string().url('Please enter a valid URL').optional()
})

// Complete assessment form schema (combines all assessment steps)
export const completeAssessmentSchema = z.object({
  sport: sportSelectionSchema.shape.sport,
  skillLevel: skillLevelSchema.shape.skillLevel,
  goals: goalsSelectionSchema.shape.goals,
  physicalInfo: physicalInfoSchema,
  swimAbility: swimAbilitySchema.shape.swimAbility,
  medicalConditions: swimAbilitySchema.shape.medicalConditions,
  specialRequirements: swimAbilitySchema.shape.specialRequirements,
  previousExperience: skillLevelSchema.shape.previousExperience
})

// Complete booking form schema
export const completeBookingSchema = z.object({
  lessonId: lessonSelectionSchema.shape.lessonId,
  participants: lessonSelectionSchema.shape.participants,
  date: bookingDateTimeSchema.shape.date,
  timeSlot: bookingDateTimeSchema.shape.timeSlot,
  equipmentRequests: bookingDetailsSchema.shape.equipmentRequests,
  specialRequests: bookingDetailsSchema.shape.specialRequests
})

// Export type inferences
export type SignupFormData = z.infer<typeof signupSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type MagicLinkFormData = z.infer<typeof magicLinkSchema>
export type SportSelectionData = z.infer<typeof sportSelectionSchema>
export type SkillLevelData = z.infer<typeof skillLevelSchema>
export type GoalsSelectionData = z.infer<typeof goalsSelectionSchema>
export type PhysicalInfoData = z.infer<typeof physicalInfoSchema>
export type SwimAbilityData = z.infer<typeof swimAbilitySchema>
export type EmergencyContactData = z.infer<typeof emergencyContactSchema>
export type DigitalWaiverData = z.infer<typeof digitalWaiverSchema>
export type LessonSelectionData = z.infer<typeof lessonSelectionSchema>
export type BookingDateTimeData = z.infer<typeof bookingDateTimeSchema>
export type BookingDetailsData = z.infer<typeof bookingDetailsSchema>
export type CardPaymentData = z.infer<typeof cardPaymentSchema>
export type PaypalPaymentData = z.infer<typeof paypalPaymentSchema>
export type BankTransferData = z.infer<typeof bankTransferSchema>
export type PaymentMethodData = z.infer<typeof paymentMethodSchema>
export type UserProfileData = z.infer<typeof userProfileSchema>
export type CompleteAssessmentData = z.infer<typeof completeAssessmentSchema>
export type CompleteBookingData = z.infer<typeof completeBookingSchema>

// Helper function for async validation
export const validateAsync = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: boolean; data?: T; errors?: z.ZodError }> => {
  try {
    const validatedData = await schema.parseAsync(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

// Helper function to format Zod errors for display
export const formatZodErrors = (errors: z.ZodError): Record<string, string> => {
  const formatted: Record<string, string> = {}
  
  errors.errors.forEach((error) => {
    const path = error.path.join('.')
    if (!formatted[path]) {
      formatted[path] = error.message
    }
  })
  
  return formatted
}

// Helper function to get field-specific error
export const getFieldError = (errors: z.ZodError | undefined, field: string): string | undefined => {
  if (!errors) return undefined
  
  const fieldError = errors.errors.find((error) => 
    error.path.join('.') === field
  )
  
  return fieldError?.message
}