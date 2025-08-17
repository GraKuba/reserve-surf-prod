import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  QrCode,
  FileText,
  Package,
  Settings,
  CheckCircle,
  AlertCircle,
  Waves,
  User,
} from "lucide-react";

export default function MobileCheckin() {
  const [selectedTab, setSelectedTab] = useState("roster");

  // Mock data for today's roster
  const rosterData = [
    {
      time: "08:00",
      bookings: [
        {
          id: 1,
          customer: "João Silva",
          activity: "Surf Lesson",
          status: "pending",
          instructor: "Carlos",
          equipment: "Board + Wetsuit",
        },
        {
          id: 2,
          customer: "Maria Santos",
          activity: "Surf Session",
          status: "checked-in",
          instructor: "Ana",
          equipment: "Board Only",
        },
      ],
    },
    {
      time: "10:00",
      bookings: [
        {
          id: 3,
          customer: "Pedro Costa",
          activity: "Kite Lesson",
          status: "pending",
          instructor: "Miguel",
          equipment: "Kite + Harness",
        },
      ],
    },
    {
      time: "14:00",
      bookings: [
        {
          id: 4,
          customer: "Sofia Alves",
          activity: "Surf Session",
          status: "confirmed",
          instructor: "Carlos",
          equipment: "Board + Wetsuit",
        },
        {
          id: 5,
          customer: "Rui Ferreira",
          activity: "Surf Lesson",
          status: "pending",
          instructor: "Ana",
          equipment: "Board + Wetsuit",
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "default";
      case "confirmed":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "checked-in":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "confirmed":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const handleCheckIn = (bookingId: number) => {
    // Handle check-in logic here
    console.log(`Checking in booking ${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Mobile Check-in</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 pb-20">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsContent value="roster" className="space-y-4 mt-4">
            {rosterData.map((timeSlot) => (
              <Card key={timeSlot.time}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {timeSlot.time}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {timeSlot.bookings.map((booking) => (
                    <Card
                      key={booking.id}
                      className="border-l-4 border-l-blue-500"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {booking.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium">
                                {booking.customer}
                              </div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <Waves className="h-3 w-3" />
                                {booking.activity}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Instructor: {booking.instructor}
                              </div>
                              <div className="text-xs text-gray-500">
                                Equipment: {booking.equipment}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant={getStatusColor(booking.status) as any}
                              className="flex items-center gap-1"
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </Badge>
                            {booking.status !== "checked-in" && (
                              <Button
                                size="sm"
                                onClick={() => handleCheckIn(booking.id)}
                                className="text-xs"
                              >
                                Check In
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="scan" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">QR Code Scanner</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="text-gray-600">
                    Position QR code within the frame to scan
                  </div>
                  <Button>Start Camera</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waivers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Waivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rosterData
                    .flatMap((slot) => slot.bookings)
                    .filter((booking) => booking.status !== "checked-in")
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {booking.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {booking.customer}
                            </div>
                            <div className="text-xs text-gray-500">
                              {booking.activity}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          Waiver
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gear" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rosterData
                    .flatMap((slot) => slot.bookings)
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {booking.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {booking.customer}
                            </div>
                            <div className="text-xs text-gray-500">
                              {booking.equipment}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Package className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scan" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">
                    Position QR code within the frame to scan
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waivers" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Digital Waivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Waiver management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gear" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Equipment Assignment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rosterData.flatMap((timeSlot) =>
                  timeSlot.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {booking.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {booking.customer}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.equipment}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Package className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <TabsList className="grid w-full grid-cols-4 h-16 bg-transparent">
              <TabsTrigger
                value="roster"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50"
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Roster</span>
              </TabsTrigger>
              <TabsTrigger
                value="scan"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50"
              >
                <QrCode className="h-4 w-4" />
                <span className="text-xs">Scan QR</span>
              </TabsTrigger>
              <TabsTrigger
                value="waivers"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50"
              >
                <FileText className="h-4 w-4" />
                <span className="text-xs">Waivers</span>
              </TabsTrigger>
              <TabsTrigger
                value="gear"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50"
              >
                <Package className="h-4 w-4" />
                <span className="text-xs">Gear</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
