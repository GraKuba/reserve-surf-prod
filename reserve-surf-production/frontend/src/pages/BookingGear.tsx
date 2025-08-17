import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Waves,
  Plus,
  Minus,
  Info,
} from "lucide-react";

export default function BookingGear() {
  const navigate = useNavigate();
  const [selectedGear, setSelectedGear] = useState<Record<string, number>>({});
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>(
    {}
  );

  const gearItems = [
    {
      id: "board-beginner",
      name: "Beginner Surfboard",
      size: "9'0\" Foam",
      price: 15,
      available: 8,
      image: "🏄‍♂️",
      recommended: true,
    },
    {
      id: "board-intermediate",
      name: "Intermediate Surfboard",
      size: "8'0\" Epoxy",
      price: 18,
      available: 6,
      image: "🏄‍♂️",
    },
    {
      id: "wetsuit-3mm",
      name: "3mm Wetsuit",
      size: "M/L/XL",
      price: 8,
      available: 12,
      image: "🤿",
      recommended: true,
    },
    {
      id: "wetsuit-5mm",
      name: "5mm Wetsuit",
      size: "M/L/XL",
      price: 10,
      available: 8,
      image: "🤿",
    },
  ];

  const addonItems = [
    {
      id: "insurance",
      name: "Equipment Insurance",
      description: "Cover for equipment damage",
      price: 5,
      icon: "🛡️",
    },
    {
      id: "photos",
      name: "Session Photos",
      description: "Professional photos of your session",
      price: 25,
      icon: "📸",
    },
    {
      id: "transport",
      name: "Beach Transport",
      description: "Round-trip transport to surf spot",
      price: 12,
      icon: "🚐",
    },
  ];

  const updateGearQuantity = (itemId: string, delta: number) => {
    setSelectedGear((prev) => {
      const current = prev[itemId] || 0;
      const newQuantity = Math.max(0, current + delta);
      if (newQuantity === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const toggleAddon = (itemId: string) => {
    setSelectedAddons((prev) => {
      if (prev[itemId]) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: 1 };
    });
  };

  const calculateTotal = () => {
    let total = 45; // Base session price

    // Add gear costs
    Object.entries(selectedGear).forEach(([itemId, quantity]) => {
      const item = gearItems.find((g) => g.id === itemId);
      if (item) total += item.price * quantity;
    });

    // Add addon costs
    Object.entries(selectedAddons).forEach(([itemId, quantity]) => {
      const item = addonItems.find((a) => a.id === itemId);
      if (item) total += item.price * quantity;
    });

    return total;
  };

  const handleContinue = () => {
    navigate("/booking/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/booking/details">
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
            <span>Step 2 of 3</span>
            <span>Equipment & Add-ons</span>
          </div>
          <Progress value={67} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Smart Recommendations */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900">
                      Recommended for Beginners
                    </div>
                    <div className="text-sm text-blue-800 mt-1">
                      Based on your experience level, we recommend a foam board
                      and 3mm wetsuit for comfort and safety.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Select Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gearItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`${
                        item.recommended ? "ring-2 ring-blue-200" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">{item.image}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-600">
                                  {item.size}
                                </div>
                                <Badge variant="outline" className="mt-1">
                                  {item.available} available
                                </Badge>
                                {item.recommended && (
                                  <Badge className="ml-2 mt-1">
                                    Recommended
                                  </Badge>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-medium">€{item.price}</div>
                                <div className="text-sm text-gray-600">
                                  per item
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    updateGearQuantity(item.id, -1)
                                  }
                                  disabled={!selectedGear[item.id]}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">
                                  {selectedGear[item.id] || 0}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateGearQuantity(item.id, 1)}
                                  disabled={
                                    selectedGear[item.id] >= item.available
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add-ons Section */}
            <Card>
              <CardHeader>
                <CardTitle>Add-ons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addonItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all ${
                        selectedAddons[item.id] ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{item.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">
                              {item.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">€{item.price}</div>
                            <Button
                              size="sm"
                              variant={
                                selectedAddons[item.id] ? "default" : "outline"
                              }
                              onClick={() => toggleAddon(item.id)}
                              className="mt-2"
                            >
                              {selectedAddons[item.id] ? "Added" : "Add"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
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

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Session</span>
                    <span>€45.00</span>
                  </div>

                  {Object.entries(selectedGear).map(([itemId, quantity]) => {
                    const item = gearItems.find((g) => g.id === itemId);
                    return item ? (
                      <div
                        key={itemId}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name} x{quantity}
                        </span>
                        <span>€{(item.price * quantity).toFixed(2)}</span>
                      </div>
                    ) : null;
                  })}

                  {Object.entries(selectedAddons).map(([itemId, quantity]) => {
                    const item = addonItems.find((a) => a.id === itemId);
                    return item ? (
                      <div
                        key={itemId}
                        className="flex justify-between text-sm"
                      >
                        <span>{item.name}</span>
                        <span>€{(item.price * quantity).toFixed(2)}</span>
                      </div>
                    ) : null;
                  })}
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>

                <Button className="w-full mt-6" onClick={handleContinue}>
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
