import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Calendar,
  Clock,
  TrendingUp,
  Waves,
  Wind,
  Thermometer,
  AlertTriangle,
  MoreVertical,
  Plus,
  UserCheck,
  MapPin,
} from "lucide-react";

export default function OperatorDashboard() {
  const [selectedView, setSelectedView] = useState("day");

  // Mock data
  const todaysBookings = [
    {
      id: 1,
      time: "08:00",
      customer: "João Silva",
      activity: "Surf",
      status: "confirmed",
      instructor: "Carlos",
      equipment: "Board + Wetsuit",
    },
    {
      id: 2,
      time: "10:00",
      customer: "Maria Santos",
      activity: "Surf",
      status: "checked-in",
      instructor: "Ana",
      equipment: "Board + Wetsuit",
    },
    {
      id: 3,
      time: "14:00",
      customer: "Pedro Costa",
      activity: "Kite",
      status: "pending",
      instructor: "Miguel",
      equipment: "Kite + Harness",
    },
    {
      id: 4,
      time: "16:00",
      customer: "Sofia Alves",
      activity: "Surf",
      status: "confirmed",
      instructor: "Carlos",
      equipment: "Board + Wetsuit",
    },
  ];

  const metrics = {
    todayRevenue: 280,
    todayBookings: 4,
    tomorrowBookings: 7,
    activeAlerts: 1,
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

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      breadcrumbs={[]}
      showQuickActions={true}
    >
      <div className="space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{metrics.todayRevenue}</div>
              <p className="text-xs text-gray-500">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bookings Today
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.todayBookings}</div>
              <p className="text-xs text-gray-500">4 confirmed, 0 pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tomorrow's Schedule
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.tomorrowBookings}
              </div>
              <p className="text-xs text-gray-500">sessions booked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {metrics.activeAlerts}
              </div>
              <p className="text-xs text-gray-500">Weather warning</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Today's Schedule</CardTitle>
                  <Tabs value={selectedView} onValueChange={setSelectedView}>
                    <TabsList>
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.time}
                        </TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Waves className="h-4 w-4" />
                            {booking.activity}
                          </div>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Check In</DropdownMenuItem>
                              <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                              <DropdownMenuItem>Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Conditions Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Current Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wave Height</span>
                  <Badge variant="outline">2-3ft</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wind</span>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    <Badge variant="outline">8 kts NE</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Water Temp</span>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    <Badge variant="outline">18°C</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium">Next Tide</div>
                  <div className="text-xs text-gray-600">
                    High: 12:45 (3.2m)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Check-in Mode
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Today's Roster
                </Button>
              </CardContent>
            </Card>

            {/* Weather Alert */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-900">
                      Weather Alert
                    </div>
                    <div className="text-sm text-orange-800 mt-1">
                      Strong offshore winds expected after 4 PM. Consider
                      rescheduling later sessions.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
