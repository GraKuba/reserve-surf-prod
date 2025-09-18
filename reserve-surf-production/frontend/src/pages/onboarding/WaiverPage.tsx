import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import DigitalWaiver from '@/components/onboarding/DigitalWaiver'
import { useOnboardingStep, useOnboardingStore } from '@/store/onboarding/onboardingStore'
import { ArrowLeft, ArrowRight, FileCheck } from 'lucide-react'
import type { OnboardingState } from '@/types/onboarding'

export default function WaiverPage() {
  const navigate = useNavigate()
  const { markStepCompleted, setCurrentStep } = useOnboardingStep()
  const waiver = useOnboardingStore((state: OnboardingState) => state.waiver)
  const updateWaiver = useOnboardingStore((state: OnboardingState) => state.updateWaiver)

  const canProceed = waiver.agreed && waiver.signedName && waiver.signature

  const handleNext = () => {
    if (!canProceed) return
    
    markStepCompleted('waiver')
    setCurrentStep('emergency')
    navigate('/onboarding/emergency')
  }

  const handleBack = () => {
    navigate('/onboarding/assessment')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <Card className="border-muted shadow-xl">
          <CardContent className="p-8">
            <DigitalWaiver
              value={waiver}
              onChange={updateWaiver}
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

              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="hover:-translate-y-1 transition-all duration-200"
              >
                Continue
                {canProceed ? (
                  <FileCheck className="w-4 h-4 ml-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}