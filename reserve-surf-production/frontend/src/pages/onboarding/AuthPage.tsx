import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useOnboardingStep, useOnboardingUser } from '@/store/onboarding/onboardingStore'
import { Eye, EyeOff, Chrome, Apple, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { useOnboardingForm, useFormErrorRecovery } from '@/hooks/useOnboardingForm'
import { useAutoFocus, useAnnouncement } from '@/hooks/useAccessibility'
import { focusStyles } from '@/lib/accessibility'
import { 
  signupSchema, 
  loginSchema,
  type SignupFormData,
  type LoginFormData
} from '@/schemas/onboarding.schemas'

export default function AuthPage() {
  const navigate = useNavigate()
  const { markStepCompleted, setCurrentStep } = useOnboardingStep()
  const { updateUser } = useOnboardingUser()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { handleError, retry } = useFormErrorRecovery()
  const { announcementRef, announce } = useAnnouncement()
  const mainContentRef = useAutoFocus(true)
  
  const handleLogin = async (data: LoginFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate validation error for demo
          if (data.email === 'test@error.com') {
            reject(new Error('Invalid credentials'))
          } else {
            resolve(true)
          }
        }, 1500)
      })
      
      updateUser({
        email: data.email,
      })
      
      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email)
      }
      
      markStepCompleted('auth')
      setCurrentStep('assessment')
      navigate('/onboarding/assessment')
    } catch (error) {
      handleError(error as Error)
      throw error // Let the form handle the error
    }
  }

  const signupForm = useOnboardingForm({
    schema: signupSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      dateOfBirth: '',
      termsAccepted: false
    },
    mode: 'onChange',
    persistKey: 'auth-signup',
    autoSave: true
  })

  const loginForm = useOnboardingForm({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onBlur',
    onSubmit: handleLogin
  })

  // Announce errors to screen readers
  useEffect(() => {
    if (signupForm.formState.errors.root) {
      announce(signupForm.formState.errors.root.message || 'Form submission error', 'assertive')
    }
  }, [signupForm.formState.errors.root, announce])
  
  useEffect(() => {
    if (loginForm.formState.errors.root) {
      announce(loginForm.formState.errors.root.message || 'Login error', 'assertive')
    }
  }, [loginForm.formState.errors.root, announce])

  const handleSignup = async (data: SignupFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random network error for testing
          if (Math.random() > 0.9) {
            reject(new Error('Network error'))
          } else {
            resolve(true)
          }
        }, 1500)
      })
      
      updateUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth
      })
      
      signupForm.clearPersistedData()
      markStepCompleted('auth')
      setCurrentStep('assessment')
      navigate('/onboarding/assessment')
    } catch (error) {
      const recovery = handleError(error as Error)
      if (recovery.canRetry) {
        await retry(() => handleSignup(data))
      } else {
        signupForm.setError('root', { message: recovery.message })
      }
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    signupForm.clearPersistedData()
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`${provider} login`)
      markStepCompleted('auth')
      setCurrentStep('assessment')
      navigate('/onboarding/assessment')
    } catch (error) {
      const recovery = handleError(error as Error)
      signupForm.setError('root', { message: recovery.message })
    }
  }


  // Helper to show password strength
  const getPasswordStrength = (password: string): { score: number; message: string } => {
    if (!password) return { score: 0, message: '' }
    let score = 0
    const checks = [
      { regex: /.{8,}/, message: '8+ characters' },
      { regex: /[A-Z]/, message: 'Uppercase letter' },
      { regex: /[a-z]/, message: 'Lowercase letter' },
      { regex: /[0-9]/, message: 'Number' },
      { regex: /[^A-Za-z0-9]/, message: 'Special character' }
    ]
    
    checks.forEach(check => {
      if (check.regex.test(password)) score++
    })
    
    const messages = [
      'Very weak',
      'Weak',
      'Fair',
      'Good',
      'Strong',
      'Very strong'
    ]
    
    return { score, message: messages[score] || '' }
  }

  const passwordStrength = getPasswordStrength(signupForm.watch('password'))

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background to-muted" role="main">
      {/* Screen reader announcement area */}
      <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true" />
      
      {/* Skip Navigation Link */}
      <a 
        href="#auth-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background text-foreground p-2 rounded-md shadow-lg"
      >
        Skip to authentication form
      </a>
      <div className="w-full max-w-md" id="auth-form" ref={mainContentRef as any} tabIndex={-1}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to ReserveSurf</h1>
          <p className="text-muted-foreground">Sign up or log in to continue</p>
        </div>

        <Card className="border-muted shadow-xl" role="region" aria-labelledby="auth-title">
          <CardHeader className="space-y-1">
            <CardTitle id="auth-title" className="text-2xl text-center">Get Started</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                disabled={signupForm.isSubmitting || loginForm.isSubmitting}
                className={`relative hover:-translate-y-1 transition-all duration-200 ${focusStyles()}`}
                aria-label="Sign in with Google"
              >
                <Chrome className="mr-2 h-4 w-4" aria-hidden="true" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('apple')}
                disabled={signupForm.isSubmitting || loginForm.isSubmitting}
                className={`relative hover:-translate-y-1 transition-all duration-200 ${focusStyles()}`}
                aria-label="Sign in with Apple"
              >
                <Apple className="mr-2 h-4 w-4" aria-hidden="true" />
                Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Tabs defaultValue="signup" className="w-full" aria-label="Authentication method">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Log In</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={signupForm.submitHandler} className="space-y-4">
                  {/* Show error recovery message if present */}
                  {signupForm.formState.errors.root && (
                    <Alert variant="destructive" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      <AlertDescription>
                        {signupForm.formState.errors.root.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <Input
                          id="firstName"
                          placeholder="John"
                          {...signupForm.register('firstName')}
                          disabled={signupForm.isSubmitting}
                          className={signupForm.hasFieldError('firstName') ? 'border-destructive' : ''}
                        />
                        {signupForm.formState.dirtyFields.firstName && !signupForm.hasFieldError('firstName') && (
                          <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                        )}
                      </div>
                      {signupForm.hasFieldError('firstName') && (
                        <p className="text-xs text-destructive">{signupForm.getFieldError('firstName')}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          {...signupForm.register('lastName')}
                          disabled={signupForm.isSubmitting}
                          className={signupForm.hasFieldError('lastName') ? 'border-destructive' : ''}
                        />
                        {signupForm.formState.dirtyFields.lastName && !signupForm.hasFieldError('lastName') && (
                          <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                        )}
                      </div>
                      {signupForm.hasFieldError('lastName') && (
                        <p className="text-xs text-destructive">{signupForm.getFieldError('lastName')}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...signupForm.register('email')}
                        disabled={signupForm.isSubmitting}
                        className={signupForm.hasFieldError('email') ? 'border-destructive' : ''}
                      />
                      {signupForm.formState.dirtyFields.email && !signupForm.hasFieldError('email') && (
                        <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {signupForm.hasFieldError('email') && (
                      <p className="text-xs text-destructive">{signupForm.getFieldError('email')}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+1234567890"
                        {...signupForm.register('phoneNumber')}
                        disabled={signupForm.isSubmitting}
                        className={signupForm.hasFieldError('phoneNumber') ? 'border-destructive' : ''}
                      />
                      {signupForm.hasFieldError('phoneNumber') && (
                        <p className="text-xs text-destructive">{signupForm.getFieldError('phoneNumber')}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...signupForm.register('dateOfBirth')}
                        disabled={signupForm.isSubmitting}
                        className={signupForm.hasFieldError('dateOfBirth') ? 'border-destructive' : ''}
                      />
                      {signupForm.hasFieldError('dateOfBirth') && (
                        <p className="text-xs text-destructive">{signupForm.getFieldError('dateOfBirth')}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...signupForm.register('password')}
                        disabled={signupForm.isSubmitting}
                        className={signupForm.hasFieldError('password') ? 'border-destructive' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {signupForm.watch('password') && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="h-full transition-all duration-300"
                              style={{
                                width: `${(passwordStrength.score / 5) * 100}%`,
                                backgroundColor: passwordStrength.score <= 2 ? '#ef4444' : passwordStrength.score <= 3 ? '#f59e0b' : '#10b981'
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{passwordStrength.message}</span>
                        </div>
                      </div>
                    )}
                    {signupForm.hasFieldError('password') && (
                      <p className="text-xs text-destructive">{signupForm.getFieldError('password')}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...signupForm.register('confirmPassword')}
                        disabled={signupForm.isSubmitting}
                        className={signupForm.hasFieldError('confirmPassword') ? 'border-destructive' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {signupForm.hasFieldError('confirmPassword') && (
                      <p className="text-xs text-destructive">{signupForm.getFieldError('confirmPassword')}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={signupForm.watch('termsAccepted')}
                      onCheckedChange={(checked) => signupForm.setValue('termsAccepted', checked as boolean)}
                      disabled={signupForm.isSubmitting}
                    />
                    <Label 
                      htmlFor="termsAccepted" 
                      className={`text-sm ${signupForm.hasFieldError('termsAccepted') ? 'text-destructive' : 'text-muted-foreground'}`}
                    >
                      I accept the terms and conditions
                    </Label>
                  </div>
                  {signupForm.hasFieldError('termsAccepted') && (
                    <p className="text-xs text-destructive">{signupForm.getFieldError('termsAccepted')}</p>
                  )}

                  {signupForm.isSaving && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Auto-saving...
                    </p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={signupForm.isSubmitting || !signupForm.isValid}
                  >
                    {signupForm.isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={loginForm.submitHandler} className="space-y-4">
                  {/* Show error message if present */}
                  {loginForm.formState.errors.root && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {loginForm.formState.errors.root.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <div className="relative">
                      <Input
                        id="loginEmail"
                        type="email"
                        placeholder="john@example.com"
                        {...loginForm.register('email')}
                        disabled={loginForm.isSubmitting}
                        className={loginForm.hasFieldError('email') ? 'border-destructive' : ''}
                        defaultValue={localStorage.getItem('rememberedEmail') || ''}
                      />
                      {loginForm.formState.dirtyFields.email && !loginForm.hasFieldError('email') && (
                        <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {loginForm.hasFieldError('email') && (
                      <p className="text-xs text-destructive">{loginForm.getFieldError('email')}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loginPassword">Password</Label>
                      <a href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        {...loginForm.register('password')}
                        disabled={loginForm.isSubmitting}
                        className={loginForm.hasFieldError('password') ? 'border-destructive' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {loginForm.hasFieldError('password') && (
                      <p className="text-xs text-destructive">{loginForm.getFieldError('password')}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={loginForm.watch('rememberMe')}
                      onCheckedChange={(checked) => loginForm.setValue('rememberMe', checked as boolean)}
                      disabled={loginForm.isSubmitting}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loginForm.isSubmitting || !loginForm.isValid}
                  >
                    {loginForm.isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Log In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

          </CardContent>
          
          <CardFooter>
            <p className="text-xs text-center text-muted-foreground w-full">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}