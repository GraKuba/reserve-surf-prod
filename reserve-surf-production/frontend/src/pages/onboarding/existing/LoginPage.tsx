import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  LogIn, 
  Mail, 
  Lock, 
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  Award,
  Gift
} from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      // Simulate login validation
      if (!email || !password) {
        setError('Please enter both email and password')
        setLoading(false)
        return
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store user session with existing user data
      sessionStorage.setItem('userSession', JSON.stringify({
        email: email,
        name: 'Sarah Miller',
        loyaltyPoints: 450,
        totalClasses: 12,
        level: 'Intermediate',
        lastClass: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        memberSince: 'Jan 2024',
        credits: 3
      }))
      
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email)
      }
      
      // Navigate to recommendations page
      navigate('/onboarding/existing/recommendations')
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding')}
            className="-ml-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Sign in to book your next water sports adventure
            </p>
          </div>

          {/* Benefits Card */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">450</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
                <div>
                  <Gift className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-xs text-muted-foreground">Credits</p>
                </div>
                <div>
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground">Classes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login Card */}
          <Card>
            <CardHeader>
              <CardTitle>Sign In to Your Account</CardTitle>
              <CardDescription>
                Enter your credentials to continue booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  
                  <Button variant="link" className="text-sm px-0" type="button">
                    Forgot password?
                  </Button>
                </div>
                
                <Separator />
                
                <Button type="submit" className="w-full" disabled={loading} size="lg">
                  {loading ? (
                    <>
                      <LogIn className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button variant="outline" type="button" disabled={loading}>
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled={loading}>
                    Facebook
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    className="px-0 text-primary"
                    onClick={() => navigate('/onboarding')}
                  >
                    Sign up
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}