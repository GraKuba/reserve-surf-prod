import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Users,
  Plus,
  Download,
  MoreVertical,
  Star,
  Calendar,
  Clock,
  Euro,
  AlertTriangle,
  CheckCircle,
  Grid3X3,
  List,
  User,
  Phone,
  Mail,
  MapPin,
  Award,
  Languages,
  Briefcase,
} from "lucide-react";

export default function StaffManagement() {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Senior Surf Instructor",
      avatar: "/avatars/carlos.jpg",
      status: "active",
      rating: 4.9,
      totalBookings: 342,
      revenue: 15680,
      hoursThisWeek: 32,
      nextShift: "Tomorrow 08:00",
      phone: "+351 912 345 678",
      email: "carlos@reservesurf.com",
      location: "Ericeira, Portugal",
      certifications: ["ISA Level 2", "Lifeguard", "First Aid"],
      languages: ["Portuguese", "English", "Spanish"],
      specialties: ["Beginner Lessons", "Advanced Techniques", "Longboard"],
      joinDate: "2022-03-15",
      hourlyRate: 25,
    },
    {
      id: 2,
      name: "Ana Costa",
      role: "Surf Instructor",
      avatar: "/avatars/ana.jpg",
      status: "active",
      rating: 4.8,
      totalBookings: 287,
      revenue: 12340,
      hoursThisWeek: 28,
      nextShift: "Today 14:00",
      phone: "+351 913 456 789",
      email: "ana@reservesurf.com",
      location: "Ericeira, Portugal",
      certifications: ["ISA Level 1", "Lifeguard"],
      languages: ["Portuguese", "English"],
      specialties: ["Kids Classes", "Women's Groups", "Photography"],
      joinDate: "2023-01-10",
      hourlyRate: 22,
    },
    {
      id: 3,
      name: "Miguel Santos",
      role: "Kite Instructor",
      avatar: "/avatars/miguel.jpg",
      status: "break",
      rating: 4.7,
      totalBookings: 156,
      revenue: 8920,
      hoursThisWeek: 0,
      nextShift: "Monday 10:00",
      phone: "+351 914 567 890",
      email: "miguel@reservesurf.com",
      location: "Ericeira, Portugal",
      certifications: ["IKO Level 3", "Safety Rescue"],
      languages: ["Portuguese", "English", "French"],
      specialties: ["Kite Surfing", "Wing Foiling", "Equipment Repair"],
      joinDate: "2021-06-20",
      hourlyRate: 30,
    },
    {
      id: 4,
      name: "Sofia Alves",
      role: "Assistant & Photographer",
      avatar: "/avatars/sofia.jpg",
      status: "active",
      rating: 4.6,
      totalBookings: 89,
      revenue: 3560,
      hoursThisWeek: 20,
      nextShift: "Today 16:00",
      phone: "+351 915 678 901",
      email: "sofia@reservesurf.com",
      location: "Ericeira, Portugal",
      certifications: ["Photography", "Social Media"],
      languages: ["Portuguese", "English"],
      specialties: ["Photo Sessions", "Social Media", "Equipment Setup"],
      joinDate: "2023-09-01",
      hourlyRate: 15,
    },
  ];

  const expiringCertifications = [
    {
      staff: "Carlos Silva",
      cert: "Lifeguard",
      expiryDate: "2024-02-15",
      daysLeft: 28,
    },
    {
      staff: "Miguel Santos",
      cert: "Safety Rescue",
      expiryDate: "2024-03-01",
      daysLeft: 42,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "secondary";
      case "break":
        return "outline";
      case "offline":
        return "destructive";
      default:
        return "outline";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <DashboardLayout
      pageTitle="Staff Management"
      breadcrumbs={[{ title: "Staff" }]}
      showQuickActions={true}
    >
      <div className="space-y-6">
        {/* Staff Header */}
        <div className="flex items-center justify-between">
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {staffMembers.filter((s) => s.status === "active").length}{" "}
                Active Staff
              </span>
            </div>
          </Card>

          <div className="flex items-center gap-2">
            <Dialog open={showStaffModal} onOpenChange={setShowStaffModal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl animate-in fade-in-0 zoom-in-95 duration-300">
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>
                    Create a new staff member profile with all necessary details
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <StaffForm />
                <Separator />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowStaffModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Save Staff Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button variant="outline">Download Template</Button>
          </div>
        </div>

        {/* Certification Alerts */}
        {expiringCertifications.length > 0 && (
          <Alert className="border-none bg-transparent p-0">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-gray-900 font-semibold text-lg">
                Certification Alerts ({expiringCertifications.length})
              </AlertTitle>
            </div>
            <AlertDescription>
              <div className="flex flex-wrap gap-4">
                {expiringCertifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white border border-amber-200 rounded-lg shadow-sm flex-1 min-w-[320px]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-gray-900">
                          {cert.staff}
                        </div>
                        <div className="text-sm text-gray-700">{cert.cert}</div>
                        <div className="text-xs text-gray-500">
                          Expires {cert.expiryDate} • {cert.daysLeft} days left
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-700 border-amber-300 hover:bg-amber-50"
                      >
                        Renew
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Staff Views with Tabs */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {staffMembers.map((staff) => (
                <Card
                  key={staff.id}
                  className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14 border-2">
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback className="text-lg font-semibold">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-lg">{staff.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {staff.role}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getStatusColor(staff.status) as any}
                            className="text-xs"
                          >
                            {staff.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(staff.rating)}
                            <span className="text-xs text-muted-foreground ml-1">
                              {staff.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <Separator />

                  <CardContent className="space-y-6 pt-6">
                    {/* Qualifications */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-muted-foreground">
                        Qualifications
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {staff.certifications
                            .slice(0, 2)
                            .map((cert, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                <Award className="h-3 w-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          {staff.certifications.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{staff.certifications.length - 2}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {staff.languages.slice(0, 2).map((lang, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              <Languages className="h-3 w-3 mr-1" />
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Schedule Summary */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-muted-foreground">
                        This Week
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Hours worked</span>
                          <span className="font-medium">
                            {staff.hoursThisWeek}h
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Next shift</span>
                          <span className="text-muted-foreground">
                            {staff.nextShift}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs w-full justify-center mt-2"
                        >
                          Available
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Performance Metrics */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-muted-foreground">
                        Performance
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total bookings</span>
                          <span className="font-medium">
                            {staff.totalBookings}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Revenue generated</span>
                          <span className="font-medium">
                            €{staff.revenue.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={85} className="h-2 mt-3" />
                      </div>
                    </div>
                  </CardContent>

                  <Separator />

                  <CardFooter className="pt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <MoreVertical className="h-4 w-4 mr-2" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setSelectedStaff(staff)}
                        >
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuItem>View Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}

              {/* Add Staff Card */}
              <Card className="border-dashed border-2 hover:border-solid transition-all cursor-pointer hover:shadow-lg">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[500px] space-y-4">
                  <Plus className="h-16 w-16 text-muted-foreground" />
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium">
                      Add New Staff Member
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Expand your team
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowStaffModal(true)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
                <CardDescription>
                  Manage all staff members and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>This Week</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffMembers.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={staff.avatar}
                                alt={staff.name}
                              />
                              <AvatarFallback>{staff.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{staff.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {staff.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(staff.status) as any}>
                            {staff.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {renderStars(staff.rating)}
                            <span className="text-sm ml-1">{staff.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{staff.hoursThisWeek}h</TableCell>
                        <TableCell>€{staff.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Staff availability and shift planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select defaultValue="current-week">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-week">Current Week</SelectItem>
                      <SelectItem value="next-week">Next Week</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="border rounded-lg p-4">
                    <div className="text-center text-muted-foreground py-8">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Schedule view coming soon</p>
                      <p className="text-sm">Drag and drop shift management</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Staff Detail Modal */}
        {selectedStaff && (
          <Dialog
            open={!!selectedStaff}
            onOpenChange={() => setSelectedStaff(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Staff Profile - {selectedStaff.name}</DialogTitle>
                <DialogDescription>
                  Complete staff member information and performance
                </DialogDescription>
              </DialogHeader>
              <StaffDetailView staff={selectedStaff} />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedStaff(null)}
                >
                  Close
                </Button>
                <Button>Edit Profile</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}

// Staff Form Component
function StaffForm() {
  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Personal Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="surf-instructor">Surf Instructor</SelectItem>
                <SelectItem value="kite-instructor">Kite Instructor</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
                <SelectItem value="photographer">Photographer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Contact Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Contact Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+351 912 345 678" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Street address, City, Country" />
        </div>
      </div>

      <Separator />

      {/* Employment Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Employment Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hourly-rate">Hourly Rate (€)</Label>
            <Input id="hourly-rate" type="number" placeholder="25" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" type="date" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Input id="notes" placeholder="Any additional information..." />
        </div>
      </div>
    </div>
  );
}

// Staff Detail View Component
function StaffDetailView({ staff }: { staff: any }) {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{staff.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{staff.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{staff.location}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Join Date</span>
                <span className="text-sm">{staff.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Hourly Rate
                </span>
                <span className="text-sm">€{staff.hourlyRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={getStatusColor(staff.status) as any}>
                  {staff.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="qualifications" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {staff.certifications.map((cert: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                    <Badge variant="outline">Valid</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Languages & Specialties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs font-medium mb-2">Languages</div>
                <div className="flex flex-wrap gap-2">
                  {staff.languages.map((lang: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      <Languages className="h-3 w-3 mr-1" />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium mb-2">Specialties</div>
                <div className="flex flex-wrap gap-2">
                  {staff.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staff.totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Revenue Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{staff.revenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Customer Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{staff.rating}</div>
                <div className="flex">{renderStars(staff.rating)}</div>
              </div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Current Week Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Schedule management coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "secondary";
    case "break":
      return "outline";
    case "offline":
      return "destructive";
    default:
      return "outline";
  }
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-3 w-3 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
}
