import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Waves,
  CreditCard,
  Smartphone,
} from "lucide-react";

export default function BookingPayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [smsReminder, setSmsReminder] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate("/booking/confirmation");
    }, 2000);
  };

  const totalAmount = 78.0; // Mock total from previous steps

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/booking/gear">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="text-xl font-bold">ReserveSurf</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 3 of 3</span>
            <span>Payment</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Express Checkout */}
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 bg-black text-white hover:bg-gray-800"
                    >
                      <Smartphone className="h-5 w-5 mr-2" />
                      Pay with Apple Pay
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12"
                    >
                      <Smartphone className="h-5 w-5 mr-2" />
                      Pay with Google Pay
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-sm text-gray-500">
                      Or pay with card
                    </span>
                    <Separator className="flex-1" />
                  </div>

                  {/* Card Payment Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingZip">Billing Zip Code</Label>
                      <Input id="billingZip" placeholder="2450-001" />
                    </div>
                  </div>

                  {/* BNPL Options */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium">
                      Buy Now, Pay Later
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button type="button" variant="outline" className="h-12">
                        Pay in 3 with Klarna
                      </Button>
                      <Button type="button" variant="outline" className="h-12">
                        4 payments with Sezzle
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Today, March 15</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>10:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Waves className="h-4 w-4 text-gray-500" />
                    <span>Surf Session</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Session</span>
                    <span>€45.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beginner Surfboard</span>
                    <span>€15.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3mm Wetsuit</span>
                    <span>€8.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment Insurance</span>
                    <span>€5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€73.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee (6.8%)</span>
                    <span>€4.96</span>
                  </div>
                </div>

                {/* SMS Reminder Option */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="text-sm font-medium">SMS Reminder</div>
                    <div className="text-xs text-gray-600">€0.01</div>
                  </div>
                  <Switch
                    checked={smsReminder}
                    onCheckedChange={setSmsReminder}
                  />
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    €{(totalAmount + (smsReminder ? 0.01 : 0)).toFixed(2)}
                  </span>
                </div>

                {/* Terms Section */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="text-sm">
                    <div className="font-medium mb-2">Cancellation Policy</div>
                    <div className="text-gray-600">
                      Free cancellation up to 24 hours before your session. 50%
                      refund for cancellations within 24 hours.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="#" className="text-primary underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary underline">
                        Cancellation Policy
                      </a>
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!termsAccepted || isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay €${(totalAmount + (smsReminder ? 0.01 : 0)).toFixed(
                        2
                      )}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
