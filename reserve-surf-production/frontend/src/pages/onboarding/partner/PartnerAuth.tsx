import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Building2, Mail, Lock, Phone, ArrowRight, 
  CheckCircle, Eye, EyeOff, Link2
} from 'lucide-react'
import type { PartnerBookingData } from '@/components/partner/PartnerDataHandler'

export default function PartnerAuth() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<PartnerBookingData | null>(null)
  const [isExistingUser, setIsExistingUser] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    agreeToTerms: false
  })

  useEffect(() => {
    // Load partner booking data
    const savedData = sessionStorage.getItem('partner-booking')
    if (savedData) {
      const data = JSON.parse(savedData) as PartnerBookingData
      setBookingData(data)
      // Pre-fill form with partner data
      setFormData(prev => ({
        ...prev,
        email: data.userData.email,
        firstName: data.userData.firstName,
        lastName: data.userData.lastName,
        phone: data.userData.phone || ''
      }))
      // Check if email exists (mock check)
      checkExistingUser(data.userData.email)
    } else {
      navigate('/onboarding')
    }
  }, [navigate])

  const checkExistingUser = async (email: string) => {
    // Mock check - in production, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500))
    // For demo, let's assume emails ending with @partner.com are existing users
    setIsExistingUser(email.includes('@partner'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Store user data
    sessionStorage.setItem('partner-user', JSON.stringify({
      ...formData,
      linkedPartner: bookingData?.partnerName
    }))

    // Navigate to payment
    navigate('/onboarding/partner/payment')
  }

  if (!bookingData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Partner Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary border-b-2 border-primary">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium">Booking through</p>
                  <p className="font-bold text-sm text-white">{bookingData.partnerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white/90">Account will be linked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Main Auth Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isExistingUser ? 'Welcome Back!' : 'Create Your ReserveSurf Account'}
              </CardTitle>
              <CardDescription>
                {isExistingUser 
                  ? `Sign in to link your ${bookingData.partnerName} account and complete booking`
                  : `Quick account setup with your ${bookingData.partnerName} profile`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Partner Data Notice */}
                <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <AlertDescription>
                    We've imported your profile from {bookingData.partnerName}. 
                    {isExistingUser ? ' Just enter your password to continue.' : ' Create a password to complete setup.'}
                  </AlertDescription>
                </Alert>

                {!isExistingUser && (
                  <>
                    {/* Name Fields - Pre-filled */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email - Pre-filled and disabled */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="pl-10 bg-muted"
                    />
                  </div>
                  {isExistingUser && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Account found! Enter your password to link accounts.
                    </p>
                  )}
                </div>

                {/* Phone - Optional */}
                {!isExistingUser && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {isExistingUser ? 'Password' : 'Create Password'}
                  </Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isExistingUser ? 'Enter your password' : 'Create a strong password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {!isExistingUser && (
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters with a mix of letters and numbers
                    </p>
                  )}
                </div>

                {/* Confirm Password - Only for new users */}
                {!isExistingUser && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Terms Checkbox */}
                {!isExistingUser && (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, agreeToTerms: checked as boolean})
                      }
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to ReserveSurf's{' '}
                      <a href="#" className="text-primary hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                )}

                {/* Forgot Password Link */}
                {isExistingUser && (
                  <div className="text-right">
                    <Button variant="link" className="px-0 text-sm">
                      Forgot password?
                    </Button>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading || (!isExistingUser && !formData.agreeToTerms)}
                >
                  {loading ? (
                    'Processing...'
                  ) : isExistingUser ? (
                    <>
                      Sign In & Link Accounts
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Create Account & Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button variant="outline">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              {/* Partner Account Link Info */}
              <Alert>
                <Link2 className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  Your {bookingData.partnerName} account will be automatically linked for seamless future bookings
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>Trusted Partner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}