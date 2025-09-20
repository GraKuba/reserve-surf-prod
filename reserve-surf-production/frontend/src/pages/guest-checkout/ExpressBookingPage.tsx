import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpressClassCard {
  id: string;
  classTitle: string;
  timeUntilStart: string;
  spotsLeft: number;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  location: {
    name: string;
    distance?: string;
  };
  startTime: Date;
}

const ExpressBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classes, setClasses] = useState<ExpressClassCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    loadImmediateAvailability();
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationPermission(true),
        () => setLocationPermission(false)
      );
    }
  };

  const loadImmediateAvailability = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockClasses: ExpressClassCard[] = [
        {
          id: '1',
          classTitle: 'Beginner Surf Lesson',
          timeUntilStart: '2 hours',
          spotsLeft: 3,
          price: 89,
          difficulty: 'Beginner',
          duration: '90 mins',
          location: {
            name: 'Bondi Beach',
            distance: '2.3 miles'
          },
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000)
        },
        {
          id: '2',
          classTitle: 'Sunset Session',
          timeUntilStart: '4 hours',
          spotsLeft: 1,
          price: 109,
          difficulty: 'Intermediate',
          duration: '2 hours',
          location: {
            name: 'Manly Beach',
            distance: '5.1 miles'
          },
          startTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
        },
        {
          id: '3',
          classTitle: 'Morning Waves',
          timeUntilStart: 'Tomorrow 6:00 AM',
          spotsLeft: 8,
          price: 79,
          difficulty: 'Beginner',
          duration: '90 mins',
          location: {
            name: 'Cronulla Beach',
            distance: '8.7 miles'
          },
          startTime: new Date(Date.now() + 18 * 60 * 60 * 1000)
        }
      ];
      setClasses(mockClasses);
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClass = (classId: string) => {
    setSelectedClass(classId);
  };

  const handleBookNow = () => {
    if (selectedClass) {
      navigate(`/guest-checkout/info?classId=${selectedClass}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quick Booking</h1>
        <p className="text-muted-foreground">
          Select an available class to book immediately - no account needed!
        </p>
      </div>

      {!locationPermission && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <span className="text-sm">
            Enable location services to see distances to each beach
          </span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg',
              selectedClass === classItem.id && 'ring-2 ring-primary'
            )}
            onClick={() => handleSelectClass(classItem.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{classItem.classTitle}</CardTitle>
                {classItem.spotsLeft <= 3 && (
                  <Badge variant="destructive" className="text-xs">
                    {classItem.spotsLeft} left
                  </Badge>
                )}
              </div>
              <CardDescription>
                <Badge 
                  className={cn('mb-2', getDifficultyColor(classItem.difficulty))}
                  variant="secondary"
                >
                  {classItem.difficulty}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-primary">
                  Starts in {classItem.timeUntilStart}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {classItem.location.name}
                  {classItem.location.distance && (
                    <span className="text-muted-foreground ml-1">
                      ({classItem.location.distance})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{classItem.spotsLeft} spots available</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">${classItem.price}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  / {classItem.duration}
                </span>
              </div>
              {selectedClass === classItem.id && (
                <Badge className="bg-primary text-primary-foreground">
                  Selected
                </Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center sticky bottom-0 bg-background py-4 border-t">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
        <Button
          size="lg"
          onClick={handleBookNow}
          disabled={!selectedClass}
          className="min-w-[200px]"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );
};

export default ExpressBookingPage;