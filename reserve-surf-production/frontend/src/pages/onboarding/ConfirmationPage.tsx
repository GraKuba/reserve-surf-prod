import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FireworksBackground } from "@/components/ui/fireworks-background";
import { MotionHighlight } from "@/components/ui/motion-highlight";
import { QRCode } from "@/components/ui/qr-code";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Users,
  Download,
  Share2,
  Mail,
  Home,
  Sparkles,
} from "lucide-react";
import {
  useOnboardingStore,
  useOnboardingBooking,
  useOnboardingUser,
} from "@/store/onboarding/onboardingStore";
import { format } from "date-fns";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showFireworks, setShowFireworks] = useState(true);
  const { booking } = useOnboardingBooking();
  const { user } = useOnboardingUser();
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  // Generate booking reference
  const bookingReference = `RS-${Date.now().toString(36).toUpperCase()}`;

  // Create booking URL for QR code
  const bookingUrl = `${window.location.origin}/booking/view/${bookingReference}`;

  useEffect(() => {
    // Send confirmation email
    sendConfirmationEmail();

    // Hide fireworks after 5 seconds
    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const sendConfirmationEmail = async () => {
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEmailSent(true);

      // Update store to mark onboarding as complete
      useOnboardingStore.setState({
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  };

  const handleCalendarExport = () => {
    if (!booking.selectedDate || !booking.selectedTime) return;

    const startDate = new Date(
      `${booking.selectedDate}T${booking.selectedTime}`
    );
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ReserveSurf//EN
BEGIN:VEVENT
UID:${bookingReference}@reservesurf.com
DTSTAMP:${new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}Z
DTSTART:${startDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}Z
DTEND:${endDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}Z
SUMMARY:${booking.lessonType || "Surf Lesson"} - ReserveSurf
DESCRIPTION:Your surf lesson is confirmed! Reference: ${bookingReference}
LOCATION:${booking.location || "Beach Location"}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `reservesurf-${bookingReference}.ics`;
    link.click();
  };

  const handleShare = async () => {
    const shareData = {
      title: "My ReserveSurf Booking",
      text: `I just booked a surf lesson with ReserveSurf! Reference: ${bookingReference}`,
      url: bookingUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(bookingUrl);
        alert("Booking link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleStartNewBooking = () => {
    resetOnboarding();
    navigate("/onboarding");
  };

  const handleGoToProfile = () => {
    navigate("/profile/skill-passport");
  };

  return (
    <div className="min-h-screen relative bg-background">
      {/* Fireworks Animation */}
      {showFireworks && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <FireworksBackground
            population={3}
            color={["#ff6b6b", "#4ecdc4", "#45b7d1", "#f7dc6f", "#bb8fce"]}
            particleSize={{ min: 1, max: 3 }}
            fireworkSize={{ min: 3, max: 6 }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="absolute -inset-4"
            >
              <Sparkles className="w-32 h-32 text-primary opacity-20" />
            </motion.div>
            <CheckCircle2 className="w-24 h-24 text-primary relative z-10" />
          </div>
        </motion.div>

        {/* Confirmation Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Get ready for an amazing surf experience
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Confirmation #{bookingReference}
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.selectedDate
                        ? format(
                            new Date(booking.selectedDate),
                            "EEEE, MMMM d, yyyy"
                          )
                        : "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.selectedTime || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.location || "Main Beach, Surf School"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Instructor</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.instructor || "Will be assigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-48 h-48 bg-white p-4 rounded-lg border">
                  <QRCode data={bookingUrl} className="w-full h-full" />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Show this code at check-in
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCalendarExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              {isEmailSent && (
                <div className="flex items-center gap-2 ml-auto text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  Confirmation sent to {user.email}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>

            <MotionHighlight mode="children" className="rounded-lg" hover>
              <div className="space-y-3">
                <div className="p-3 rounded-lg transition-colors">
                  <h3 className="font-medium mb-1">1. Check Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent detailed instructions and preparation tips to
                    your email
                  </p>
                </div>

                <div className="p-3 rounded-lg transition-colors">
                  <h3 className="font-medium mb-1">
                    2. Prepare for Your Lesson
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bring swimwear, towel, sunscreen, and water. We'll provide
                    the rest!
                  </p>
                </div>

                <div className="p-3 rounded-lg transition-colors">
                  <h3 className="font-medium mb-1">
                    3. Arrive 15 Minutes Early
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This gives you time to check in, meet your instructor, and
                    get equipped
                  </p>
                </div>
              </div>
            </MotionHighlight>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button onClick={handleGoToProfile} className="flex-1" size="lg">
            View My Skill Passport
          </Button>

          <Button
            variant="outline"
            onClick={handleStartNewBooking}
            className="flex-1"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Book Another Lesson
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
