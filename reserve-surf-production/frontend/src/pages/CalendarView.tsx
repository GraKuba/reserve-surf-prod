import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

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
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Waves,
  Wind,
} from "lucide-react";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data for calendar
  const instructors = [
    {
      id: "carlos",
      name: "Carlos",
      avatar: "/avatars/carlos.jpg",
      status: "active",
    },
    { id: "ana", name: "Ana", avatar: "/avatars/ana.jpg", status: "active" },
    {
      id: "miguel",
      name: "Miguel",
      avatar: "/avatars/miguel.jpg",
      status: "break",
    },
    {
      id: "sofia",
      name: "Sofia",
      avatar: "/avatars/sofia.jpg",
      status: "active",
    },
  ];

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const bookings = [
    {
      id: 1,
      instructorId: "carlos",
      time: "08:00",
      duration: 2,
      customer: "João Silva",
      activity: "Surf",
      status: "confirmed",
      price: 45,
      equipment: ["Board", "Wetsuit"],
      avatar: "/avatars/joao.jpg",
    },
    {
      id: 2,
      instructorId: "ana",
      time: "10:00",
      duration: 1.5,
      customer: "Maria Santos",
      activity: "Surf",
      status: "checked-in",
      price: 35,
      equipment: ["Board", "Wetsuit"],
      avatar: "/avatars/maria.jpg",
    },
    {
      id: 3,
      instructorId: "miguel",
      time: "14:00",
      duration: 2,
      customer: "Pedro Costa",
      activity: "Kite",
      status: "pending",
      price: 65,
      equipment: ["Kite", "Harness"],
      avatar: "/avatars/pedro.jpg",
    },
  ];

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
        return <Waves className="h-4 w-4" />;
    }
  };

  const getBookingForSlot = (instructorId: string, timeSlot: string) => {
    return bookings.find(
      (booking) =>
        booking.instructorId === instructorId && booking.time === timeSlot
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout
      pageTitle="Calendar"
      breadcrumbs={[{ title: "Calendar" }]}
      showQuickActions={true}
    >
      <div className="space-y-6">
        {/* Calendar Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="min-w-[200px]">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {selectedDate
                          ? formatDate(selectedDate)
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dialog
                  open={showBookingModal}
                  onOpenChange={setShowBookingModal}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl animate-in fade-in-0 zoom-in-95 duration-300">
                    <DialogHeader>
                      <DialogTitle>New Booking</DialogTitle>
                      <DialogDescription>
                        Create a new booking for a customer
                      </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <BookingForm />
                    <Separator />
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowBookingModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button>Confirm Booking</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem>
                      By Activity
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      By Instructor
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Export PDF</DropdownMenuItem>
                    <DropdownMenuItem>Export CSV</DropdownMenuItem>
                    <DropdownMenuItem>Print Schedule</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Calendar Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Drag and drop bookings to reschedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Instructor</TableHead>
                        {timeSlots.map((time) => (
                          <TableHead
                            key={time}
                            className="text-center min-w-[120px]"
                          >
                            {time}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {instructors.map((instructor) => (
                        <TableRow key={instructor.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={instructor.avatar}
                                  alt={instructor.name}
                                />
                                <AvatarFallback>
                                  {instructor.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {instructor.name}
                                </div>
                                <Badge
                                  variant={
                                    instructor.status === "active"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {instructor.status}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          {timeSlots.map((timeSlot) => {
                            const booking = getBookingForSlot(
                              instructor.id,
                              timeSlot
                            );
                            return (
                              <TableCell
                                key={timeSlot}
                                className="p-1 text-center"
                              >
                                {booking ? (
                                  <Card className="min-h-[80px] cursor-pointer hover:shadow-md transition-shadow">
                                    <CardContent className="p-2">
                                      <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <Badge
                                            variant={
                                              getStatusColor(booking.status) as
                                                | "default"
                                                | "secondary"
                                                | "outline"
                                                | "destructive"
                                            }
                                            className="text-xs"
                                          >
                                            {booking.status}
                                          </Badge>
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-4 w-4 p-0"
                                              >
                                                <MoreVertical className="h-3 w-3" />
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                              <DropdownMenuItem>
                                                View Details
                                              </DropdownMenuItem>
                                              <DropdownMenuItem>
                                                Edit
                                              </DropdownMenuItem>
                                              <DropdownMenuItem>
                                                Check In
                                              </DropdownMenuItem>
                                              <DropdownMenuItem>
                                                Cancel
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          {getActivityIcon(booking.activity)}
                                          <span className="text-xs font-medium">
                                            {booking.activity}
                                          </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {booking.customer}
                                        </div>
                                        <Progress
                                          value={(booking.duration / 2) * 100}
                                          className="h-1"
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    className="w-full h-[80px] border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                                    onClick={() => setShowBookingModal(true)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Selected Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    {selectedDate
                      ? formatDate(selectedDate)
                      : "No date selected"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {bookings.length} bookings scheduled
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Bookings</span>
                  <Badge>{bookings.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Revenue</span>
                  <Badge variant="outline">
                    €{bookings.reduce((sum, b) => sum + b.price, 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Staff</span>
                  <Badge variant="secondary">
                    {instructors.filter((i) => i.status === "active").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Ocean Conditions Mini */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Waves className="h-4 w-4" />
                  Ocean Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conditions</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Good
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wave Height</span>
                  <Badge variant="outline">2-3ft</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wind</span>
                  <Badge variant="outline">8 kts NE</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Booking Form Component
function BookingForm() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const activities = ["Surf", "Kite", "SUP", "Windsurf"];
  const instructors = ["Carlos", "Ana", "Miguel", "Sofia"];
  const equipment = ["Board", "Wetsuit", "Kite", "Harness", "Paddle"];

  return (
    <div className="space-y-6">
      {/* Customer and Activity Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select
              value={selectedCustomer}
              onValueChange={setSelectedCustomer}
            >
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
            <Select
              value={selectedActivity}
              onValueChange={setSelectedActivity}
            >
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
      </div>

      <Separator />

      {/* Date, Time and Duration Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date & Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Select date & time
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" initialFocus />
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
      </div>

      <Separator />

      {/* Equipment Section */}
      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Equipment</Label>
          <div className="grid grid-cols-2 gap-3">
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
      </div>

      <Separator />

      {/* Price and Payment Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
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
    </div>
  );
}
