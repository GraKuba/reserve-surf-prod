import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { QuizStepSkeleton } from '@/components/onboarding/skeletons/FormSkeleton'
import SportSelection from '@/components/onboarding/SportSelection'
import SkillLevel from '@/components/onboarding/SkillLevel'
import GoalsSelection from '@/components/onboarding/GoalsSelection'
import PhysicalInfo from '@/components/onboarding/PhysicalInfo'
import SwimAbility from '@/components/onboarding/SwimAbility'
import { useOnboardingStep, useOnboardingAssessment } from '@/store/onboarding/onboardingStore'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type AssessmentStep = 'sport' | 'skill' | 'goals' | 'physical' | 'swim'

export default function AssessmentQuiz() {
  const navigate = useNavigate()
  const { markStepCompleted, setCurrentStep } = useOnboardingStep()
  const { assessment, updateAssessment } = useOnboardingAssessment()
  const [currentAssessmentStep, setCurrentAssessmentStep] = useState<AssessmentStep>('sport')
  const [isLoading, setIsLoading] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const steps: { id: AssessmentStep; title: string; description: string }[] = [
    { id: 'sport', title: 'Sport Selection', description: 'Choose your activity' },
    { id: 'skill', title: 'Skill Level', description: 'Current experience' },
    { id: 'goals', title: 'Your Goals', description: 'What you want to achieve' },
    { id: 'physical', title: 'Physical Info', description: 'Equipment sizing' },
    { id: 'swim', title: 'Water Safety', description: 'Swimming & health' },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentAssessmentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const canProceed = () => {
    switch (currentAssessmentStep) {
      case 'sport':
        return !!assessment.sport
      case 'skill':
        return !!assessment.skillLevel
      case 'goals':
        return assessment.goals && assessment.goals.length > 0
      case 'physical':
        return true // Physical info is optional
      case 'swim':
        return !!assessment.swimAbility
      default:
        return false
    }
  }

  const handleNext = async () => {
    if (!canProceed()) return

    setIsTransitioning(true)
    
    // Simulate transition delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300))

    if (currentStepIndex < steps.length - 1) {
      setCurrentAssessmentStep(steps[currentStepIndex + 1].id)
    } else {
      // Complete assessment with loading state
      setIsLoading(true)
      
      // Simulate API save delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      markStepCompleted('assessment')
      setCurrentStep('waiver')
      navigate('/onboarding/waiver')
    }
    
    setIsTransitioning(false)
  }

  const handleBack = async () => {
    setIsTransitioning(true)
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (currentStepIndex > 0) {
      setCurrentAssessmentStep(steps[currentStepIndex - 1].id)
    } else {
      // Check if user came from new user flow
      const flowType = sessionStorage.getItem('onboarding-flow')
      if (flowType === 'new-user') {
        navigate('/onboarding/new-user/confirmation')
      } else {
        navigate('/onboarding/auth')
      }
    }
    
    setIsTransitioning(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center",
                  idx < steps.length - 1 && "flex-1"
                )}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold",
                      idx <= currentStepIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {idx < currentStepIndex ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="text-xs mt-2 text-center">
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-muted-foreground hidden md:block">{step.description}</div>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-2 mt-[-20px]",
                      idx < currentStepIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="border-muted shadow-xl">
          <CardContent className="p-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Spinner className="mb-4" size={48} variant="primary" />
                <p className="text-lg font-medium">Saving your assessment...</p>
                <p className="text-sm text-muted-foreground mt-2">Please wait while we prepare your recommendations</p>
              </div>
            ) : isTransitioning ? (
              <QuizStepSkeleton />
            ) : (
              <>
                {currentAssessmentStep === 'sport' && (
                  <SportSelection
                    value={assessment.sport}
                    onChange={(value) => updateAssessment({ sport: value })}
                  />
                )}

                {currentAssessmentStep === 'skill' && (
                  <SkillLevel
                    value={assessment.skillLevel}
                    onChange={(value) => updateAssessment({ skillLevel: value })}
                  />
                )}

                {currentAssessmentStep === 'goals' && (
                  <GoalsSelection
                    value={assessment.goals}
                    onChange={(value) => updateAssessment({ goals: value })}
                  />
                )}

                {currentAssessmentStep === 'physical' && (
                  <PhysicalInfo
                    value={assessment.physicalInfo}
                    onChange={(value) => updateAssessment({ physicalInfo: value })}
                  />
                )}

                {currentAssessmentStep === 'swim' && (
                  <SwimAbility
                    swimLevel={assessment.swimAbility}
                    medicalConditions={assessment.medicalConditions}
                    specialRequirements={assessment.specialRequirements}
                    onChange={(data) => updateAssessment(data)}
                  />
                )}
              </>
            )}

            {/* Navigation */}
            {!isLoading && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isTransitioning}
                  className="hover:-translate-y-1 transition-all duration-200"
                >
                  {isTransitioning ? (
                    <Spinner className="w-4 h-4 mr-2" />
                  ) : (
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  )}
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || isTransitioning}
                  className="hover:-translate-y-1 transition-all duration-200"
                >
                  {isTransitioning ? (
                    <Spinner className="w-4 h-4" />
                  ) : currentStepIndex === steps.length - 1 ? (
                    <>
                      Complete
                      <Check className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}