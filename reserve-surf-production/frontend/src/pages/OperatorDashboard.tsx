import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Calendar,
  Waves,
  Wind,
  AlertTriangle,
  MoreVertical,
  Plus,
  Users,
  Activity,
  RefreshCw,
  Settings,
  Eye,
  MapPin,
  Layers,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function OperatorDashboard() {
  const [selectedView, setSelectedView] = useState("day");

  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data for enhanced dashboard
  const todaysBookings = [
    {
      id: 1,
      time: "08:00",
      customer: "João Silva",
      activity: "Surf",
      status: "confirmed",
      instructor: "Carlos",
      equipment: "Board + Wetsuit",
      duration: 2,
      price: 45,
      avatar: "/avatars/joao.jpg",
    },
    {
      id: 2,
      time: "10:00",
      customer: "Maria Santos",
      activity: "Surf",
      status: "checked-in",
      instructor: "Ana",
      equipment: "Board + Wetsuit",
      duration: 1.5,
      price: 35,
      avatar: "/avatars/maria.jpg",
    },
    {
      id: 3,
      time: "14:00",
      customer: "Pedro Costa",
      activity: "Kite",
      status: "pending",
      instructor: "Miguel",
      equipment: "Kite + Harness",
      duration: 2,
      price: 65,
      avatar: "/avatars/pedro.jpg",
    },
    {
      id: 4,
      time: "16:00",
      customer: "Sofia Alves",
      activity: "Surf",
      status: "confirmed",
      instructor: "Carlos",
      equipment: "Board + Wetsuit",
      duration: 1,
      price: 30,
      avatar: "/avatars/sofia.jpg",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "booking",
      message: "New booking created",
      customer: "João Silva",
      time: "5 min ago",
      avatar: "/avatars/joao.jpg",
    },
    {
      id: 2,
      type: "checkin",
      message: "Customer checked in",
      customer: "Maria Santos",
      time: "12 min ago",
      avatar: "/avatars/maria.jpg",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment received",
      customer: "Pedro Costa",
      time: "25 min ago",
      avatar: "/avatars/pedro.jpg",
    },
    {
      id: 4,
      type: "cancellation",
      message: "Booking cancelled",
      customer: "Ana Costa",
      time: "1 hour ago",
      avatar: "/avatars/ana.jpg",
    },
  ];

  const staffOnDuty = [
    {
      name: "Carlos",
      avatar: "/avatars/carlos.jpg",
      status: "active",
      role: "Surf Instructor",
    },
    {
      name: "Ana",
      avatar: "/avatars/ana.jpg",
      status: "active",
      role: "Surf Instructor",
    },
    {
      name: "Miguel",
      avatar: "/avatars/miguel.jpg",
      status: "break",
      role: "Kite Instructor",
    },
    {
      name: "Sofia",
      avatar: "/avatars/sofia.jpg",
      status: "active",
      role: "Assistant",
    },
  ];

  const metrics = {
    todayRevenue: 280,
    todayBookings: 4,
    activeStaff: 4,
    oceanCondition: "good",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "checked-in":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity.toLowerCase()) {
      case "surf":
        return <Waves className="h-4 w-4" />;
      case "kite":
        return <Wind className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      breadcrumbs={[]}
      showQuickActions={true}
    >
      <div className="space-y-6">
        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Bookings */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  Active Bookings
                </CardDescription>
                <CardTitle className="text-3xl font-bold mt-2">
                  {metrics.todayBookings}
                </CardTitle>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardFooter className="pt-0 pb-4">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  2 Surf
                </Badge>
                <Badge variant="outline" className="text-xs">
                  1 Kite
                </Badge>
                <Badge variant="outline" className="text-xs">
                  1 Pending
                </Badge>
              </div>
            </CardFooter>
          </Card>

          {/* Staff On Duty */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  Staff On Duty
                </CardDescription>
                <CardTitle className="text-3xl font-bold mt-2">
                  {metrics.activeStaff}
                </CardTitle>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5 text-muted-foreground mb-2" />
                <div className="flex -space-x-1">
                  {staffOnDuty.slice(0, 3).map((staff, index) => (
                    <Avatar
                      key={index}
                      className="border-2 border-background w-6 h-6"
                    >
                      <AvatarImage src={staff.avatar} alt={staff.name} />
                      <AvatarFallback className="text-xs">
                        {staff.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {staffOnDuty.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                      +{staffOnDuty.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardFooter className="pt-0 pb-4">
              <p className="text-xs text-muted-foreground">Next shift: 14:00</p>
            </CardFooter>
          </Card>

          {/* Ocean Status */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  Ocean Status
                </CardDescription>
                <CardTitle className="text-3xl font-bold capitalize mt-2">
                  {metrics.oceanCondition}
                </CardTitle>
              </div>
              <div className="flex flex-col items-center">
                <Waves className="h-5 w-5 text-muted-foreground mb-2" />
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 border-green-200 text-xs"
                >
                  Excellent
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="pt-0 pb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-3 w-3 mr-1" />
                Details
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule Widget */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Today's Schedule</CardTitle>
                  <Select value={selectedView} onValueChange={setSelectedView}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-0">
                    {todaysBookings.map((booking, index) => (
                      <div key={booking.id}>
                        <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="font-bold text-lg font-mono min-w-[4rem]">
                              {booking.time}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={booking.avatar}
                                alt={booking.customer}
                              />
                              <AvatarFallback>
                                {booking.customer[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-base">
                                {booking.customer}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                {getActivityIcon(booking.activity)}
                                {booking.activity} • {booking.instructor}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                getStatusColor(booking.status) as
                                  | "default"
                                  | "secondary"
                                  | "outline"
                                  | "destructive"
                              }
                            >
                              {booking.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Check In</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Booking
                                </DropdownMenuItem>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {index < todaysBookings.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Dialog
                  open={showBookingModal}
                  onOpenChange={setShowBookingModal}
                >
                  <DialogTrigger asChild>
                    <Button className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>New Booking</DialogTitle>
                      <DialogDescription>
                        Create a new booking for a customer
                      </DialogDescription>
                    </DialogHeader>
                    <QuickBookingForm />
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowBookingModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="outline">Save Draft</Button>
                      <Button>Confirm Booking</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/operator/calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar View
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="link" className="p-0 h-auto">
                    <Eye className="h-4 w-4 mr-1" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-0">
                    {recentActivity.map((activity, index) => (
                      <div key={activity.id}>
                        <div className="flex items-center gap-3 py-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={activity.avatar}
                              alt={activity.customer}
                            />
                            <AvatarFallback>
                              {activity.customer[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {activity.message}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {activity.customer}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {activity.time}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                        {index < recentActivity.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Ocean Conditions Map */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    Ocean Conditions
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <OceanConditionsMap />
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <div className="flex items-center justify-between w-full text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Wind: 8-12 kts NE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Waves: 2-3 ft</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Alert Configuration
                </Button>
              </CardFooter>
            </Card>

            {/* Weather Alert */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-900">Weather Alert</AlertTitle>
              <AlertDescription className="text-orange-800">
                Strong offshore winds expected after 4 PM. Consider rescheduling
                later sessions.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Ocean Conditions Map Component
function OceanConditionsMap() {
  const [selectedLayer, setSelectedLayer] = useState("wind");
  const [mapZoom, setMapZoom] = useState(10);

  // Mock wind/wave data points for visualization
  const windData = [
    { x: 20, y: 30, intensity: 8, direction: 45 },
    { x: 40, y: 50, intensity: 12, direction: 60 },
    { x: 60, y: 25, intensity: 6, direction: 30 },
    { x: 80, y: 70, intensity: 15, direction: 90 },
    { x: 30, y: 80, intensity: 10, direction: 120 },
  ];

  const waveData = [
    { x: 25, y: 35, height: 2.5, period: 8 },
    { x: 45, y: 55, height: 3.2, period: 10 },
    { x: 65, y: 30, height: 1.8, period: 6 },
    { x: 85, y: 75, height: 4.1, period: 12 },
    { x: 35, y: 85, height: 2.9, period: 9 },
  ];

  const getWindColor = (intensity: number) => {
    if (intensity < 5) return "rgb(34, 197, 94)"; // green
    if (intensity < 10) return "rgb(59, 130, 246)"; // blue
    if (intensity < 15) return "rgb(251, 191, 36)"; // yellow
    return "rgb(239, 68, 68)"; // red
  };

  const getWaveColor = (height: number) => {
    if (height < 2) return "rgb(34, 197, 94)"; // green
    if (height < 3) return "rgb(59, 130, 246)"; // blue
    if (height < 4) return "rgb(251, 191, 36)"; // yellow
    return "rgb(239, 68, 68)"; // red
  };

  return (
    <div className="relative">
      {/* Map Container */}
      <div className="relative h-[300px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 overflow-hidden">
        {/* Coastline mockup */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-yellow-200 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-24 bg-gradient-to-tl from-yellow-200 to-transparent rounded-tl-3xl"></div>

        {/* Wind Layer */}
        {selectedLayer === "wind" && (
          <>
            {windData.map((point, index) => (
              <div
                key={`wind-${index}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
              >
                {/* Wind arrow */}
                <div
                  className="w-6 h-6 flex items-center justify-center"
                  style={{
                    transform: `rotate(${point.direction}deg)`,
                  }}
                >
                  <Wind
                    className="w-4 h-4"
                    style={{ color: getWindColor(point.intensity) }}
                  />
                </div>
                {/* Wind speed label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white/80 px-1 rounded">
                  {point.intensity}kt
                </div>
              </div>
            ))}
          </>
        )}

        {/* Wave Layer */}
        {selectedLayer === "waves" && (
          <>
            {waveData.map((point, index) => (
              <div
                key={`wave-${index}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
              >
                {/* Wave circle */}
                <div
                  className="w-8 h-8 rounded-full border-2 animate-ping"
                  style={{
                    borderColor: getWaveColor(point.height),
                    backgroundColor: `${getWaveColor(point.height)}20`,
                  }}
                ></div>
                {/* Wave height label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white/80 px-1 rounded">
                  {point.height}ft
                </div>
              </div>
            ))}
          </>
        )}

        {/* Temperature Layer */}
        {selectedLayer === "temperature" && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-200/30 via-yellow-200/30 to-blue-200/30">
            <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
              22°C
            </div>
            <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
              24°C
            </div>
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 px-2 py-1 rounded text-sm font-medium">
              23°C
            </div>
          </div>
        )}

        {/* Location marker for surf spot */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <MapPin className="w-6 h-6 text-red-500 drop-shadow-lg" />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white/90 px-2 py-1 rounded shadow">
            Surf Spot
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white/90">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white/90">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-white/90">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white/90">
              <Layers className="w-4 h-4 mr-1" />
              {selectedLayer}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedLayer("wind")}>
              <Wind className="w-4 h-4 mr-2" />
              Wind
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedLayer("waves")}>
              <Waves className="w-4 h-4 mr-2" />
              Waves
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedLayer("temperature")}>
              <Activity className="w-4 h-4 mr-2" />
              Temperature
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Time Controls */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="bg-white/90 rounded-lg p-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Now</span>
            <span>+6h</span>
            <span>+12h</span>
            <span>+24h</span>
          </div>
          <div className="relative">
            <div className="h-1 bg-muted rounded-full"></div>
            <div className="absolute top-0 left-0 w-1/4 h-1 bg-primary rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </div>

      {/* Legend */}
      {selectedLayer === "wind" && (
        <div className="absolute bottom-16 right-3 bg-white/90 rounded-lg p-2 text-xs">
          <div className="font-medium mb-1">Wind Speed</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>0-5 kts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>5-10 kts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>10-15 kts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>15+ kts</span>
            </div>
          </div>
        </div>
      )}

      {selectedLayer === "waves" && (
        <div className="absolute bottom-16 right-3 bg-white/90 rounded-lg p-2 text-xs">
          <div className="font-medium mb-1">Wave Height</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>0-2 ft</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>2-3 ft</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>3-4 ft</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>4+ ft</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Quick Booking Form Component
function QuickBookingForm() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const activities = ["Surf", "Kite", "SUP", "Windsurf"];
  const instructors = ["Carlos", "Ana", "Miguel", "Sofia"];
  const equipment = ["Board", "Wetsuit", "Kite", "Harness", "Paddle"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Customer</Label>
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="joao">João Silva</SelectItem>
              <SelectItem value="maria">Maria Santos</SelectItem>
              <SelectItem value="pedro">Pedro Costa</SelectItem>
              <SelectItem value="new">+ Create New Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="activity">Activity</Label>
          <Select value={selectedActivity} onValueChange={setSelectedActivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity" />
            </SelectTrigger>
            <SelectContent>
              {activities.map((activity) => (
                <SelectItem key={activity} value={activity.toLowerCase()}>
                  {activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Select date & time
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-3">Date picker placeholder</div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours)</Label>
          <Input type="number" placeholder="2" min="0.5" max="8" step="0.5" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructor">Instructor</Label>
        <Select
          value={selectedInstructor}
          onValueChange={setSelectedInstructor}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select instructor" />
          </SelectTrigger>
          <SelectContent>
            {instructors.map((instructor) => (
              <SelectItem key={instructor} value={instructor.toLowerCase()}>
                {instructor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Equipment</Label>
        <div className="grid grid-cols-2 gap-2">
          {equipment.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={selectedEquipment.includes(item)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedEquipment([...selectedEquipment, item]);
                  } else {
                    setSelectedEquipment(
                      selectedEquipment.filter((e) => e !== item)
                    );
                  }
                }}
              />
              <Label htmlFor={item} className="text-sm">
                {item}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (€)</Label>
          <Input type="number" placeholder="45" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment">Payment Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
