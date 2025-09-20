import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight,
  ChevronLeft,
  RefreshCw,
  Award,
  Gift,
  TrendingUp,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Class {
  id: string
  title: string
  instructor: string
  date: string
  time: string
  duration: string
  location: string
  level: string
  spotsLeft: number
  price: number
  rating: number
  reviews: number
  recommended?: boolean
  reason?: string
}

export default function RecommendationsPage() {
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [userSession, setUserSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'recommended' | 'all'>('recommended')

  useEffect(() => {
    // Load user session
    const session = sessionStorage.getItem('userSession')
    if (session) {
      setUserSession(JSON.parse(session))
      setLoading(false)
    } else {
      navigate('/onboarding/existing/login')
    }
  }, [navigate])

  // Sample classes tailored for existing users
  const recommendedClasses: Class[] = [
    {
      id: '1',
      title: 'Intermediate Surf Session',
      instructor: 'Jake Morrison',
      date: 'Tomorrow',
      time: '7:00 AM',
      duration: '90 minutes',
      location: 'Bondi Beach',
      level: 'Intermediate',
      spotsLeft: 3,
      price: 79,
      rating: 4.9,
      reviews: 124,
      recommended: true,
      reason: 'Perfect for your skill level'
    },
    {
      id: '2',
      title: 'Advanced Wave Techniques',
      instructor: 'Sarah Johnson',
      date: 'Saturday',
      time: '6:00 AM',
      duration: '2 hours',
      location: 'Cronulla Beach',
      level: 'Advanced',
      spotsLeft: 2,
      price: 99,
      rating: 5.0,
      reviews: 89,
      recommended: true,
      reason: 'Challenge yourself with the next level'
    },
    {
      id: '3',
      title: 'Sunset Surf & Yoga',
      instructor: 'Emma Wilson',
      date: 'Friday',
      time: '5:30 PM',
      duration: '2 hours',
      location: 'Manly Beach',
      level: 'All Levels',
      spotsLeft: 5,
      price: 89,
      rating: 4.8,
      reviews: 156,
      recommended: true,
      reason: 'You enjoyed this last month'
    }
  ]

  const allClasses: Class[] = [
    ...recommendedClasses,
    {
      id: '4',
      title: 'Beginner Friendly Morning',
      instructor: 'Mike Chen',
      date: 'Thursday',
      time: '9:00 AM',
      duration: '2 hours',
      location: 'Bondi Beach',
      level: 'Beginner',
      spotsLeft: 8,
      price: 69,
      rating: 4.7,
      reviews: 203
    },
    {
      id: '5',
      title: 'Stand Up Paddleboarding',
      instructor: 'Lisa Park',
      date: 'Sunday',
      time: '10:00 AM',
      duration: '90 minutes',
      location: 'Harbour Beach',
      level: 'All Levels',
      spotsLeft: 6,
      price: 59,
      rating: 4.6,
      reviews: 98
    }
  ]

  const handleContinue = () => {
    if (selectedClass) {
      sessionStorage.setItem('selectedClass', selectedClass)
      navigate('/onboarding/existing/booking-summary')
    }
  }

  const handleQuickRebook = () => {
    // Quick book the same class as last time
    setSelectedClass('1')
    sessionStorage.setItem('selectedClass', '1')
    sessionStorage.setItem('quickRebook', 'true')
    navigate('/onboarding/existing/booking-summary')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="animate-pulse">Loading your recommendations...</div>
      </div>
    )
  }

  const displayClasses = viewMode === 'recommended' ? recommendedClasses : allClasses

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/onboarding/existing/login')}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Header with User Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userSession?.name?.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">
                  Select a class to continue • {userSession?.level} Surfer
                </p>
              </div>
              <div className="flex gap-4">
                <Card className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">{userSession?.loyaltyPoints}</p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                  </div>
                </Card>
                <Card className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">{userSession?.credits}</p>
                      <p className="text-xs text-muted-foreground">Credits</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleQuickRebook}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Rebook Last Class
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'recommended' ? 'all' : 'recommended')}
              >
                {viewMode === 'recommended' ? 'View All Classes' : 'View Recommended'}
              </Button>
            </div>
          </div>

          {/* Personalized Alert */}
          <Alert className="mb-6 border-primary bg-primary/5">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>You're on a 3-week streak!</strong> Book today to keep it going and earn bonus points.
            </AlertDescription>
          </Alert>

          {/* Classes Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {viewMode === 'recommended' ? 'Recommended for You' : 'Available Classes'}
                  </CardTitle>
                  <CardDescription>
                    {viewMode === 'recommended' 
                      ? 'Based on your history and preferences'
                      : 'All upcoming water sports classes'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedClass} onValueChange={setSelectedClass}>
                    <div className="space-y-6">
                      {displayClasses.map((classItem) => (
                        <div
                          key={classItem.id}
                          className={cn(
                            "relative rounded-lg border p-4 cursor-pointer hover:bg-accent/50 transition-colors",
                            selectedClass === classItem.id && "border-primary bg-primary/5"
                          )}
                          onClick={() => setSelectedClass(classItem.id)}
                        >
                          <div className="flex gap-3">
                            <RadioGroupItem value={classItem.id} id={classItem.id} />
                            <div className="flex-1">
                              <Label htmlFor={classItem.id} className="cursor-pointer">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-lg">{classItem.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant={classItem.level === 'Intermediate' ? 'default' : 'secondary'}>
                                        {classItem.level}
                                      </Badge>
                                      {classItem.recommended && (
                                        <Badge variant="outline" className="text-xs">
                                          Recommended
                                        </Badge>
                                      )}
                                      {classItem.spotsLeft <= 3 && (
                                        <Badge variant="destructive" className="text-xs">
                                          {classItem.spotsLeft} spots left
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xl font-bold">${classItem.price}</p>
                                    <div className="flex items-center gap-1 text-sm">
                                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      <span>{classItem.rating}</span>
                                      <span className="text-muted-foreground">({classItem.reviews})</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {classItem.reason && (
                                  <p className="text-sm text-primary mb-2">✨ {classItem.reason}</p>
                                )}
                                
                                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {classItem.instructor}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {classItem.date}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {classItem.time} • {classItem.duration}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {classItem.location}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedClass ? '1 class selected' : 'Select a class to continue'}
                  </p>
                  <Button 
                    onClick={handleContinue}
                    disabled={!selectedClass}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Class Credits</p>
                        <p className="text-xs text-muted-foreground">3 credits available</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700">Free</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Loyalty Points</p>
                        <p className="text-xs text-muted-foreground">450 points = $45 off</p>
                      </div>
                    </div>
                    <Badge variant="outline">-$45</Badge>
                  </div>
                  
                  <Separator />
                  
                  <Alert>
                    <AlertDescription className="text-xs">
                      You can use credits or apply loyalty discount at checkout
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Your Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Classes</span>
                      <span className="font-medium">{userSession?.totalClasses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Level</span>
                      <Badge variant="outline">{userSession?.level}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="font-medium">{userSession?.memberSince}</span>
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">Next Level Progress</p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">3 more classes to Advanced</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}