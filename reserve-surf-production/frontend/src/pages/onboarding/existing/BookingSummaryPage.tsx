import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Info,
  Gift,
  Award,
  Plus
} from 'lucide-react'

interface UserSession {
  email: string
  name: string
  loyaltyPoints: number
  totalClasses: number
  level: string
  lastClass: string
  memberSince: string
  credits: number
}

export default function BookingSummaryPage() {
  const navigate = useNavigate()
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('credits')
  const [loading, setLoading] = useState(true)
  const [documentStatus, setDocumentStatus] = useState({
    waiver: true,
    emergency: true,
    medical: true
  })
  const isQuickRebook = sessionStorage.getItem('quickRebook') === 'true'

  useEffect(() => {
    // Load user session
    const session = sessionStorage.getItem('userSession')
    const classId = sessionStorage.getItem('selectedClass')
    
    if (session) {
      setUserSession(JSON.parse(session))
    } else {
      navigate('/onboarding/existing/login')
      return
    }
    
    // Mock loading selected class details
    if (classId) {
      // In real app, fetch class details by ID
      setSelectedClass({
        id: classId,
        title: 'Intermediate Surf Session',
        instructor: 'Jake Morrison',
        date: 'Tomorrow, Dec 15',
        time: '7:00 AM',
        duration: '90 minutes',
        location: 'Bondi Beach - North End',
        level: 'Intermediate',
        spotsLeft: 3,
        price: 79,
        rating: 4.9,
        reviews: 124
      })
    }
    
    // Check document status (mock - expired waiver)
    setTimeout(() => {
      setDocumentStatus({
        waiver: false, // Simulate expired waiver
        emergency: true,
        medical: true
      })
      setLoading(false)
    }, 500)
    
    // Clear quick rebook flag
    sessionStorage.removeItem('quickRebook')
  }, [navigate])

  const calculateFinalPrice = () => {
    if (!selectedClass) return 0
    if (paymentMethod === 'credits') return 0
    if (paymentMethod === 'loyalty') return Math.max(0, selectedClass.price - 45)
    return selectedClass.price
  }

  const handleContinue = () => {
    // If documents need updating
    if (!documentStatus.waiver || !documentStatus.emergency || !documentStatus.medical) {
      // In real app, navigate to document update page
      // For now, simulate update and continue
      alert('Please update your waiver before continuing')
      setDocumentStatus({ waiver: true, emergency: true, medical: true })
      return
    }
    
    // Store payment method
    sessionStorage.setItem('paymentMethod', paymentMethod)
    
    // Navigate to payment/confirmation
    navigate('/onboarding/confirmation')
  }

  if (loading || !selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="animate-pulse">Loading booking details...</div>
      </div>
    )
  }

  const allDocumentsValid = documentStatus.waiver && documentStatus.emergency && documentStatus.medical

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding/existing/recommendations')}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Review Your Booking</h1>
            <p className="text-muted-foreground">
              Confirm your class details and payment method
            </p>
          </div>

          {isQuickRebook && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Quick Rebook!</strong> We've selected the same class you enjoyed last time.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Class Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Class Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{selectedClass.title}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge>{selectedClass.level}</Badge>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="text-sm">{selectedClass.instructor}</span>
                      </div>
                      {selectedClass.spotsLeft <= 3 && (
                        <Badge variant="destructive" className="text-xs">
                          Only {selectedClass.spotsLeft} spots left!
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedClass.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedClass.time} ({selectedClass.duration})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedClass.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Status Card */}
              <Card className={!allDocumentsValid ? 'border-yellow-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Document Status
                    {allDocumentsValid ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        All Valid
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Update Required
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Liability Waiver</span>
                      {documentStatus.waiver ? (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Valid
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600">
                          Expired
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emergency Contact</span>
                      {documentStatus.emergency ? (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Valid
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600">
                          Update
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medical Information</span>
                      {documentStatus.medical ? (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Valid
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600">
                          Update
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {!documentStatus.waiver && (
                    <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                      <Info className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800 text-sm">
                        Your waiver has expired. You'll need to sign a new one before completing your booking.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Choose how you'd like to pay for this class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      {/* Class Credits Option */}
                      {userSession?.credits && userSession.credits > 0 && (
                        <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50">
                          <RadioGroupItem value="credits" id="credits" />
                          <Label htmlFor="credits" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Use Class Credit</p>
                                <p className="text-sm text-muted-foreground">
                                  {userSession.credits} credits remaining
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-700">
                                <Gift className="mr-1 h-3 w-3" />
                                Free
                              </Badge>
                            </div>
                          </Label>
                        </div>
                      )}
                      
                      {/* Loyalty Points Option */}
                      {userSession?.loyaltyPoints && userSession.loyaltyPoints >= 100 && (
                        <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50">
                          <RadioGroupItem value="loyalty" id="loyalty" />
                          <Label htmlFor="loyalty" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Use Loyalty Points</p>
                                <p className="text-sm text-muted-foreground">
                                  450 points available ($45 value)
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${Math.max(0, selectedClass.price - 45)}</p>
                                <p className="text-xs text-green-600">Save $45</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      )}
                      
                      {/* Credit Card Option */}
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Credit Card</p>
                              <p className="text-sm text-muted-foreground">
                                Visa ending in 4242
                              </p>
                            </div>
                            <p className="font-medium">${selectedClass.price}</p>
                          </div>
                        </Label>
                      </div>
                      
                      {/* Add New Card Option */}
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50">
                        <RadioGroupItem value="new-card" id="new-card" />
                        <Label htmlFor="new-card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            <p className="font-medium">Add New Payment Method</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">{userSession?.name}</p>
                    <p className="text-xs text-muted-foreground">{userSession?.email}</p>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <Badge variant="outline">{userSession?.level}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Classes</span>
                      <span className="font-medium">{userSession?.totalClasses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="font-medium">{userSession?.memberSince}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Class Fee</span>
                      <span>${selectedClass.price}</span>
                    </div>
                    {paymentMethod === 'loyalty' && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Loyalty Discount</span>
                        <span>-$45</span>
                      </div>
                    )}
                    {paymentMethod === 'credits' && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Using 1 Credit</span>
                        <span>-${selectedClass.price}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-lg">
                      {paymentMethod === 'credits' ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${calculateFinalPrice()}`
                      )}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleContinue}
                    disabled={!allDocumentsValid}
                  >
                    {!allDocumentsValid ? (
                      <>Update Documents & Continue</>
                    ) : (
                      <>
                        Complete Booking
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Loyalty Program Info */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <p className="font-medium text-sm">Earn Points</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This booking will earn you <strong>79 loyalty points</strong>.
                    You're just 50 points away from your next reward!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}