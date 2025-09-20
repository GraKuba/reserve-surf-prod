import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WavyBackground } from '@/components/ui/wavy-background'
import { useOnboardingStep } from '@/store/onboarding/onboardingStore'
import { ArrowRight, UserPlus, UserCheck, LogIn, Waves, Wind } from 'lucide-react'
import { useReducedMotion, useAutoFocus } from '@/hooks/useAccessibility'
import { focusStyles } from '@/lib/accessibility'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { } = useOnboardingStep()
  const prefersReducedMotion = useReducedMotion()
  const mainContentRef = useAutoFocus(true)

  const handleNewUser = () => {
    // New to Water Sports flow - browse first, then create account
    navigate('/onboarding/new-user/browse')
  }

  const handleReturningUser = () => {
    // Partner return flow - simulate coming from partner site
    // In production, users would arrive at /book with URL parameters from partner site
    const mockPartnerUrl = '/book?partner=surfclub-miami&class=beginner-surf-101&date=' + 
      new Date().toISOString().split('T')[0] + '&time=09:00&instructor=sarah-johnson&token=demo123'
    window.location.href = mockPartnerUrl
  }

  const handleExistingAccount = () => {
    // Existing user flow - quick login and book
    navigate('/onboarding/existing/login')
  }

  const userFlows = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "New to Water Sports",
      description: "First time booking? Start here to create your account and complete your profile.",
      action: handleNewUser,
      buttonText: "Start Fresh",
      variant: "default" as const
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Returning from Partner Site",
      description: "Already completed assessment on a partner water sports site? Continue your booking.",
      action: handleReturningUser,
      buttonText: "Continue Booking",
      variant: "secondary" as const
    },
    {
      icon: <LogIn className="w-6 h-6" />,
      title: "Existing ReserveSurf User",
      description: "Have a ReserveSurf account? Jump straight to selecting and booking your lesson.",
      action: handleExistingAccount,
      buttonText: "Book a Lesson",
      variant: "outline" as const
    }
  ]

  return (
    <div className="min-h-screen" role="main" aria-label="ReserveSurf Onboarding Entry">
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background text-foreground p-2 rounded-md shadow-lg"
      >
        Skip to main content
      </a>
      
      <WavyBackground 
        className="flex flex-col items-center justify-center px-4"
        backgroundFill="transparent"
        blur={prefersReducedMotion ? 0 : 3}
        speed={prefersReducedMotion ? "slow" : "slow"}
        waveOpacity={prefersReducedMotion ? 0.1 : 0.3}
      >
        <div className="max-w-4xl mx-auto w-full py-12" id="main-content" ref={mainContentRef as any}>
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Waves className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ReserveSurf
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Embedded booking and onboarding flow demo
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
              <span className="text-sm font-semibold text-primary">Demo Mode</span>
              <span className="text-sm text-primary">•</span>
              <span className="text-sm font-medium text-foreground">Select your user type to begin</span>
            </div>
          </div>

          {/* User Flow Cards */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {userFlows.map((flow, index) => (
              <Card 
                key={index}
                className={`relative overflow-hidden bg-card/80 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300 hover:shadow-lg ${focusStyles()}`}
                tabIndex={0}
                role="article"
                aria-labelledby={`flow-${index}-title`}
              >
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4`}>
                    {flow.icon}
                  </div>
                  <CardTitle id={`flow-${index}-title`} className="text-xl">
                    {flow.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {flow.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={flow.action}
                    variant={flow.variant}
                    className={`w-full group ${focusStyles()}`}
                    aria-label={`${flow.buttonText} - ${flow.title}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {flow.buttonText}
                      <ArrowRight className={`w-4 h-4 ${!prefersReducedMotion && 'group-hover:translate-x-1 transition-transform'}`} aria-hidden="true" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto bg-background/50 backdrop-blur-sm rounded-lg p-4">
              This demo simulates how the ReserveSurf booking flow can be embedded into any water sports website. 
              Similar to Stripe's payment flow, our solution provides a seamless onboarding and booking experience 
              that can be triggered from any page.
            </p>
          </div>

          {/* Wave Animation Decoration */}
          {!prefersReducedMotion && (
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <Wind className="absolute bottom-10 left-10 w-12 h-12 text-primary/20 animate-pulse" />
              <Waves className="absolute bottom-20 right-20 w-16 h-16 text-accent/20 animate-pulse delay-150" />
            </div>
          )}
        </div>
      </WavyBackground>
    </div>
  )
}