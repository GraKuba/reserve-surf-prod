import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Spinner } from '@/components/ui/spinner'
import { LessonCardSkeleton } from '@/components/onboarding/skeletons/LessonCardSkeleton'
import { useOnboardingStep, useOnboardingAssessment, useOnboardingBooking } from '@/store/onboarding/onboardingStore'
import { Star, Clock, Users, MapPin, Calendar, TrendingUp, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Lesson } from '@/types/onboarding'

// Mock lesson data - in production this would come from an API
const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Beginner Surf Fundamentals',
    description: 'Perfect introduction to surfing. Learn ocean safety, board handling, and catch your first waves in a safe, supportive environment.',
    sport: 'surfing',
    level: 'beginner',
    instructor: {
      id: 'inst1',
      name: 'Jake Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jake',
      rating: 4.9,
      specialties: ['Beginner Friendly', 'Safety Expert']
    },
    duration: 120,
    groupSize: 4,
    price: 89,
    currency: 'USD',
    location: 'Malibu Beach',
    images: ['https://source.unsplash.com/800x600/?surfing,beach'],
    equipmentIncluded: true,
    equipmentList: ['Surfboard', 'Wetsuit', 'Leash'],
    requirements: ['Basic swimming ability', 'Age 12+'],
    whatToExpect: ['Safety briefing', 'Land practice', 'Guided water session', 'Personalized feedback'],
    availability: [
      {
        date: '2024-03-25',
        timeSlots: [
          { time: '09:00', spotsAvailable: 2, totalSpots: 4 },
          { time: '14:00', spotsAvailable: 3, totalSpots: 4 }
        ]
      }
    ],
    rating: 4.8,
    reviewCount: 124,
    tags: ['Beginner Friendly', 'Small Groups', 'Equipment Included']
  },
  {
    id: '2',
    title: 'Intermediate Wave Mastery',
    description: 'Take your surfing to the next level. Focus on wave selection, advanced techniques, and building confidence in varied conditions.',
    sport: 'surfing',
    level: 'intermediate',
    instructor: {
      id: 'inst2',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 4.95,
      specialties: ['Technique Coach', 'Competition Prep']
    },
    duration: 150,
    groupSize: 3,
    price: 129,
    currency: 'USD',
    location: 'Point Break',
    images: ['https://source.unsplash.com/800x600/?surfing,waves'],
    equipmentIncluded: true,
    equipmentList: ['Performance board', 'Premium wetsuit'],
    requirements: ['Can catch unbroken waves', 'Comfortable in 4-6ft surf'],
    whatToExpect: ['Video analysis', 'Advanced techniques', 'Wave strategy', 'Style development'],
    availability: [
      {
        date: '2024-03-25',
        timeSlots: [
          { time: '07:00', spotsAvailable: 1, totalSpots: 3 },
          { time: '15:00', spotsAvailable: 2, totalSpots: 3 }
        ]
      }
    ],
    rating: 4.9,
    reviewCount: 89,
    tags: ['Video Analysis', 'Small Groups', 'Advanced Techniques']
  },
  {
    id: '3',
    title: 'Kitesurfing Discovery',
    description: 'Introduction to kitesurfing. Learn kite control, safety procedures, and experience the thrill of harnessing wind power.',
    sport: 'kitesurfing',
    level: 'beginner',
    instructor: {
      id: 'inst3',
      name: 'Mike Torres',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      rating: 4.85,
      specialties: ['IKO Certified', 'Safety First']
    },
    duration: 180,
    groupSize: 2,
    price: 159,
    currency: 'USD',
    location: 'Sunset Bay',
    images: ['https://source.unsplash.com/800x600/?kitesurfing'],
    equipmentIncluded: true,
    equipmentList: ['Kite', 'Board', 'Harness', 'Safety gear'],
    requirements: ['Good fitness level', 'Swimming ability'],
    whatToExpect: ['Wind theory', 'Kite setup', 'Control practice', 'First rides'],
    availability: [
      {
        date: '2024-03-25',
        timeSlots: [
          { time: '11:00', spotsAvailable: 1, totalSpots: 2 },
          { time: '14:00', spotsAvailable: 2, totalSpots: 2 }
        ]
      }
    ],
    rating: 4.7,
    reviewCount: 67,
    tags: ['IKO Certified', 'All Equipment', 'Wind Guaranteed']
  }
]

