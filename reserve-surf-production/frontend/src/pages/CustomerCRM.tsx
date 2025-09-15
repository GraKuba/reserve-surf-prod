import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Users,
  UserCheck,
  Mail,
  Phone,
  Euro,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Waves,
  Star,
  Crown,
  Award,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

export default function CustomerCRM() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);

  // Current user's spot (this would come from auth context in real app)
  const currentUserSpot = "Ericeira Beach";

  // Customer skill level system
  const skillLevels = {
    beginner: {
      name: "Beginner",
      description: "Learning basic techniques",
      color: "bg-green-100 text-green-800",
      icon: Award,
      minClasses: 0,
      maxClasses: 5,
    },
    intermediate: {
      name: "Intermediate",
      description: "Comfortable with basics",
      color: "bg-blue-100 text-blue-800",
      icon: Star,
      minClasses: 5,
      maxClasses: 15,
    },
    advanced: {
      name: "Advanced",
      description: "Mastering advanced techniques",
      color: "bg-purple-100 text-purple-800",
      icon: Crown,
      minClasses: 15,
      maxClasses: 30,
    },
    expert: {
      name: "Expert",
      description: "Instructor level skills",
      color: "bg-yellow-100 text-yellow-800",
      icon: Crown,
      minClasses: 30,
      maxClasses: Infinity,
    },
  };

  // Helper function to anonymize location
  const anonymizeLocation = (location: string, isOwnSpot: boolean) => {
    if (isOwnSpot) return location;
    // Return general area instead of specific beach
    if (location.includes("Ericeira")) return "North Coast";
    if (location.includes("Cascais") || location.includes("Carcavelos"))
      return "Lisbon Coast";
    if (location.includes("Guincho")) return "West Coast";
    if (location.includes("Costa da Caparica")) return "South Coast";
    return "Portugal Coast";
  };

  // Helper function to simplify activity titles
  const simplifyActivityTitle = (activity: string, isOwnSpot: boolean) => {
    if (isOwnSpot) return activity;
    if (activity.toLowerCase().includes("surf")) return "Surf Session";
    if (
      activity.toLowerCase().includes("board") ||
      activity.toLowerCase().includes("rental")
    )
      return "Equipment Rental";
    if (activity.toLowerCase().includes("coaching")) return "Coaching Session";
    return "Water Sport";
  };

  // Helper function to format date to month/year
  const formatMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Mock customer data with booking history, upcoming bookings, levels, and feedback
  const customers = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "+351 912 345 678",
      lastBooking: "2024-03-10",
      totalSpent: 450,
      totalBookings: 8,
      joinDate: "2023-05-15",
      skillLevel: "intermediate",
      totalClasses: 8,
      skillProgress: 60, // 60% towards Advanced level
      trainerFeedback: {
        averageRating: 4.6,
        totalFeedback: 8,
        recentFeedback: [
          {
            rating: 5,
            comment:
              "Great improvement in wave reading! João shows excellent progress with paddle technique.",
            trainer: "Carlos Silva",
            date: "2024-03-10",
            skills: ["Wave Reading", "Paddle Technique"],
          },
          {
            rating: 4,
            comment: "Good stance improvement, needs work on bottom turns.",
            trainer: "Maria Santos",
            date: "2024-02-28",
            skills: ["Stance", "Bottom Turns"],
          },
        ],
      },
      bookingHistory: [
        {
          id: 101,
          date: "2024-03-10",
          time: "09:00",
          activity: "Surf Lesson",
          location: "Ericeira Beach",
          duration: "2 hours",
          price: 55,
          status: "completed",
        },
        {
          id: 102,
          date: "2024-02-28",
          time: "14:00",
          activity: "Board Rental",
          location: "Carcavelos Beach",
          duration: "4 hours",
          price: 35,
          status: "completed",
        },
        {
          id: 103,
          date: "2024-02-15",
          time: "10:30",
          activity: "Surf Lesson",
          location: "Guincho Beach",
          duration: "2 hours",
          price: 60,
          status: "completed",
        },
      ],
      upcomingBookings: [
        {
          id: 201,
          date: "2024-03-25",
          time: "08:00",
          activity: "Advanced Surf Lesson",
          location: "Ericeira Beach",
          duration: "3 hours",
          price: 75,
          status: "confirmed",
        },
      ],
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "+351 923 456 789",
      lastBooking: "2024-03-15",
      totalSpent: 280,
      totalBookings: 4,
      joinDate: "2023-08-22",
      skillLevel: "beginner",
      totalClasses: 4,
      skillProgress: 80, // 80% towards Intermediate level
      trainerFeedback: {
        averageRating: 4.2,
        totalFeedback: 4,
        recentFeedback: [
          {
            rating: 4,
            comment:
              "Maria is making good progress with basic stance. Needs more practice with pop-up timing.",
            trainer: "Pedro Costa",
            date: "2024-03-15",
            skills: ["Basic Stance", "Pop-up Timing"],
          },
          {
            rating: 5,
            comment: "Excellent improvement in balance and confidence!",
            trainer: "Ana Rodrigues",
            date: "2024-03-01",
            skills: ["Balance", "Confidence"],
          },
        ],
      },
      bookingHistory: [
        {
          id: 104,
          date: "2024-03-15",
          time: "11:00",
          activity: "Surf Lesson",
          location: "Costa da Caparica",
          duration: "2 hours",
          price: 50,
          status: "completed",
        },
        {
          id: 105,
          date: "2024-03-01",
          time: "16:00",
          activity: "Board Rental",
          location: "Cascais",
          duration: "3 hours",
          price: 30,
          status: "completed",
        },
      ],
      upcomingBookings: [
        {
          id: 202,
          date: "2024-03-28",
          time: "10:00",
          activity: "Surf Lesson",
          location: "Guincho Beach",
          duration: "2 hours",
          price: 55,
          status: "confirmed",
        },
        {
          id: 203,
          date: "2024-04-05",
          time: "09:30",
          activity: "Board Rental",
          location: "Ericeira Beach",
          duration: "4 hours",
          price: 40,
          status: "pending",
        },
      ],
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "+351 934 567 890",
      lastBooking: "2024-02-28",
      totalSpent: 125,
      totalBookings: 2,
      joinDate: "2024-01-10",
      skillLevel: "beginner",
      totalClasses: 2,
      skillProgress: 40, // 40% towards Intermediate level
      trainerFeedback: {
        averageRating: 3.8,
        totalFeedback: 2,
        recentFeedback: [
          {
            rating: 4,
            comment:
              "Pedro shows good potential. Needs to work on wave selection and timing.",
            trainer: "Carlos Silva",
            date: "2024-02-28",
            skills: ["Wave Selection", "Timing"],
          },
          {
            rating: 3,
            comment:
              "Basic skills developing, needs more ocean time for confidence.",
            trainer: "Maria Santos",
            date: "2024-01-20",
            skills: ["Basic Skills", "Ocean Confidence"],
          },
        ],
      },
      bookingHistory: [
        {
          id: 106,
          date: "2024-02-28",
          time: "13:00",
          activity: "Board Rental",
          location: "Carcavelos Beach",
          duration: "2 hours",
          price: 25,
          status: "completed",
        },
        {
          id: 107,
          date: "2024-01-20",
          time: "15:30",
          activity: "Beginner Surf Lesson",
          location: "Costa da Caparica",
          duration: "1.5 hours",
          price: 45,
          status: "completed",
        },
      ],
      upcomingBookings: [],
    },
    {
      id: 4,
      name: "Sofia Alves",
      email: "sofia@email.com",
      phone: "+351 945 678 901",
      lastBooking: "2024-03-12",
      totalSpent: 680,
      totalBookings: 12,
      joinDate: "2022-11-08",
      skillLevel: "expert",
      totalClasses: 25,
      skillProgress: 100, // Max level reached
      trainerFeedback: {
        averageRating: 4.9,
        totalFeedback: 25,
        recentFeedback: [
          {
            rating: 5,
            comment:
              "Sofia demonstrates exceptional technique and could easily become an instructor. Her wave reading and positioning are outstanding.",
            trainer: "Carlos Silva",
            date: "2024-03-12",
            skills: ["Wave Reading", "Positioning", "Advanced Technique"],
          },
          {
            rating: 5,
            comment:
              "Perfect execution of advanced maneuvers. Sofia is ready for competition level surfing.",
            trainer: "Pedro Costa",
            date: "2024-03-05",
            skills: ["Advanced Maneuvers", "Competition Ready"],
          },
          {
            rating: 5,
            comment:
              "Instructor-level skills demonstrated. Sofia can now teach others.",
            trainer: "Ana Rodrigues",
            date: "2024-02-22",
            skills: ["Teaching Ability", "Instructor Level"],
          },
        ],
      },
      bookingHistory: [
        {
          id: 108,
          date: "2024-03-12",
          time: "07:30",
          activity: "Private Surf Coaching",
          location: "Ericeira Beach",
          duration: "3 hours",
          price: 120,
          status: "completed",
        },
        {
          id: 109,
          date: "2024-03-05",
          time: "08:00",
          activity: "Advanced Surf Lesson",
          location: "Guincho Beach",
          duration: "2.5 hours",
          price: 85,
          status: "completed",
        },
        {
          id: 110,
          date: "2024-02-22",
          time: "09:00",
          activity: "Surf Competition Training",
          location: "Ericeira Beach",
          duration: "4 hours",
          price: 150,
          status: "completed",
        },
      ],
      upcomingBookings: [
        {
          id: 204,
          date: "2024-03-30",
          time: "07:00",
          activity: "Private Surf Coaching",
          location: "Ericeira Beach",
          duration: "3 hours",
          price: 120,
          status: "confirmed",
        },
        {
          id: 205,
          date: "2024-04-08",
          time: "08:30",
          activity: "Advanced Surf Lesson",
          location: "Guincho Beach",
          duration: "2.5 hours",
          price: 85,
          status: "confirmed",
        },
      ],
    },
  ];

  const getSkillLevelBadge = (skillLevel: string) => {
    const levelInfo = skillLevels[skillLevel as keyof typeof skillLevels];
    const IconComponent = levelInfo.icon;
    return (
      <Badge className={levelInfo.color}>
        <IconComponent className="h-3 w-3 mr-1" />
        {levelInfo.name}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-300"
          >
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-600 border-red-300">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const toggleCustomerExpansion = (customerId: number) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      pageTitle="Customer Management"
      breadcrumbs={[{ title: "Customers" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-gray-500">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Customers
              </CardTitle>
              <UserCheck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-gray-500">85% retention rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Spend
              </CardTitle>
              <Euro className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €
                {Math.round(
                  customers.reduce((acc, c) => acc + c.totalSpent, 0) /
                    customers.length
                )}
              </div>
              <p className="text-xs text-gray-500">per customer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Trainer Rating
              </CardTitle>
              <Star className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {(
                    customers.reduce(
                      (acc, c) => acc + c.trainerFeedback.averageRating,
                      0
                    ) / customers.length
                  ).toFixed(1)}
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(
                    customers.reduce(
                      (acc, c) => acc + c.trainerFeedback.averageRating,
                      0
                    ) / customers.length
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {customers.reduce(
                  (acc, c) => acc + c.trainerFeedback.totalFeedback,
                  0
                )}{" "}
                total trainer feedback
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Skill Level</TableHead>
                  <TableHead>Last Booking</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <>
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleCustomerExpansion(customer.id)}
                    >
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
                              expandedCustomer === customer.id
                                ? "rotate-90"
                                : "rotate-0"
                            }`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.totalBookings} bookings
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getSkillLevelBadge(customer.skillLevel)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatMonthYear(customer.lastBooking)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          €{customer.totalSpent}
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Booking History</DropdownMenuItem>
                            <DropdownMenuItem>
                              View Trainer Feedback
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Add Trainer Feedback
                            </DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row */}
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedCustomer === customer.id
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-gray-50 border-t border-gray-200">
                            <div
                              className={`p-4 transition-all duration-300 ease-in-out ${
                                expandedCustomer === customer.id
                                  ? "transform translate-y-0"
                                  : "transform -translate-y-4"
                              }`}
                            >
                              {/* Customer Header */}
                              <div className="bg-white rounded-lg p-4 mb-4 border">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                      <AvatarFallback className="text-lg font-semibold">
                                        {customer.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                      <h3 className="text-lg font-semibold">
                                        {customer.name}
                                      </h3>
                                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                                        <span>
                                          {getSkillLevelBadge(
                                            customer.skillLevel
                                          )}
                                        </span>
                                        <Separator
                                          orientation="vertical"
                                          className="h-4"
                                        />
                                        <span>
                                          {customer.totalClasses} classes
                                        </span>
                                        <Separator
                                          orientation="vertical"
                                          className="h-4"
                                        />
                                        <span>
                                          Member since{" "}
                                          {formatMonthYear(customer.joinDate)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <Button size="sm" variant="default">
                                      <Plus className="h-4 w-4 mr-2" />
                                      New Booking
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Mail className="h-4 w-4 mr-2" />
                                      Contact
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Tabbed Content */}
                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="overview">
                                    Overview
                                  </TabsTrigger>
                                  <TabsTrigger value="feedback">
                                    Trainer Feedback
                                  </TabsTrigger>
                                  <TabsTrigger value="activity">
                                    Activity
                                  </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                  value="overview"
                                  className="space-y-4 mt-4"
                                >
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Upcoming Bookings - Priority 1 */}
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                          <Calendar className="h-5 w-5" />
                                          Upcoming Bookings
                                          {customer.upcomingBookings.length >
                                            0 && (
                                            <Badge
                                              variant="secondary"
                                              className="ml-auto"
                                            >
                                              {customer.upcomingBookings.length}
                                            </Badge>
                                          )}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4">
                                        {customer.upcomingBookings.length >
                                        0 ? (
                                          <div className="space-y-3">
                                            {customer.upcomingBookings.map(
                                              (booking) => (
                                                <div
                                                  key={booking.id}
                                                  className="border rounded-lg p-3 bg-gray-50"
                                                >
                                                  <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium">
                                                      {simplifyActivityTitle(
                                                        booking.activity,
                                                        booking.location.includes(
                                                          currentUserSpot
                                                        )
                                                      )}
                                                    </h4>
                                                    {getBookingStatusBadge(
                                                      booking.status
                                                    )}
                                                  </div>
                                                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                      <Calendar className="h-4 w-4" />
                                                      {formatMonthYear(
                                                        booking.date
                                                      )}
                                                    </div>
                                                    {booking.location.includes(
                                                      currentUserSpot
                                                    ) && (
                                                      <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        {booking.time}
                                                      </div>
                                                    )}
                                                    <div className="flex items-center gap-2">
                                                      <MapPin className="h-4 w-4" />
                                                      {anonymizeLocation(
                                                        booking.location,
                                                        booking.location.includes(
                                                          currentUserSpot
                                                        )
                                                      )}
                                                    </div>
                                                    {booking.location.includes(
                                                      currentUserSpot
                                                    ) && (
                                                      <div className="flex items-center gap-2">
                                                        <Euro className="h-4 w-4" />
                                                        €{booking.price}
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        ) : (
                                          <div className="text-center py-8 text-gray-500">
                                            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p>No upcoming bookings</p>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>

                                    {/* Quick Stats */}
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                          <Users className="h-5 w-5" />
                                          Quick Stats
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">
                                              {customer.totalClasses}
                                            </div>
                                            <div className="text-sm text-blue-600">
                                              Total Classes
                                            </div>
                                          </div>
                                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                            <div className="flex items-center justify-center gap-1">
                                              {renderStars(
                                                customer.trainerFeedback
                                                  .averageRating
                                              )}
                                            </div>
                                            <div className="text-sm text-yellow-600 mt-1">
                                              Avg Rating
                                            </div>
                                          </div>
                                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">
                                              {customer.totalBookings}
                                            </div>
                                            <div className="text-sm text-purple-600">
                                              Total Bookings
                                            </div>
                                          </div>
                                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                                            <div className="text-lg font-bold text-orange-600">
                                              {customer.skillProgress}%
                                            </div>
                                            <div className="text-sm text-orange-600">
                                              Level Progress
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>

                                <TabsContent
                                  value="feedback"
                                  className="space-y-4 mt-4"
                                >
                                  <Card>
                                    <CardHeader>
                                      <div className="flex items-center justify-between">
                                        <CardTitle className="text-base flex items-center gap-2">
                                          <MessageSquare className="h-5 w-5" />
                                          Trainer Feedback
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                          {renderStars(
                                            customer.trainerFeedback
                                              .averageRating
                                          )}
                                          <span className="font-semibold">
                                            {
                                              customer.trainerFeedback
                                                .averageRating
                                            }
                                          </span>
                                          <span className="text-sm text-gray-500">
                                            (
                                            {
                                              customer.trainerFeedback
                                                .totalFeedback
                                            }{" "}
                                            reviews)
                                          </span>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                      <div className="space-y-4">
                                        {customer.trainerFeedback.recentFeedback.map(
                                          (feedback, index) => (
                                            <div
                                              key={index}
                                              className="border rounded-lg p-4 bg-gray-50"
                                            >
                                              <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                  {renderStars(feedback.rating)}
                                                  <span className="text-sm text-gray-500">
                                                    by {feedback.trainer}
                                                  </span>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                  {formatMonthYear(
                                                    feedback.date
                                                  )}
                                                </span>
                                              </div>
                                              <p className="text-gray-700 mb-3">
                                                {feedback.comment}
                                              </p>
                                              <div className="flex flex-wrap gap-2">
                                                {feedback.skills.map(
                                                  (skill, skillIndex) => (
                                                    <Badge
                                                      key={skillIndex}
                                                      variant="secondary"
                                                      className="text-xs"
                                                    >
                                                      {skill}
                                                    </Badge>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      <div className="flex gap-2 mt-4 pt-4 border-t">
                                        <Button
                                          size="sm"
                                          variant="default"
                                          className="flex-1"
                                        >
                                          <ThumbsUp className="h-4 w-4 mr-2" />
                                          Add Feedback
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="flex-1"
                                        >
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          View All
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                <TabsContent
                                  value="activity"
                                  className="space-y-4 mt-4"
                                >
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-base flex items-center gap-2">
                                        <Waves className="h-5 w-5" />
                                        Booking History
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                      <div className="space-y-3">
                                        {customer.bookingHistory.map(
                                          (booking) => (
                                            <div
                                              key={booking.id}
                                              className="border rounded-lg p-3 bg-gray-50"
                                            >
                                              <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">
                                                  {simplifyActivityTitle(
                                                    booking.activity,
                                                    booking.location.includes(
                                                      currentUserSpot
                                                    )
                                                  )}
                                                </h4>
                                                {getBookingStatusBadge(
                                                  booking.status
                                                )}
                                              </div>
                                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                  <Calendar className="h-4 w-4" />
                                                  {formatMonthYear(
                                                    booking.date
                                                  )}
                                                </div>
                                                {booking.location.includes(
                                                  currentUserSpot
                                                ) && (
                                                  <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {booking.time}
                                                  </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                  <MapPin className="h-4 w-4" />
                                                  {anonymizeLocation(
                                                    booking.location,
                                                    booking.location.includes(
                                                      currentUserSpot
                                                    )
                                                  )}
                                                </div>
                                                {booking.location.includes(
                                                  currentUserSpot
                                                ) && (
                                                  <div className="flex items-center gap-2">
                                                    <Euro className="h-4 w-4" />
                                                    €{booking.price}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
