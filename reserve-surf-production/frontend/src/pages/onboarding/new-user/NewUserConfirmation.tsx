import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Calendar, Clock, MapPin, User, Mail, Phone, Download, Share2, AlertCircle, ArrowRight } from 'lucide-react'

export default function NewUserConfirmation() {
  const navigate = useNavigate()
  
  // Get booking data from session
  const bookingData = JSON.parse(sessionStorage.getItem('booking') || '{}')
  
  useEffect(() => {
    // Clear cart after successful booking
    sessionStorage.removeItem('onboarding-cart')
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500/10 text-green-600 border-green-200'
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
      case 'advanced': return 'bg-red-500/10 text-red-600 border-red-200'
      case 'kids': return 'bg-purple-500/10 text-purple-600 border-purple-200'
      default: return 'bg-blue-500/10 text-blue-600 border-blue-200'
    }
  }

  const handleCompleteProfile = () => {
    // Store that user came from new user flow
    sessionStorage.setItem('onboarding-flow', 'new-user')
    navigate('/onboarding/assessment')
  }

  const handleBrowseMore = () => {
    navigate('/onboarding/new-user/browse')
  }

  const handleGoToDashboard = () => {
    // For demo purposes, navigate to the main onboarding page
    // In production, this would go to the actual dashboard
    navigate('/onboarding')
  }

  if (!bookingData.bookingId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No booking data found</p>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate('/onboarding/new-user/browse')}
            >
              Start New Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your classes have been successfully booked
            </p>
            <div className="mt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Booking ID: {bookingData.bookingId}
              </Badge>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Created Alert */}
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription>
                  <strong>Account created successfully!</strong> We've sent a confirmation email to {bookingData.user?.email}
                </AlertDescription>
              </Alert>

              {/* Booked Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Booked Classes</CardTitle>
                  <CardDescription>
                    {bookingData.items?.length || 0} {bookingData.items?.length === 1 ? 'class' : 'classes'} confirmed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookingData.items?.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.sport}</p>
                        </div>
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>Instructor: {item.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{item.time} • {item.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{item.location}</span>
                        </div>
                        {item.quantity > 1 && (
                          <div className="font-medium">
                            {item.quantity} participants × ${item.price} = ${item.price * item.quantity}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Add to Calendar
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Next Steps - Updated with dark background to make it pop */}
              <Card className="shadow-xl overflow-hidden" style={{ backgroundColor: '#3D3536', borderColor: '#3D3536' }}>
                <CardHeader className="text-white">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                    <div>
                      <CardTitle className="text-white">Complete Your Profile Now - Save Time Later!</CardTitle>
                      <CardDescription className="mt-2 text-gray-300">
                        <strong className="text-white">These steps are required before your first class.</strong> 
                        <br />Completing them now takes just 5 minutes and ensures you're ready to go when you arrive. 
                        Otherwise, you'll need to complete them at check-in, which may delay your class start.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-orange-400/30 bg-orange-400/10">
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                    <AlertDescription className="text-gray-200">
                      <strong className="text-white">Why complete now?</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-300">
                        <li>• Skip the paperwork at check-in</li>
                        <li>• Get personalized class recommendations</li>
                        <li>• Ensure instructors have your safety information</li>
                        <li>• Start your first class without delays</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-red-400/30 bg-red-500/10">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-red-400">!</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2 text-white">
                          Digital Waiver 
                          <Badge className="text-xs bg-red-500 text-white border-red-500">Required</Badge>
                        </h4>
                        <p className="text-sm text-gray-300 mt-1">
                          <strong className="text-white">Must be signed before your class.</strong> Complete it now in 2 minutes or you'll be asked to do it at check-in.
                        </p>
                        <Button 
                          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white border-0"
                          size="sm"
                          onClick={() => navigate('/onboarding/waiver')}
                        >
                          Sign waiver now →
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-orange-400/30 bg-orange-400/10">
                      <div className="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-orange-400">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2 text-white">
                          Skill Assessment
                          <Badge className="text-xs bg-orange-400/20 text-orange-400 border-orange-400/30">Recommended</Badge>
                        </h4>
                        <p className="text-sm text-gray-300 mt-1">
                          Takes 3 minutes. Helps instructors tailor the class to your skill level and ensures you're in the right group.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2 border-gray-500 text-gray-200 hover:bg-gray-600 hover:text-white"
                          onClick={() => navigate('/onboarding/assessment')}
                        >
                          Complete assessment →
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-600 bg-gray-700/30">
                      <div className="w-8 h-8 rounded-full bg-gray-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-gray-300">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2 text-white">
                          Emergency Contact
                          <Badge className="text-xs bg-gray-600/30 text-gray-300 border-gray-600">Safety</Badge>
                        </h4>
                        <p className="text-sm text-gray-300 mt-1">
                          Required for water activities. Add your emergency contact details for safety compliance.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2 border-gray-500 text-gray-200 hover:bg-gray-600 hover:text-white"
                          onClick={() => navigate('/onboarding/emergency')}
                        >
                          Add contact →
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-orange-400/10 rounded-lg text-center border border-orange-400/30">
                    <p className="text-sm font-medium text-orange-400">
                      ⏱️ Total time: Under 5 minutes
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Complete everything now and arrive ready for fun!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Paid</span>
                      <span className="text-green-600">${bookingData.total?.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Payment processed successfully
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{bookingData.user?.firstName} {bookingData.user?.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{bookingData.user?.email}</span>
                  </div>
                  {bookingData.user?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{bookingData.user.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Important Reminders */}
              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  <strong>Before your class:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• Arrive 15 minutes early</li>
                    <li>• Bring sunscreen and water</li>
                    <li>• Wear appropriate swimwear</li>
                    <li>• Complete waiver if not done</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Share */}
              <Card>
                <CardContent className="pt-6">
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Your Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleCompleteProfile}
            >
              Complete Your Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleBrowseMore}
            >
              Book More Classes
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}