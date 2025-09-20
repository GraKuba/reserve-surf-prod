import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export interface PartnerBookingData {
  partnerName: string
  partnerLogo: string
  selectedClass: {
    id: string
    name: string
    date: string
    time: string
    duration: number
    instructor: {
      name: string
      id: string
      photo?: string
    }
    location: {
      name: string
      address: string
      coordinates?: { lat: number; lng: number }
    }
    price: number
    partnerDiscount?: number
  }
  userData: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    skillLevel?: string
    previousAssessment?: any
  }
}

export default function PartnerDataHandler() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [partnerData, setPartnerData] = useState<PartnerBookingData | null>(null)

  useEffect(() => {
    const validateAndFetchData = async () => {
      try {
        // Extract URL parameters
        const partnerId = searchParams.get('partner')
        const classId = searchParams.get('class')
        const date = searchParams.get('date')
        const time = searchParams.get('time')
        const instructor = searchParams.get('instructor')
        const token = searchParams.get('token')

        if (!partnerId || !token) {
          throw new Error('Missing required partner information')
        }

        // For demo purposes, simulate API call to validate token and fetch data
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock partner data based on partner ID
        const mockPartnerData: PartnerBookingData = {
          partnerName: partnerId === 'surfclub-miami' ? 'Surf Club Miami' : 'Ocean Sports Academy',
          partnerLogo: '/partners/' + partnerId + '.png',
          selectedClass: {
            id: classId || 'beginner-surf-101',
            name: 'Beginner Surfing Fundamentals',
            date: date || new Date().toISOString().split('T')[0],
            time: time || '09:00',
            duration: 120,
            instructor: {
              name: instructor === 'john-doe' ? 'John Doe' : 'Sarah Johnson',
              id: instructor || 'sarah-johnson',
              photo: '/instructors/' + (instructor || 'sarah-johnson') + '.jpg'
            },
            location: {
              name: 'Miami Beach Surf Point',
              address: '1001 Ocean Drive, Miami Beach, FL 33139',
              coordinates: { lat: 25.7617, lng: -80.1918 }
            },
            price: 89,
            partnerDiscount: 10
          },
          userData: {
            firstName: 'Alex',
            lastName: 'Smith',
            email: 'alex.smith@example.com',
            phone: '+1 (555) 123-4567',
            skillLevel: 'beginner',
            previousAssessment: {
              completedAt: '2024-01-01',
              score: 'beginner',
              confidence: 3,
              experience: 'none'
            }
          }
        }

        // Store partner data in session
        sessionStorage.setItem('partner-booking', JSON.stringify(mockPartnerData))
        setPartnerData(mockPartnerData)
        
        // Redirect to booking summary after validation
        setTimeout(() => {
          navigate('/onboarding/partner/booking-summary')
        }, 1000)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process partner data')
      } finally {
        setLoading(false)
      }
    }

    validateAndFetchData()
  }, [searchParams, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Validating Partner Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Verifying partner token...</span>
              </div>
              <div className="flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Fetching class information...</span>
              </div>
              <div className="flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Loading user profile...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              Unable to Process Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            
            <p className="text-sm text-muted-foreground">
              We couldn't validate your partner information. This might happen if:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>The link has expired</li>
              <li>The class is no longer available</li>
              <li>There was a technical issue</li>
            </ul>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
              >
                Return to Partner Site
              </Button>
              <Button onClick={() => navigate('/onboarding')}>
                Browse Classes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (partnerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Data Validated Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Partner verified: {partnerData.partnerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Class: {partnerData.selectedClass.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">User: {partnerData.userData.email}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Redirecting to booking summary...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}