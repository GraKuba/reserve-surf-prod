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
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Waves,
} from "lucide-react";

export default function CustomerCRM() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);

  // Mock customer data with booking history and upcoming bookings
  const customers = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      phone: "+351 912 345 678",
      lastBooking: "2024-03-10",
      totalSpent: 450,
      totalBookings: 8,
      status: "active",
      joinDate: "2023-05-15",
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
      status: "active",
      joinDate: "2023-08-22",
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
      status: "inactive",
      joinDate: "2024-01-10",
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
      status: "vip",
      joinDate: "2022-11-08",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "vip":
        return <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="text-2xl font-bold">
                {
                  customers.filter(
                    (c) => c.status === "active" || c.status === "vip"
                  ).length
                }
              </div>
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
                  <TableHead>Last Booking</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
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
                        <div className="text-sm">
                          {new Date(customer.lastBooking).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          €{customer.totalSpent}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row */}
                    <TableRow>
                      <TableCell colSpan={7} className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedCustomer === customer.id
                              ? "max-h-[800px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-gray-50 border-t border-gray-200">
                            <div
                              className={`p-6 space-y-6 transition-all duration-300 ease-in-out ${
                                expandedCustomer === customer.id
                                  ? "transform translate-y-0"
                                  : "transform -translate-y-4"
                              }`}
                            >
                              {/* Customer Details */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card
                                  className={`transition-all duration-300 ease-in-out ${
                                    expandedCustomer === customer.id
                                      ? "opacity-100 transform translate-y-0"
                                      : "opacity-0 transform translate-y-2"
                                  }`}
                                  style={{
                                    transitionDelay:
                                      expandedCustomer === customer.id
                                        ? "100ms"
                                        : "0ms",
                                  }}
                                >
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      Customer Details
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2">
                                    <div className="text-sm">
                                      <span className="font-medium">
                                        Member since:
                                      </span>{" "}
                                      {new Date(
                                        customer.joinDate
                                      ).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-medium">
                                        Total bookings:
                                      </span>{" "}
                                      {customer.totalBookings}
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-medium">
                                        Total spent:
                                      </span>{" "}
                                      €{customer.totalSpent}
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-medium">
                                        Status:
                                      </span>{" "}
                                      {getStatusBadge(customer.status)}
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card
                                  className={`transition-all duration-300 ease-in-out ${
                                    expandedCustomer === customer.id
                                      ? "opacity-100 transform translate-y-0"
                                      : "opacity-0 transform translate-y-2"
                                  }`}
                                  style={{
                                    transitionDelay:
                                      expandedCustomer === customer.id
                                        ? "200ms"
                                        : "0ms",
                                  }}
                                >
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      Upcoming Bookings
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {customer.upcomingBookings.length > 0 ? (
                                      <div className="space-y-3">
                                        {customer.upcomingBookings
                                          .slice(0, 2)
                                          .map((booking) => (
                                            <div
                                              key={booking.id}
                                              className="border rounded-lg p-3 bg-white"
                                            >
                                              <div className="flex items-center justify-between mb-2">
                                                <div className="text-sm font-medium">
                                                  {booking.activity}
                                                </div>
                                                {getBookingStatusBadge(
                                                  booking.status
                                                )}
                                              </div>
                                              <div className="space-y-1 text-xs text-gray-600">
                                                <div className="flex items-center gap-2">
                                                  <Calendar className="h-3 w-3" />
                                                  {new Date(
                                                    booking.date
                                                  ).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <Clock className="h-3 w-3" />
                                                  {booking.time} •{" "}
                                                  {booking.duration}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <MapPin className="h-3 w-3" />
                                                  {booking.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <Euro className="h-3 w-3" />€
                                                  {booking.price}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        {customer.upcomingBookings.length >
                                          2 && (
                                          <div className="text-xs text-gray-500 text-center">
                                            +
                                            {customer.upcomingBookings.length -
                                              2}{" "}
                                            more upcoming
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-sm text-gray-500 text-center py-4">
                                        No upcoming bookings
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>

                                <Card
                                  className={`transition-all duration-300 ease-in-out ${
                                    expandedCustomer === customer.id
                                      ? "opacity-100 transform translate-y-0"
                                      : "opacity-0 transform translate-y-2"
                                  }`}
                                  style={{
                                    transitionDelay:
                                      expandedCustomer === customer.id
                                        ? "300ms"
                                        : "0ms",
                                  }}
                                >
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                      <Waves className="h-4 w-4" />
                                      Recent Activity
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {customer.bookingHistory
                                        .slice(0, 3)
                                        .map((booking) => (
                                          <div
                                            key={booking.id}
                                            className="border rounded-lg p-3 bg-white"
                                          >
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="text-sm font-medium">
                                                {booking.activity}
                                              </div>
                                              {getBookingStatusBadge(
                                                booking.status
                                              )}
                                            </div>
                                            <div className="space-y-1 text-xs text-gray-600">
                                              <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(
                                                  booking.date
                                                ).toLocaleDateString()}
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3" />
                                                {booking.location}
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Euro className="h-3 w-3" />€
                                                {booking.price}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      {customer.bookingHistory.length > 3 && (
                                        <div className="text-xs text-gray-500 text-center">
                                          +{customer.bookingHistory.length - 3}{" "}
                                          more bookings
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Action Buttons */}
                              <div
                                className={`flex gap-2 pt-4 border-t transition-all duration-300 ease-in-out ${
                                  expandedCustomer === customer.id
                                    ? "opacity-100 transform translate-y-0"
                                    : "opacity-0 transform translate-y-2"
                                }`}
                                style={{
                                  transitionDelay:
                                    expandedCustomer === customer.id
                                      ? "400ms"
                                      : "0ms",
                                }}
                              >
                                <Button size="sm" variant="default">
                                  <Plus className="h-4 w-4 mr-2" />
                                  New Booking
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Message
                                </Button>
                                <Button size="sm" variant="outline">
                                  View Full History
                                </Button>
                              </div>
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
