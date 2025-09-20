import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar, Clock, MapPin, User, 
  ArrowLeft, ArrowRight, Plus, Tag, Star,
  Building2, CheckCircle, Info
} from 'lucide-react'
import type { PartnerBookingData } from '@/components/partner/PartnerDataHandler'

export default function PartnerBookingSummary() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<PartnerBookingData | null>(null)

  useEffect(() => {
    // Load partner booking data from session
    const savedData = sessionStorage.getItem('partner-booking')
    if (savedData) {
      setBookingData(JSON.parse(savedData))
    } else {
      // No data, redirect to main onboarding
      navigate('/onboarding')
    }
  }, [navigate])

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="animate-pulse">Loading booking details...</div>
      </div>
    )
  }

  const finalPrice = bookingData.selectedClass.price - (bookingData.selectedClass.partnerDiscount || 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Partner Branding Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary border-b-2 border-primary">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-4xl mx-auto">
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
              <Badge className="gap-1 bg-white/20 backdrop-blur-sm text-white border-white/30">
                <CheckCircle className="w-3 h-3" />
                Verified Partner
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Review Your Booking</h1>
            <p className="text-muted-foreground">
              Confirm your class selection from {bookingData.partnerName}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Class Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Class Details</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.history.back()}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Change Selection
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{bookingData.selectedClass.name}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className="bg-blue-100 text-blue-700">
                        {bookingData.userData.skillLevel || 'Beginner'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{bookingData.selectedClass.duration} minutes</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(bookingData.selectedClass.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {bookingData.selectedClass.time} - {
                            new Date(`2024-01-01 ${bookingData.selectedClass.time}`)
                              .setMinutes(new Date(`2024-01-01 ${bookingData.selectedClass.time}`).getMinutes() + bookingData.selectedClass.duration)
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Instructor</p>
                        <p className="text-sm text-muted-foreground">{bookingData.selectedClass.instructor.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">4.9 rating • 124 reviews</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{bookingData.selectedClass.location.name}</p>
                        <p className="text-sm text-muted-foreground">{bookingData.selectedClass.location.address}</p>
                        <Button variant="link" className="px-0 h-auto text-xs">
                          View on map →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    Profile data from {bookingData.partnerName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                        <p>{bookingData.userData.firstName} {bookingData.userData.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{bookingData.userData.email}</p>
                      </div>
                    </div>
                    {bookingData.userData.phone && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p>{bookingData.userData.phone}</p>
                      </div>
                    )}
                    {bookingData.userData.skillLevel && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Skill Level</p>
                        <Badge variant="outline" className="capitalize">
                          {bookingData.userData.skillLevel}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {bookingData.userData.previousAssessment && (
                    <Alert className="mt-4">
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        Your skill assessment from {bookingData.partnerName} has been imported
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Add Another Class Option */}
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Plus className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-2">Want to add more classes?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse our full selection and build a complete package
                    </p>
                    <Button variant="outline" onClick={() => navigate('/onboarding/new-user/browse')}>
                      Browse More Classes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Pricing Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class Price</span>
                      <span>${bookingData.selectedClass.price}</span>
                    </div>
                    {bookingData.selectedClass.partnerDiscount && (
                      <>
                        <div className="flex justify-between text-green-600">
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            Partner Discount
                          </span>
                          <span>-${bookingData.selectedClass.partnerDiscount}</span>
                        </div>
                        <Separator />
                      </>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${finalPrice}</span>
                    </div>
                  </div>

                  <Alert className="bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700">
                    <Tag className="w-4 h-4 text-green-700 dark:text-green-400" />
                    <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
                      Special {bookingData.partnerName} member pricing applied!
                    </AlertDescription>
                  </Alert>

                  <Separator />

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => navigate('/onboarding/partner/auth')}
                    >
                      Continue to Booking
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.history.back()}
                    >
                      Return to {bookingData.partnerName}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    By continuing, you agree to our Terms of Service and Privacy Policy
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