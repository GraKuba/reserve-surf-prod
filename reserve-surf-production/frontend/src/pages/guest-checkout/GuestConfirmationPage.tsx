import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Clock,
  User,
  Phone,
  Download,
  Share2,
  MessageSquare,
  Navigation
} from 'lucide-react';
import QRCode from '@/components/guest-checkout/confirmation/BookingQRCode';
import CalendarIntegration from '@/components/guest-checkout/confirmation/CalendarIntegration';

interface BookingDetails {
  bookingCode: string;
  classDetails: {
    what: string;
    when: string;
    where: string;
    instructor: string;
  };
  nextSteps: string[];
  guestData?: any;
}

const GuestConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingCode = searchParams.get('code') || '';
  
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [smsOptIn, setSmsOptIn] = useState(false);

  useEffect(() => {
    // Load booking details from session storage
    const storedDetails = sessionStorage.getItem('bookingDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setBookingDetails({
        bookingCode: details.bookingCode,
        classDetails: {
          what: 'Beginner Surf Lesson',
          when: 'Today, 2:00 PM - 3:30 PM',
          where: 'Bondi Beach - North End',
          instructor: 'Jake Morrison'
        },
        nextSteps: [
          'Arrive 15 minutes early for check-in',
          'Bring sunscreen and water',
          'Wear swimwear under clothes',
          'Look for the ReserveSurf tent on the beach'
        ],
        guestData: details.guestData
      });
    }
  }, []);

  const handleSmsOptIn = async () => {
    setSmsOptIn(true);
    // Send SMS reminder API call
    console.log('SMS reminder enabled');
  };

  const handleGetDirections = () => {
    // Open maps with location
    const address = encodeURIComponent('Bondi Beach, Sydney NSW');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Surf Lesson Booking',
          text: `I'm going surfing! Booking code: ${bookingCode}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    }
  };

  const handleCreateAccount = () => {
    navigate(`/guest-checkout/upgrade-account?code=${bookingCode}`);
  };

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Success Banner */}
      <Alert className="mb-8 border-green-200 bg-green-50">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800 font-semibold text-lg">
          Booking Confirmed! Check your email for details.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Booking is Confirmed!</CardTitle>
              <CardDescription>
                Booking Code: <span className="font-mono text-lg font-bold text-foreground">{bookingCode}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>When</span>
                  </div>
                  <p className="font-semibold">{bookingDetails.classDetails.when}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Where</span>
                  </div>
                  <p className="font-semibold">{bookingDetails.classDetails.where}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Instructor</span>
                  </div>
                  <p className="font-semibold">{bookingDetails.classDetails.instructor}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Duration</span>
                  </div>
                  <p className="font-semibold">90 minutes</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">What to do next:</h3>
                <ul className="space-y-2">
                  {bookingDetails.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleGetDirections} variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                
                <CalendarIntegration 
                  classDetails={bookingDetails.classDetails}
                  bookingCode={bookingCode}
                />
                
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SMS Reminder */}
          {!smsOptIn && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  SMS Reminders
                </CardTitle>
                <CardDescription>
                  Get a text message 2 hours before your lesson
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleSmsOptIn} className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Enable SMS Reminders
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Account Upgrade */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>
                Save time on future bookings and earn loyalty points
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">Benefits of creating an account:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Earn 89 loyalty points from this booking</li>
                  <li>• Quick checkout for future bookings</li>
                  <li>• Track your surf progress</li>
                  <li>• Exclusive member discounts</li>
                  <li>• Access to photos from your lessons</li>
                </ul>
              </div>
              <Button onClick={handleCreateAccount} className="w-full">
                Create Account & Earn Points
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* QR Code and Quick Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Check-in QR Code</CardTitle>
              <CardDescription>
                Show this code at the beach for quick check-in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QRCode bookingCode={bookingCode} />
              <p className="text-center mt-4 font-mono text-lg font-bold">
                {bookingCode}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to Bring</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Swimwear (wear under clothes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Towel & change of clothes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Sunscreen (reef-safe preferred)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Water bottle</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Positive attitude!</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Need help?</p>
                  <p className="text-muted-foreground">Call us: +1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="font-semibold">Running late?</p>
                  <p className="text-muted-foreground">Text LATE to 555-1234</p>
                </div>
                <div>
                  <p className="font-semibold">Cancel or reschedule?</p>
                  <p className="text-muted-foreground">
                    Free cancellation up to 24 hours before
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          onClick={() => navigate('/')}
          variant="outline"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default GuestConfirmationPage;