import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Edit2, 
  Check,
  AlertCircle,
  Star,
  Shield,
  Waves
} from 'lucide-react'
import { useOnboardingBooking, useOnboardingUser, useOnboardingAssessment } from '@/store/onboarding/onboardingStore'

interface BookingSummaryProps {
  onConfirm: () => void
  onBack?: () => void
  onEditDate?: () => void
  onEditLesson?: () => void
}

export function BookingSummary({ onConfirm, onBack, onEditDate, onEditLesson }: BookingSummaryProps) {
  const { booking, updateBooking } = useOnboardingBooking()
  const { user } = useOnboardingUser()
  const { assessment } = useOnboardingAssessment()
  const [specialRequests, setSpecialRequests] = useState(booking.specialRequests || '')
  
  // Calculate pricing
  const basePrice = booking.price || 0
  const equipmentFee = booking.equipmentIncluded ? 0 : 25
  const processingFee = basePrice * 0.03 // 3% processing fee
  const totalPrice = basePrice + equipmentFee + processingFee

  const handleSpecialRequests = (value: string) => {
    setSpecialRequests(value)
    updateBooking({ specialRequests: value })
  }

  const formatDate = () => {
    if (!booking.date) return 'Not selected'
    return format(new Date(booking.date), 'EEEE, MMMM d, yyyy')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Booking Summary</h2>
        <p className="text-muted-foreground">Review your lesson details before payment</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lesson Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lesson Details</CardTitle>
                {onEditLesson && (
                  <Button variant="ghost" size="sm" onClick={onEditLesson}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Waves className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{booking.lessonTitle || 'Lesson Title'}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{assessment.skillLevel || 'Beginner'}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {booking.duration || 90} minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Group (max {booking.groupSize || 6})
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.instructorName}`} />
                  <AvatarFallback>{booking.instructorName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{booking.instructorName || 'Instructor'}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>4.9 (127 reviews)</span>
                    <span>•</span>
                    <span>5+ years experience</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Location */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Schedule & Location</CardTitle>
                {onEditDate && (
                  <Button variant="ghost" size="sm" onClick={onEditDate}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{formatDate()}</p>
                    <p className="text-sm text-muted-foreground">{booking.timeSlot || 'Time not selected'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{booking.location || 'Location'}</p>
                    <p className="text-sm text-muted-foreground">Meet at beach entrance</p>
                  </div>
                </div>
              </div>
              
              {booking.spotsAvailable && booking.spotsAvailable <= 3 && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Only {booking.spotsAvailable} spots remaining for this session
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Participant Information */}
          <Card>
            <CardHeader>
              <CardTitle>Participant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phoneNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Skill Level</p>
                  <p className="font-medium capitalize">{assessment.skillLevel || 'Beginner'}</p>
                </div>
              </div>
              
              {assessment.medicalConditions && assessment.medicalConditions.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Medical Considerations</p>
                  <div className="flex flex-wrap gap-2">
                    {assessment.medicalConditions.map((condition: string, index: number) => (
                      <Badge key={index} variant="secondary">{condition}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Special Requests (Optional)</CardTitle>
              <CardDescription>
                Let us know if you have any specific needs or preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="E.g., specific equipment sizes, dietary restrictions for beach breaks, accessibility needs..."
                value={specialRequests}
                onChange={(e) => handleSpecialRequests(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Price Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{booking.lessonTitle || 'Lesson'}</span>
                  <span className="font-medium">${basePrice.toFixed(2)}</span>
                </div>
                {!booking.equipmentIncluded && (
                  <div className="flex justify-between">
                    <span className="text-sm">Equipment Rental</span>
                    <span className="font-medium">${equipmentFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Processing Fee</span>
                  <span className="font-medium">${processingFee.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Features Included */}
              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm font-medium mb-2">Included:</p>
                <div className="space-y-1.5">
                  {booking.equipmentIncluded && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>All equipment provided</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Professional instruction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Safety briefing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Insurance coverage</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Free cancellation up to 24h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          size="lg"
          onClick={onConfirm}
          className="min-w-[200px]"
        >
          Continue to Payment
          <DollarSign className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Default export wrapper for routing
export default function BookingSummaryPage() {
  const navigate = useNavigate()
  
  const handleConfirm = () => {
    // Navigate to payment or confirmation
    navigate('/onboarding/payment')
  }
  
  const handleBack = () => {
    // Navigate back to recommendations
    navigate('/onboarding/recommendations')
  }
  
  const handleEditDate = () => {
    // Navigate to calendar (could be a modal or separate page)
    console.log('Editing date')
  }
  
  const handleEditLesson = () => {
    // Navigate back to recommendations to change lesson
    navigate('/onboarding/recommendations')
  }
  
  return (
    <BookingSummary 
      onConfirm={handleConfirm}
      onBack={handleBack}
      onEditDate={handleEditDate}
      onEditLesson={handleEditLesson}
    />
  )
}