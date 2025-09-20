import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import EmergencyContact from '@/components/onboarding/EmergencyContact'
import { useOnboardingStep, useOnboardingStore } from '@/store/onboarding/onboardingStore'
import { ArrowLeft, ArrowRight, Shield, SkipForward } from 'lucide-react'
import type { OnboardingState } from '@/types/onboarding'

export default function EmergencyContactPage() {
  const navigate = useNavigate()
  const { markStepCompleted, setCurrentStep } = useOnboardingStep()
  const emergencyContact = useOnboardingStore((state: OnboardingState) => state.emergencyContact)
  const updateEmergencyContact = useOnboardingStore((state: OnboardingState) => state.updateEmergencyContact)

  const isComplete = emergencyContact.name && emergencyContact.phone && emergencyContact.relationship

  const handleNext = () => {
    if (!isComplete) return
    
    markStepCompleted('emergency')
    
    // Check if user came from new user flow
    const flowType = sessionStorage.getItem('onboarding-flow')
    if (flowType === 'new-user') {
      // Return to confirmation page or go to dashboard
      navigate('/onboarding/new-user/confirmation')
    } else {
      setCurrentStep('recommendations')
      navigate('/onboarding/recommendations')
    }
  }

  const handleSkip = () => {
    // Mark as completed even if skipped (user made conscious choice)
    markStepCompleted('emergency')
    
    // Check if user came from new user flow
    const flowType = sessionStorage.getItem('onboarding-flow')
    if (flowType === 'new-user') {
      // Return to confirmation page or go to dashboard
      navigate('/onboarding/new-user/confirmation')
    } else {
      setCurrentStep('recommendations')
      navigate('/onboarding/recommendations')
    }
  }

  const handleBack = () => {
    navigate('/onboarding/waiver')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <Card className="border-muted shadow-xl">
          <CardContent className="p-8">
            <EmergencyContact
              value={emergencyContact}
              onChange={updateEmergencyContact}
              onSkip={handleSkip}
            />

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="hover:-translate-y-1 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex gap-2">
                {!isComplete && (
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="hover:-translate-y-1 transition-all duration-200"
                  >
                    Skip
                    <SkipForward className="w-4 h-4 ml-2" />
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  disabled={!isComplete}
                  className="hover:-translate-y-1 transition-all duration-200"
                >
                  {isComplete ? 'Continue' : 'Please Complete Form'}
                  {isComplete ? (
                    <Shield className="w-4 h-4 ml-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}