export default function RecommendationsPage() {
  const navigate = useNavigate()
  const { markStepCompleted, setCurrentStep } = useOnboardingStep()
  const { assessment } = useOnboardingAssessment()
  const { updateBooking } = useOnboardingBooking()
  const [selectedTab, setSelectedTab] = useState('all')
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const loadLessons = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Filter lessons based on assessment
      let filtered = mockLessons

      if (assessment.sport && assessment.sport !== 'both') {
        filtered = filtered.filter(l => l.sport === assessment.sport)
      }

      if (assessment.skillLevel) {
        // Match skill level or show all levels for advanced users
        if (assessment.skillLevel === 'beginner') {
          filtered = filtered.filter(l => l.level === 'beginner')
        } else if (assessment.skillLevel === 'intermediate') {
          filtered = filtered.filter(l => l.level === 'beginner' || l.level === 'intermediate')
        }
      }

      // Sort by relevance (rating and review count)
      filtered.sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1)
        const scoreB = b.rating * Math.log(b.reviewCount + 1)
        return scoreB - scoreA
      })

      setFilteredLessons(filtered)
      setIsLoading(false)
    }
    
    loadLessons()
  }, [assessment])

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson.id)
    updateBooking({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      instructorId: lesson.instructor.id,
      instructorName: lesson.instructor.name,
      price: lesson.price,
      duration: lesson.duration,
      location: lesson.location,
      equipmentIncluded: lesson.equipmentIncluded,
      groupSize: lesson.groupSize
    })
  }

  const handleContinue = async () => {
    if (!selectedLesson) return
    
    setIsProcessing(true)
    
    // Simulate saving selection
    await new Promise(resolve => setTimeout(resolve, 500))
    
    markStepCompleted('recommendations')
    setCurrentStep('booking')
    navigate('/onboarding/booking')
  }

  const handleSkip = () => {
    navigate('/client')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-4 h-4 mr-1" />
            Personalized for You
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Recommended Lessons</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your assessment, we've selected these lessons to kickstart your journey
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">All Lessons</TabsTrigger>
              <TabsTrigger value="surfing">Surfing</TabsTrigger>
              <TabsTrigger value="kitesurfing">Kitesurfing</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            // Show skeleton cards while loading
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <LessonCardSkeleton key={i} />
              ))}
            </>
          ) : filteredLessons.length === 0 ? (
            // No lessons found
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No lessons found matching your criteria</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            // Show filtered lessons
            filteredLessons
              .filter(l => selectedTab === 'all' || l.sport === selectedTab)
              .map((lesson) => (
            <Card
              key={lesson.id}
              className={cn(
                "overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer",
                "hover:-translate-y-1",
                selectedLesson === lesson.id && "ring-2 ring-primary"
              )}
              onClick={() => handleSelectLesson(lesson)}
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Badge className="mb-2">{lesson.sport}</Badge>
                    <p className="text-sm font-medium">{lesson.level}</p>
                  </div>
                </div>
                {selectedLesson === lesson.id && (
                  <Badge className="absolute top-2 right-2 bg-primary">
                    Selected
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {lesson.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={lesson.instructor.avatar} />
                    <AvatarFallback>{lesson.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{lesson.instructor.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs">{lesson.instructor.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        • {lesson.instructor.specialties[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Max {lesson.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{lesson.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Available</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {lesson.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="bg-muted/50">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-2xl font-bold">${lesson.price}</p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{lesson.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({lesson.reviewCount})
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
            ))
          )}
        </div>

        {/* Action Buttons */}
        {!isLoading && (
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSkip}
              disabled={isProcessing}
              className="hover:-translate-y-1 transition-all duration-200"
            >
              Browse More Lessons
            </Button>
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedLesson || isProcessing}
              className="hover:-translate-y-1 transition-all duration-200"
            >
              {isProcessing ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Continue with Selected Lesson
                  <TrendingUp className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}