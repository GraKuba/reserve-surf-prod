import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { WavyBackground } from '@/components/ui/wavy-background'
import { useOnboardingStep } from '@/store/onboarding/onboardingStore'
import { ArrowRight, Sparkles, Waves, Wind, Trophy, Users, Calendar } from 'lucide-react'
import { useReducedMotion, useAutoFocus } from '@/hooks/useAccessibility'
import { focusStyles } from '@/lib/accessibility'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { markStepCompleted, setCurrentStep } = useOnboardingStep()
  const prefersReducedMotion = useReducedMotion()
  const mainContentRef = useAutoFocus(true)

  const handleGetStarted = () => {
    markStepCompleted('welcome')
    setCurrentStep('auth')
    navigate('/onboarding/auth')
  }

  const handleExplore = () => {
    navigate('/client')
  }

  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Expert Instructors",
      description: "Learn from certified professionals with years of experience"
    },
    {
      icon: <Waves className="w-8 h-8 text-primary" />,
      title: "Perfect Conditions",
      description: "We monitor weather and waves to ensure optimal learning conditions"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Small Groups",
      description: "Personalized attention with maximum 4 students per instructor"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Flexible Scheduling",
      description: "Book lessons that fit your schedule, 7 days a week"
    }
  ]

  return (
    <div className="min-h-screen" role="main" aria-label="Welcome to ReserveSurf">
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
        speed={prefersReducedMotion ? "none" : "slow"}
        waveOpacity={prefersReducedMotion ? 0.1 : 0.3}
      >
        <div className="max-w-6xl mx-auto w-full" id="main-content" ref={mainContentRef as any}>
          {/* Hero Section */}
          <section className="text-center mb-16 space-y-6" aria-labelledby="hero-title">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4" role="banner">
              <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">Welcome to ReserveSurf</span>
            </div>
            
            <h1 id="hero-title" className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ride the Waves
              </span>
              <br />
              <span className="text-foreground">
                Master the Ocean
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Begin your surfing journey with personalized lessons from world-class instructors.
              From your first wave to advanced techniques, we're here every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4" role="navigation" aria-label="Primary actions">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className={`group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl ${!prefersReducedMotion && 'transition-all duration-200 hover:-translate-y-1'} ${focusStyles()}`}
                aria-label="Get started with your surfing journey"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className={`w-5 h-5 ${!prefersReducedMotion && 'group-hover:translate-x-1 transition-transform'}`} aria-hidden="true" />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 ${!prefersReducedMotion && 'group-hover:opacity-100 transition-opacity'}`} />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleExplore}
                className={`px-8 py-6 text-lg font-semibold rounded-xl ${!prefersReducedMotion && 'hover:-translate-y-1 transition-all duration-200'} ${focusStyles()}`}
                aria-label="Explore available surf lessons"
              >
                Explore Lessons
              </Button>
            </div>
          </section>

          {/* Value Propositions */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" aria-labelledby="features-title" role="region">
            <h2 id="features-title" className="sr-only">Why Choose ReserveSurf</h2>
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`p-6 bg-card/80 backdrop-blur-sm border-muted hover:border-primary/50 ${!prefersReducedMotion && 'transition-all duration-300 hover:-translate-y-1'} hover:shadow-lg ${focusStyles()}`}
                tabIndex={0}
                role="article"
                aria-labelledby={`feature-${index}-title`}
              >
                <div className="mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 id={`feature-${index}-title`} className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </section>

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