import { cn } from '@/lib/utils'
import { Check, ChevronRight } from 'lucide-react'
import { useOnboardingStep } from '@/store/onboarding/onboardingStore'
import type { OnboardingStep } from '@/types/onboarding'
import { useRovingTabIndex } from '@/hooks/useAccessibility'
import { focusStyles } from '@/lib/accessibility'

interface ProgressStepperProps {
  className?: string
  variant?: 'horizontal' | 'vertical'
  showLabels?: boolean
  compact?: boolean
}

const stepConfig: {
  id: OnboardingStep
  label: string
  shortLabel: string
  description?: string
}[] = [
  { id: 'welcome', label: 'Welcome', shortLabel: 'Start' },
  { id: 'auth', label: 'Sign Up', shortLabel: 'Auth' },
  { id: 'assessment', label: 'Assessment', shortLabel: 'Quiz' },
  { id: 'profile', label: 'Profile', shortLabel: 'Info' },
  { id: 'waiver', label: 'Waiver', shortLabel: 'Legal' },
  { id: 'emergency', label: 'Emergency Contact', shortLabel: 'Contact' },
  { id: 'recommendations', label: 'Lessons', shortLabel: 'Choose' },
  { id: 'booking', label: 'Schedule', shortLabel: 'Book' },
  { id: 'payment', label: 'Payment', shortLabel: 'Pay' },
  { id: 'confirmation', label: 'Confirmation', shortLabel: 'Done' },
]

export default function ProgressStepper({
  className,
  variant = 'horizontal',
  showLabels = true,
  compact = false
}: ProgressStepperProps) {
  const { currentStep, completedSteps, canAccessStep } = useOnboardingStep()
  const { getRovingProps } = useRovingTabIndex(stepConfig.length)

  const currentStepIndex = stepConfig.findIndex(s => s.id === currentStep)

  const getStepStatus = (step: typeof stepConfig[0], index: number) => {
    if (completedSteps.includes(step.id)) return 'completed'
    if (step.id === currentStep) return 'current'
    if (index < currentStepIndex) return 'completed'
    if (canAccessStep(step.id)) return 'available'
    return 'disabled'
  }

  if (variant === 'vertical') {
    return (
      <nav 
        className={cn("space-y-2", className)} 
        aria-label="Progress through onboarding steps"
        role="navigation"
      >
        <ol role="list">
          {stepConfig.map((step, index) => {
            const status = getStepStatus(step, index)
            const isLast = index === stepConfig.length - 1
            const stepNumber = index + 1
            const ariaLabel = `Step ${stepNumber} of ${stepConfig.length}: ${step.label} - ${
              status === 'completed' ? 'Completed' :
              status === 'current' ? 'Current step' :
              status === 'available' ? 'Available' :
              'Not available yet'
            }`

            return (
              <li key={step.id} className="relative" role="listitem">
              <div className="flex items-start gap-3">
                {/* Step indicator */}
                <div className="relative">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200",
                      status === 'completed' && "bg-primary text-primary-foreground",
                      status === 'current' && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      status === 'available' && "bg-muted text-muted-foreground border-2 border-muted-foreground",
                      status === 'disabled' && "bg-muted/50 text-muted-foreground/50",
                      focusStyles()
                    )}
                    role="img"
                    aria-label={ariaLabel}
                    {...getRovingProps(index)}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true">{stepNumber}</span>
                    )}
                  </div>

                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      className={cn(
                        "absolute top-12 left-5 w-0.5 h-8 -translate-x-1/2",
                        index < currentStepIndex ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-8">
                  <div
                    className={cn(
                      "font-medium",
                      status === 'current' && "text-primary",
                      status === 'disabled' && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && !compact && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
        </ol>
      </nav>
    )
  }

  // Horizontal variant
  return (
    <nav 
      className={cn("w-full", className)}
      aria-label="Progress through onboarding steps"
      role="navigation"
    >
      <ol className="relative flex items-center justify-between" role="list">
        {stepConfig.map((step, index) => {
          const status = getStepStatus(step, index)
          const isLast = index === stepConfig.length - 1
          const stepNumber = index + 1
          const ariaLabel = `Step ${stepNumber} of ${stepConfig.length}: ${step.label} - ${
            status === 'completed' ? 'Completed' :
            status === 'current' ? 'Current step' :
            status === 'available' ? 'Available' :
            'Not available yet'
          }`

          return (
            <li key={step.id} className="relative flex items-center flex-1" role="listitem">
                <div className="flex flex-col items-center">
                  {/* Step indicator */}
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center transition-all duration-200",
                      compact ? "w-8 h-8 text-sm" : "w-10 h-10",
                      "rounded-full font-semibold",
                      status === 'completed' && "bg-primary text-primary-foreground",
                      status === 'current' && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      status === 'available' && "bg-muted text-muted-foreground border-2 border-muted-foreground",
                      status === 'disabled' && "bg-muted/50 text-muted-foreground/50",
                      focusStyles()
                    )}
                    role="img"
                    aria-label={ariaLabel}
                    aria-current={status === 'current' ? 'step' : undefined}
                    {...getRovingProps(index)}
                  >
                    {status === 'completed' ? (
                      <Check className={cn(compact ? "w-4 h-4" : "w-5 h-5")} aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true">{stepNumber}</span>
                    )}
                  </div>

                  {/* Step label */}
                  {showLabels && (
                    <div className={cn(
                      "absolute top-12 text-center whitespace-nowrap",
                      compact ? "text-xs" : "text-sm"
                    )}>
                      <div
                        className={cn(
                          "font-medium",
                          status === 'current' && "text-primary",
                          status === 'disabled' && "text-muted-foreground"
                        )}
                      >
                        {compact ? step.shortLabel : step.label}
                      </div>
                    </div>
                  )}
                </div>

                {/* Connecting line */}
                {!isLast && (
                  <div className="flex-1 px-2">
                    <div
                      className={cn(
                        "h-0.5 transition-all duration-300",
                        index < currentStepIndex ? "bg-primary" : "bg-muted"
                      )}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
  )
}

// Mobile-optimized stepper (compact horizontal scrollable)
export function MobileProgressStepper({ className }: { className?: string }) {
  const { currentStep, completedSteps } = useOnboardingStep()
  const currentStepIndex = stepConfig.findIndex(s => s.id === currentStep)

  return (
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <div className="flex items-center gap-2 min-w-max px-4">
        {stepConfig.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = step.id === currentStep
          const isPast = index < currentStepIndex

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  isCurrent && "bg-primary text-primary-foreground",
                  isCompleted && !isCurrent && "bg-primary/10 text-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted && !isCurrent && (
                  <Check className="w-3 h-3" />
                )}
                <span>{step.shortLabel}</span>
              </div>
              {index < stepConfig.length - 1 && (
                <ChevronRight className={cn(
                  "w-4 h-4 mx-1",
                  isPast ? "text-primary" : "text-muted-foreground"
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}