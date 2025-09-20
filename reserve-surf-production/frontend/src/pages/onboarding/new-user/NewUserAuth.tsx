import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ShoppingCart, Mail, Lock, User, Phone, Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function NewUserAuth() {
  const navigate = useNavigate()
  
  // Sign up form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user data in session for this demo
    sessionStorage.setItem('user', JSON.stringify({
      email,
      firstName,
      lastName,
      phone,
      dateOfBirth
    }))
    navigate('/onboarding/new-user/payment')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app would authenticate
    sessionStorage.setItem('user', JSON.stringify({
      email: loginEmail,
      firstName: 'Returning',
      lastName: 'User'
    }))
    navigate('/onboarding/new-user/payment')
  }

  // Get cart summary from session
  const getCartSummary = () => {
    const cart = JSON.parse(sessionStorage.getItem('onboarding-cart') || '[]')
    const itemCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
    return { itemCount, hasItems: itemCount > 0 }
  }

  const cartSummary = getCartSummary()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/onboarding/new-user/cart')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">Sign up to complete your booking</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Auth Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Create an account or login to continue with your booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="signup" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signup">Create Account</TabsTrigger>
                      <TabsTrigger value="login">Already Have Account</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signup" className="space-y-4">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="firstName"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="lastName"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="john.doe@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+61 400 000 000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth *</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="dob"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <Alert>
                          <AlertDescription>
                            By creating an account, you agree to our Terms of Service and Privacy Policy.
                            You can complete your profile details after booking.
                          </AlertDescription>
                        </Alert>

                        <Button type="submit" className="w-full" size="lg">
                          Create Account & Continue
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="loginEmail">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="loginEmail"
                              type="email"
                              placeholder="john.doe@example.com"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="loginPassword">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="loginPassword"
                              type="password"
                              placeholder="••••••••"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="text-right">
                          <Button variant="link" className="px-0">
                            Forgot password?
                          </Button>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          Login & Continue
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Social Login Options */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Or continue with</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant="outline" className="w-full">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3.05.91-3.84.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.75 2.57 3 2.52s1.65-.82 3.2-.82 1.9.82 3.2.79 2.11-1.24 2.91-2.45a10.56 10.56 0 0 0 1.3-2.89 4.35 4.35 0 0 1-2.15-3.99z"/>
                      </svg>
                      Continue with Apple
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cartSummary.hasItems ? (
                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        {cartSummary.itemCount} {cartSummary.itemCount === 1 ? 'class' : 'classes'} selected
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You'll review your booking details on the next page
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Your cart is empty</p>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Why Create an Account?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Track all your bookings in one place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Get personalized class recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Earn loyalty points with every booking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Quick checkout for future bookings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}