import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Phone, User, Heart, AlertTriangle, Info, UserPlus, Shield, Check, CheckCircle2, Loader2 } from 'lucide-react'
import { useMultiStepForm } from '@/hooks/useOnboardingForm'
import { emergencyContactSchema, optionalEmergencyContactSchema } from '@/schemas/onboarding.schemas'
import type { EmergencyContact as EmergencyContactType } from '@/types/onboarding'

interface EmergencyContactProps {
  value?: EmergencyContactType
  onChange: (data: EmergencyContactType) => void
  onSkip?: () => void
  onSubmit?: (data: EmergencyContactType) => void
  isOptional?: boolean
}

export default function EmergencyContactWithValidation({ 
  value = {}, 
  onChange,
  onSkip,
  onSubmit,
  isOptional = false
}: EmergencyContactProps) {
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const [skipConfirmed, setSkipConfirmed] = useState(false)

  const form = useMultiStepForm({
    schema: isOptional ? optionalEmergencyContactSchema : emergencyContactSchema,
    stepKey: 'emergency-contact',
    defaultValues: {
      name: value.name || '',
      phone: value.phone || '',
      relationship: value.relationship || ''
    },
    mode: 'onChange',
    onStepComplete: async (data) => {
      onChange(data)
      if (onSubmit) {
        await onSubmit(data)
      }
    }
  })

  const { watch, setValue, formState } = form

  // Watch for changes and update parent component
  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as EmergencyContactType)
    })
    return () => subscription.unsubscribe()
  }, [watch, onChange])

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')
    
    // Format as US phone number
    if (cleaned.length <= 3) {
      return cleaned
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    } else if (cleaned.length <= 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    } else {
      // International format
      return `+${cleaned.slice(0, cleaned.length - 10)} ${cleaned.slice(-10, -7)}-${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phone', formatted, { shouldValidate: true })
  }

  const handleSkip = () => {
    if (!skipConfirmed) {
      setShowSkipWarning(true)
      return
    }
    
    form.clearPersistedData()
    if (onSkip) {
      onSkip()
    }
  }

  const isComplete = form.isValid && formState.isDirty
  const hasPartialData = Object.values(watch()).some(v => v)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Emergency Contact</h2>
        <p className="text-muted-foreground">Who should we contact in case of emergency?</p>
      </div>

      {/* Why We Need This Info */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>Your Safety is Our Priority</AlertTitle>
        <AlertDescription>
          This information is only used in emergency situations and is kept strictly confidential. 
          We recommend providing a contact who can be reached during your lesson time.
        </AlertDescription>
      </Alert>

      {/* Contact Form */}
      <form onSubmit={form.submitHandler}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Emergency Contact Details
            </CardTitle>
            <CardDescription>
              Please provide someone we can contact if needed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Show form-level errors */}
            {formState.errors.root && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact Name
                {!isOptional && <span className="text-destructive">*</span>}
              </Label>
              <div className="relative">
                <Input
                  id="contact-name"
                  placeholder="e.g., Jane Doe"
                  {...form.register('name')}
                  disabled={form.isSubmitting}
                  className={cn(
                    form.hasFieldError('name') && "border-destructive",
                    formState.dirtyFields.name && !form.hasFieldError('name') && "border-primary"
                  )}
                />
                {formState.dirtyFields.name && !form.hasFieldError('name') && watch('name') && (
                  <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                )}
              </div>
              {form.hasFieldError('name') && (
                <p className="text-xs text-destructive">{form.getFieldError('name')}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
                {!isOptional && <span className="text-destructive">*</span>}
              </Label>
              <div className="relative">
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="555-123-4567 or +1234567890"
                  value={watch('phone')}
                  onChange={handlePhoneChange}
                  disabled={form.isSubmitting}
                  className={cn(
                    form.hasFieldError('phone') && "border-destructive",
                    formState.dirtyFields.phone && !form.hasFieldError('phone') && "border-primary"
                  )}
                />
                {formState.dirtyFields.phone && !form.hasFieldError('phone') && watch('phone') && (
                  <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Include country code for international numbers
              </p>
              {form.hasFieldError('phone') && (
                <p className="text-xs text-destructive">{form.getFieldError('phone')}</p>
              )}
            </div>

            {/* Relationship Field */}
            <div className="space-y-2">
              <Label htmlFor="relationship" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Relationship
                {!isOptional && <span className="text-destructive">*</span>}
              </Label>
              <Select 
                value={watch('relationship')} 
                onValueChange={(value) => setValue('relationship', value as any, { shouldValidate: true })}
                disabled={form.isSubmitting}
              >
                <SelectTrigger 
                  id="relationship"
                  className={cn(
                    form.hasFieldError('relationship') && "border-destructive",
                    formState.dirtyFields.relationship && !form.hasFieldError('relationship') && "border-primary"
                  )}
                >
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {form.hasFieldError('relationship') && (
                <p className="text-xs text-destructive">{form.getFieldError('relationship')}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Emergency Contacts (Optional) */}
        <Card className="border-dashed mt-4">
          <CardHeader>
            <CardTitle className="text-base">Additional Contacts (Optional)</CardTitle>
            <CardDescription>
              You can add more emergency contacts after completing your booking
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Completion Status */}
        <Card className={cn(
          "border-2 transition-colors mt-4",
          isComplete ? "border-green-500 bg-green-50 dark:bg-green-950/20" : 
          hasPartialData ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" : 
          "border-muted"
        )}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {isComplete ? (
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
              ) : hasPartialData ? (
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              )}
              <div className="space-y-2 flex-1">
                <p className={cn(
                  "font-medium",
                  isComplete ? "text-green-700 dark:text-green-400" : 
                  hasPartialData ? "text-yellow-700 dark:text-yellow-400" :
                  "text-muted-foreground"
                )}>
                  {isComplete ? "Emergency Contact Complete" : 
                   hasPartialData ? "Emergency Contact Incomplete" :
                   "No Emergency Contact Provided"}
                </p>
                
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2">
                  {watch('name') ? (
                    <Badge variant="default" className="text-xs">
                      <User className="w-3 h-3 mr-1" />
                      {watch('name')}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {!isOptional ? 'Name required' : 'Name not provided'}
                    </Badge>
                  )}
                  
                  {watch('phone') ? (
                    <Badge variant="default" className="text-xs">
                      <Phone className="w-3 h-3 mr-1" />
                      {watch('phone')}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {!isOptional ? 'Phone required' : 'Phone not provided'}
                    </Badge>
                  )}
                  
                  {watch('relationship') ? (
                    <Badge variant="default" className="text-xs">
                      <Heart className="w-3 h-3 mr-1" />
                      {watch('relationship')}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {!isOptional ? 'Relationship required' : 'Relationship not provided'}
                    </Badge>
                  )}
                </div>

                {/* Auto-save indicator */}
                {form.isSaving && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Auto-saving...
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skip Warning */}
        {showSkipWarning && !isComplete && isOptional && (
          <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 mt-4">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>Skip Emergency Contact?</AlertTitle>
            <AlertDescription className="space-y-3">
              <p>
                We strongly recommend providing an emergency contact for your safety. 
                This information is only used in case of emergency.
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="skip-confirm"
                  checked={skipConfirmed}
                  onCheckedChange={(checked) => setSkipConfirmed(checked as boolean)}
                />
                <Label htmlFor="skip-confirm" className="cursor-pointer text-sm">
                  I understand and want to skip this step
                </Label>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowSkipWarning(false)
                    setSkipConfirmed(false)
                  }}
                >
                  Go Back
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleSkip}
                  disabled={!skipConfirmed}
                >
                  Skip Anyway
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 justify-center">
          {/* Skip Option (if optional and not complete) */}
          {isOptional && !isComplete && !showSkipWarning && onSkip && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowSkipWarning(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip this step
            </Button>
          )}

          {/* Submit Button */}
          {onSubmit && (
            <Button
              type="submit"
              disabled={form.isSubmitting || (!isOptional && !form.isValid)}
              className="min-w-[150px]"
            >
              {form.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          )}
        </div>
      </form>

      {/* Privacy Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>🔒 Your emergency contact information is encrypted and stored securely.</p>
        <p>We will only use this information in case of an emergency.</p>
      </div>
    </div>
  )
}