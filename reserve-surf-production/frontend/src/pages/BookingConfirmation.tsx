import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Clock,
  Waves,
  MapPin,
  Download,
  Smartphone,
  Mail,
} from "lucide-react";

export default function BookingConfirmation() {
  const bookingRef = "RS-2024-0315-001";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">ReserveSurf</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Animation */}
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-green-900 mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600">
                Your surf session has been successfully booked
              </p>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  Booking Reference
                </div>
                <div className="text-2xl font-mono font-bold">{bookingRef}</div>
              </div>

              <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                <div className="text-sm text-gray-600 mb-2">
                  QR Code for Check-in
                </div>
                <div className="w-24 h-24 bg-black mx-auto rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs">QR CODE</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <Mail className="h-4 w-4 inline mr-1" />
                Confirmation email sent to your inbox
              </div>
            </CardContent>
          </Card>

          {/* Calendar Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Add to Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Google Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Apple Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download .ics
                </Button>
              </div>

              <div className="mt-4">
                <Button variant="ghost" className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Send SMS reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-gray-600">March 15, 2024</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-sm text-gray-600">
                      10:00 AM - 12:00 PM
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Waves className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Activity</div>
                    <div className="text-sm text-gray-600">Surf Session</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-gray-600">
                      Ericeira, Portugal
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Equipment</div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• Beginner Surfboard (9'0" Foam)</div>
                  <div>• 3mm Wetsuit</div>
                  <div>• Equipment Insurance</div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-medium">Total Paid</span>
                <span className="text-lg font-bold">€78.01</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="mt-0.5">1</Badge>
                  <div>
                    <div className="font-medium">What to Bring</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Swimwear, towel, sunscreen, and water. All equipment is
                      provided.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-0.5">2</Badge>
                  <div>
                    <div className="font-medium">Meeting Point</div>
                    <div className="text-sm text-gray-600 mt-1">
                      ReserveSurf Beach House, Praia de Ribeira d'Ilhas
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      View on Map
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-0.5">3</Badge>
                  <div>
                    <div className="font-medium">Weather Check</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Current forecast: 2-3ft waves, light offshore winds
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Book Another Session
                  </Button>
                </Link>
                <Button className="flex-1">Manage Booking</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
