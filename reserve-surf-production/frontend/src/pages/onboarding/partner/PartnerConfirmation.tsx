import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  Calendar,
  MapPin,
  User,
  ArrowRight,
  Download,
  Share2,
  Building2,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  AlertCircle,
  ExternalLink,
  Plus,
} from "lucide-react";
import type { PartnerBookingData } from "@/components/partner/PartnerDataHandler";

export default function PartnerConfirmation() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<PartnerBookingData | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState<
    "pending" | "syncing" | "complete"
  >("pending");

  useEffect(() => {
    // Load booking and payment data
    const savedBooking = sessionStorage.getItem("partner-booking");
    const savedPayment = sessionStorage.getItem("partner-payment");

    if (savedBooking && savedPayment) {
      setBookingData(JSON.parse(savedBooking));
      setPaymentData(JSON.parse(savedPayment));

      // Simulate data sync back to partner
      syncWithPartner();
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  const syncWithPartner = async () => {
    setSyncStatus("syncing");
    // Simulate API call to sync with partner
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSyncStatus("complete");
  };

  if (!bookingData || !paymentData) {
    return null;
  }

  const handleReturnToPartner = () => {
    // In production, this would redirect back to the partner site with success params
    window.location.href = `https://partner-site.com/booking-success?id=${paymentData.bookingId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Partner Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary border-b-2 border-primary">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium">
                    Booked through
                  </p>
                  <p className="font-bold text-sm text-white">
                    {bookingData.partnerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {syncStatus === "syncing" && (
                  <Badge className="gap-1 bg-white/20 backdrop-blur-sm text-white border-white/30">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Syncing with partner...
                  </Badge>
                )}
                {syncStatus === "complete" && (
                  <Badge className="gap-1 bg-green-500 text-white border-green-400">
                    <CheckCircle className="w-3 h-3" />
                    Synced
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/30 mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-4">
              Your class has been successfully booked through{" "}
              {bookingData.partnerName}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Booking ID: {paymentData.bookingId}
              </Badge>
              <Badge className="text-lg px-4 py-2 bg-green-600">
                <Link2 className="w-4 h-4 mr-1" />
                Accounts Linked
              </Badge>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Partner Sync Alert */}
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription>
                  <strong>Success!</strong> Your booking has been synced with{" "}
                  {bookingData.partnerName}. You can view this booking in both
                  ReserveSurf and {bookingData.partnerName} accounts.
                </AlertDescription>
              </Alert>

              {/* Class Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Booked Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-xl mb-2">
                        {bookingData.selectedClass.name}
                      </h3>
                      <Badge className="bg-blue-100 text-blue-700">
                        {bookingData.userData.skillLevel || "Beginner"}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Date & Time</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              bookingData.selectedClass.date
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {bookingData.selectedClass.time} (
                            {bookingData.selectedClass.duration} minutes)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Instructor</p>
                          <p className="text-sm text-muted-foreground">
                            {bookingData.selectedClass.instructor.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {bookingData.selectedClass.location.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {bookingData.selectedClass.location.address}
                          </p>
                        </div>
                      </div>
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
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Profile Setup */}
              <Card
                className="border-primary/20"
                style={{ backgroundColor: "#3D3536" }}
              >
                <CardHeader className="text-white">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                    <div>
                      <CardTitle className="text-white">
                        Complete Your Profile - Quick & Easy!
                      </CardTitle>
                      <CardDescription className="mt-2 text-gray-300">
                        Since you're already here, take 2 minutes to complete
                        these required steps now. You'll need to do them anyway
                        before your class!
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => navigate("/onboarding/waiver")}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Sign Digital Waiver (Required - 1 min)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-500 text-gray-200 hover:bg-gray-600 hover:text-white"
                    onClick={() => navigate("/onboarding/emergency")}
                  >
                    Add Emergency Contact (30 seconds)
                  </Button>
                </CardContent>
              </Card>

              {/* Add More Classes */}
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Plus className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-2">
                      Want to book more classes?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Build a complete package with additional classes at
                      special member rates
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/onboarding/new-user/browse")}
                    >
                      Browse More Classes
                    </Button>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span className="font-semibold text-green-600">
                        $
                        {bookingData.selectedClass.price -
                          (bookingData.selectedClass.partnerDiscount || 0)}
                      </span>
                    </div>
                    {bookingData.selectedClass.partnerDiscount && (
                      <div className="text-sm text-green-600">
                        You saved ${bookingData.selectedClass.partnerDiscount}{" "}
                        with partner discount!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Return to Partner */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <Building2 className="w-8 h-8 mx-auto text-primary" />
                    <p className="text-sm font-medium">
                      Return to {bookingData.partnerName}
                    </p>
                    <Button className="w-full" onClick={handleReturnToPartner}>
                      Back to {bookingData.partnerName}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call (555) 123-4567
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
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
                    <li>• Complete digital waiver</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/onboarding")}>
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" />
              Print Confirmation
            </Button>
            <Button variant="ghost" size="lg">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
