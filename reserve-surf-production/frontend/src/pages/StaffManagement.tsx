import { useState } from "react";

// TypeScript interfaces
interface StaffMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: string;
  rating: number;
  totalBookings: number;
  revenue: number;
  hoursThisWeek: number;
  nextShift: string;
  phone: string;
  email: string;
  location: string;
  certifications: string[];
  languages: string[];
  specialties: string[];
  joinDate: string;
  hourlyRate: number;
}

interface SickLeaveRequest {
  id: number;
  staffId: number;
  staffName: string;
  staffAvatar: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "denied";
  submittedDate: string;
  approvedBy: string | null;
  notes: string;
}

interface PayrollStaff {
  staffId: number;
  staffName: string;
  staffAvatar: string;
  role: string;
  hoursWorked: number;
  hourlyRate: number;
  regularPay: number;
  overtimePay: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  taxWithheld: number;
  socialSecurity: number;
  totalBookings: number;
  avgRating: number;
}

interface MonthlyPayrollData {
  totalCost: number;
  totalHours: number;
  averageHourlyRate: number;
  staffPayroll: PayrollStaff[];
}

interface PayrollData {
  [month: string]: MonthlyPayrollData;
}
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
  AlertTriangle,
  Grid3X3,
  List,
  User,
  Phone,
  Mail,
  MapPin,
  Award,
  Languages,
  Briefcase,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  FileText,
} from "lucide-react";

// Utility functions
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

const getSickLeaveStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "secondary";
    case "pending":
      return "outline";
    case "denied":
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

export default function StaffManagement() {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showSickLeaveModal, setShowSickLeaveModal] = useState(false);
  const [selectedSickLeave, setSelectedSickLeave] =
    useState<SickLeaveRequest | null>(null);
  const [selectedPayrollMonth, setSelectedPayrollMonth] =
    useState<string>("2024-01");
  const [showPayrollDetail, setShowPayrollDetail] = useState(false);
  const [selectedPayrollStaff, setSelectedPayrollStaff] =
    useState<PayrollStaff | null>(null);

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

  // Mock sick leave data
  const sickLeaveRequests: SickLeaveRequest[] = [
    {
      id: 1,
      staffId: 1,
      staffName: "Carlos Silva",
      staffAvatar: "/avatars/carlos.jpg",
      type: "Sick Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      days: 3,
      reason: "Flu symptoms",
      status: "approved",
      submittedDate: "2024-01-14",
      approvedBy: "Manager",
      notes: "Doctor's certificate provided",
    },
    {
      id: 2,
      staffId: 2,
      staffName: "Ana Costa",
      staffAvatar: "/avatars/ana.jpg",
      type: "Medical Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      days: 3,
      reason: "Medical appointment and recovery",
      status: "pending",
      submittedDate: "2024-01-18",
      approvedBy: null,
      notes: "Routine medical procedure",
    },
    {
      id: 3,
      staffId: 3,
      staffName: "Miguel Santos",
      staffAvatar: "/avatars/miguel.jpg",
      type: "Sick Leave",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      days: 3,
      reason: "Back injury",
      status: "denied",
      submittedDate: "2024-01-09",
      approvedBy: "Manager",
      notes: "Insufficient medical documentation",
    },
    {
      id: 4,
      staffId: 4,
      staffName: "Sofia Alves",
      staffAvatar: "/avatars/sofia.jpg",
      type: "Personal Leave",
      startDate: "2024-01-25",
      endDate: "2024-01-26",
      days: 2,
      reason: "Family emergency",
      status: "approved",
      submittedDate: "2024-01-24",
      approvedBy: "Manager",
      notes: "Emergency situation approved",
    },
  ];

  // Mock payroll data
  const payrollData: PayrollData = {
    "2024-01": {
      totalCost: 18750,
      totalHours: 520,
      averageHourlyRate: 23.5,
      staffPayroll: [
        {
          staffId: 1,
          staffName: "Carlos Silva",
          staffAvatar: "/avatars/carlos.jpg",
          role: "Senior Surf Instructor",
          hoursWorked: 160,
          hourlyRate: 25,
          regularPay: 4000,
          overtimePay: 0,
          bonuses: 200,
          deductions: 80,
          netPay: 4120,
          taxWithheld: 412,
          socialSecurity: 165,
          totalBookings: 28,
          avgRating: 4.9,
        },
        {
          staffId: 2,
          staffName: "Ana Costa",
          staffAvatar: "/avatars/ana.jpg",
          role: "Surf Instructor",
          hoursWorked: 140,
          hourlyRate: 22,
          regularPay: 3080,
          overtimePay: 0,
          bonuses: 150,
          deductions: 60,
          netPay: 3170,
          taxWithheld: 317,
          socialSecurity: 123,
          totalBookings: 24,
          avgRating: 4.8,
        },
        {
          staffId: 3,
          staffName: "Miguel Santos",
          staffAvatar: "/avatars/miguel.jpg",
          role: "Kite Instructor",
          hoursWorked: 120,
          hourlyRate: 30,
          regularPay: 3600,
          overtimePay: 0,
          bonuses: 300,
          deductions: 40,
          netPay: 3860,
          taxWithheld: 386,
          socialSecurity: 144,
          totalBookings: 18,
          avgRating: 4.7,
        },
        {
          staffId: 4,
          staffName: "Sofia Alves",
          staffAvatar: "/avatars/sofia.jpg",
          role: "Assistant & Photographer",
          hoursWorked: 100,
          hourlyRate: 15,
          regularPay: 1500,
          overtimePay: 0,
          bonuses: 50,
          deductions: 20,
          netPay: 1530,
          taxWithheld: 153,
          socialSecurity: 60,
          totalBookings: 12,
          avgRating: 4.6,
        },
      ],
    },
    "2023-12": {
      totalCost: 17200,
      totalHours: 480,
      averageHourlyRate: 23.2,
      staffPayroll: [
        {
          staffId: 1,
          staffName: "Carlos Silva",
          staffAvatar: "/avatars/carlos.jpg",
          role: "Senior Surf Instructor",
          hoursWorked: 150,
          hourlyRate: 25,
          regularPay: 3750,
          overtimePay: 0,
          bonuses: 180,
          deductions: 75,
          netPay: 3855,
          taxWithheld: 385,
          socialSecurity: 150,
          totalBookings: 26,
          avgRating: 4.9,
        },
        {
          staffId: 2,
          staffName: "Ana Costa",
          staffAvatar: "/avatars/ana.jpg",
          role: "Surf Instructor",
          hoursWorked: 130,
          hourlyRate: 22,
          regularPay: 2860,
          overtimePay: 0,
          bonuses: 140,
          deductions: 55,
          netPay: 2945,
          taxWithheld: 294,
          socialSecurity: 114,
          totalBookings: 22,
          avgRating: 4.8,
        },
        {
          staffId: 3,
          staffName: "Miguel Santos",
          staffAvatar: "/avatars/miguel.jpg",
          role: "Kite Instructor",
          hoursWorked: 110,
          hourlyRate: 30,
          regularPay: 3300,
          overtimePay: 0,
          bonuses: 280,
          deductions: 35,
          netPay: 3545,
          taxWithheld: 354,
          socialSecurity: 132,
          totalBookings: 16,
          avgRating: 4.7,
        },
        {
          staffId: 4,
          staffName: "Sofia Alves",
          staffAvatar: "/avatars/sofia.jpg",
          role: "Assistant & Photographer",
          hoursWorked: 90,
          hourlyRate: 15,
          regularPay: 1350,
          overtimePay: 0,
          bonuses: 45,
          deductions: 18,
          netPay: 1377,
          taxWithheld: 137,
          socialSecurity: 54,
          totalBookings: 10,
          avgRating: 4.6,
        },
      ],
    },
    "2023-11": {
      totalCost: 16800,
      totalHours: 465,
      averageHourlyRate: 23.1,
      staffPayroll: [
        {
          staffId: 1,
          staffName: "Carlos Silva",
          staffAvatar: "/avatars/carlos.jpg",
          role: "Senior Surf Instructor",
          hoursWorked: 145,
          hourlyRate: 25,
          regularPay: 3625,
          overtimePay: 0,
          bonuses: 170,
          deductions: 70,
          netPay: 3725,
          taxWithheld: 372,
          socialSecurity: 145,
          totalBookings: 25,
          avgRating: 4.9,
        },
        {
          staffId: 2,
          staffName: "Ana Costa",
          staffAvatar: "/avatars/ana.jpg",
          role: "Surf Instructor",
          hoursWorked: 125,
          hourlyRate: 22,
          regularPay: 2750,
          overtimePay: 0,
          bonuses: 130,
          deductions: 50,
          netPay: 2830,
          taxWithheld: 283,
          socialSecurity: 110,
          totalBookings: 21,
          avgRating: 4.8,
        },
        {
          staffId: 3,
          staffName: "Miguel Santos",
          staffAvatar: "/avatars/miguel.jpg",
          role: "Kite Instructor",
          hoursWorked: 105,
          hourlyRate: 30,
          regularPay: 3150,
          overtimePay: 0,
          bonuses: 260,
          deductions: 32,
          netPay: 3378,
          taxWithheld: 337,
          socialSecurity: 126,
          totalBookings: 15,
          avgRating: 4.7,
        },
        {
          staffId: 4,
          staffName: "Sofia Alves",
          staffAvatar: "/avatars/sofia.jpg",
          role: "Assistant & Photographer",
          hoursWorked: 90,
          hourlyRate: 15,
          regularPay: 1350,
          overtimePay: 0,
          bonuses: 40,
          deductions: 15,
          netPay: 1375,
          taxWithheld: 137,
          socialSecurity: 54,
          totalBookings: 9,
          avgRating: 4.6,
        },
      ],
    },
  };

  const availableMonths = Object.keys(payrollData).sort().reverse();

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
          <TabsList className="grid w-full grid-cols-5">
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
            <TabsTrigger value="sicleave" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Sick Leave
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payroll
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
                            variant={
                              getStatusColor(staff.status) as
                                | "secondary"
                                | "outline"
                                | "destructive"
                            }
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
                          <Badge
                            variant={
                              getStatusColor(staff.status) as
                                | "secondary"
                                | "outline"
                                | "destructive"
                            }
                          >
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

          <TabsContent value="sicleave" className="mt-6">
            <div className="space-y-6">
              {/* Sick Leave Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sick Leave Requests</CardTitle>
                      <CardDescription>
                        Manage staff sick leave and medical requests
                      </CardDescription>
                    </div>
                    <Dialog
                      open={showSickLeaveModal}
                      onOpenChange={setShowSickLeaveModal}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          New Request
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Submit Sick Leave Request</DialogTitle>
                          <DialogDescription>
                            Fill out the form below to submit a new sick leave
                            request
                          </DialogDescription>
                        </DialogHeader>
                        <SickLeaveForm />
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowSickLeaveModal(false)}
                          >
                            Cancel
                          </Button>
                          <Button>Submit Request</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sickLeaveRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={request.staffAvatar}
                                  alt={request.staffName}
                                />
                                <AvatarFallback>
                                  {request.staffName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {request.staffName}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{request.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {request.days} days
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {request.startDate} to {request.endDate}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className="max-w-[200px] truncate"
                              title={request.reason}
                            >
                              {request.reason}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                getSickLeaveStatusColor(request.status) as
                                  | "secondary"
                                  | "outline"
                                  | "destructive"
                              }
                            >
                              <div className="flex items-center gap-1">
                                {request.status === "approved" && (
                                  <CheckCircle className="h-3 w-3" />
                                )}
                                {request.status === "pending" && (
                                  <Clock className="h-3 w-3" />
                                )}
                                {request.status === "denied" && (
                                  <XCircle className="h-3 w-3" />
                                )}
                                {request.status}
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {request.submittedDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => setSelectedSickLeave(request)}
                                >
                                  View Details
                                </DropdownMenuItem>
                                {request.status === "pending" && (
                                  <>
                                    <DropdownMenuItem>Approve</DropdownMenuItem>
                                    <DropdownMenuItem>Deny</DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem>Edit</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="payroll" className="mt-6">
            <div className="space-y-6">


              {/* Month Selection and Payroll Details */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Monthly Payroll Breakdown</CardTitle>
                      <CardDescription>
                        Detailed staff payment information by month
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select
                        value={selectedPayrollMonth}
                        onValueChange={setSelectedPayrollMonth}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMonths.map((month) => (
                            <SelectItem key={month} value={month}>
                              {new Date(month + "-01").toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                }
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Payroll
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Regular Pay</TableHead>
                        <TableHead>Bonuses</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollData[selectedPayrollMonth]?.staffPayroll.map(
                        (staff) => (
                          <TableRow key={staff.staffId}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={staff.staffAvatar}
                                    alt={staff.staffName}
                                  />
                                  <AvatarFallback>
                                    {staff.staffName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {staff.staffName}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {staff.role}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {staff.hoursWorked}h
                              </div>
                            </TableCell>
                            <TableCell>€{staff.hourlyRate}</TableCell>
                            <TableCell>
                              €{staff.regularPay.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <span className="text-green-600 font-medium">
                                +€{staff.bonuses}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-red-600 font-medium">
                                -€{staff.deductions}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="font-bold text-lg">
                                €{staff.netPay.toLocaleString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedPayrollStaff(staff);
                                      setShowPayrollDetail(true);
                                    }}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Edit Payroll
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Generate Payslip
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Payroll Summary Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Trends</CardTitle>
                  <CardDescription>
                    Monthly payroll costs and staff payment distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-8">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Payroll analytics chart coming soon</p>
                    <p className="text-sm">
                      Track monthly trends and cost analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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

        {/* Sick Leave Detail Modal */}
        {selectedSickLeave && (
          <Dialog
            open={!!selectedSickLeave}
            onOpenChange={() => setSelectedSickLeave(null)}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Sick Leave Details</DialogTitle>
                <DialogDescription>
                  Request information and approval status
                </DialogDescription>
              </DialogHeader>
              <SickLeaveDetailView sickLeave={selectedSickLeave} />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedSickLeave(null)}
                >
                  Close
                </Button>
                {selectedSickLeave.status === "pending" && (
                  <>
                    <Button variant="outline">Deny</Button>
                    <Button>Approve</Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Payroll Detail Modal */}
        {selectedPayrollStaff && (
          <Dialog open={showPayrollDetail} onOpenChange={setShowPayrollDetail}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  Payroll Details - {selectedPayrollStaff.staffName}
                </DialogTitle>
                <DialogDescription>
                  Detailed payroll breakdown for {selectedPayrollMonth}
                </DialogDescription>
              </DialogHeader>
              <PayrollDetailView
                staff={selectedPayrollStaff}
                month={selectedPayrollMonth}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPayrollDetail(false);
                    setSelectedPayrollStaff(null);
                  }}
                >
                  Close
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Payslip
                </Button>
                <Button>Edit Payroll</Button>
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
function StaffDetailView({ staff }: { staff: StaffMember }) {
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
                <Badge
                  variant={
                    getStatusColor(staff.status) as
                      | "secondary"
                      | "outline"
                      | "destructive"
                  }
                >
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

// Sick Leave Form Component
function SickLeaveForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="staff-select">Staff Member</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="carlos">Carlos Silva</SelectItem>
              <SelectItem value="ana">Ana Costa</SelectItem>
              <SelectItem value="miguel">Miguel Santos</SelectItem>
              <SelectItem value="sofia">Sofia Alves</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="leave-type">Leave Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sick">Sick Leave</SelectItem>
              <SelectItem value="medical">Medical Leave</SelectItem>
              <SelectItem value="personal">Personal Leave</SelectItem>
              <SelectItem value="emergency">Emergency Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input id="start-date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input id="end-date" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Leave</Label>
        <Input id="reason" placeholder="Brief description of the reason" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <textarea
          id="notes"
          className="w-full min-h-[100px] p-3 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
          placeholder="Any additional information or medical documentation details..."
        />
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Documentation Required</AlertTitle>
        <AlertDescription>
          Medical certificates may be required for sick leave requests longer
          than 3 days.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Sick Leave Detail View Component
function SickLeaveDetailView({ sickLeave }: { sickLeave: SickLeaveRequest }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={sickLeave.staffAvatar}
                  alt={sickLeave.staffName}
                />
                <AvatarFallback>{sickLeave.staffName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{sickLeave.staffName}</div>
                <div className="text-sm text-muted-foreground">
                  {sickLeave.type}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="text-sm font-medium">
                  {sickLeave.days} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Start Date
                </span>
                <span className="text-sm">{sickLeave.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">End Date</span>
                <span className="text-sm">{sickLeave.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Submitted</span>
                <span className="text-sm">{sickLeave.submittedDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status & Approval</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  getSickLeaveStatusColor(sickLeave.status) as
                    | "secondary"
                    | "outline"
                    | "destructive"
                }
                className="flex items-center gap-1"
              >
                {sickLeave.status === "approved" && (
                  <CheckCircle className="h-3 w-3" />
                )}
                {sickLeave.status === "pending" && (
                  <Clock className="h-3 w-3" />
                )}
                {sickLeave.status === "denied" && (
                  <XCircle className="h-3 w-3" />
                )}
                {sickLeave.status}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              {sickLeave.approvedBy && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Approved By
                  </span>
                  <span className="text-sm">{sickLeave.approvedBy}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Request ID
                </span>
                <span className="text-sm">
                  #{sickLeave.id.toString().padStart(4, "0")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-1">Reason</div>
            <div className="text-sm text-muted-foreground">
              {sickLeave.reason}
            </div>
          </div>
          {sickLeave.notes && (
            <div>
              <div className="text-sm font-medium mb-1">Additional Notes</div>
              <div className="text-sm text-muted-foreground">
                {sickLeave.notes}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Payroll Detail View Component
function PayrollDetailView({
  staff,
  month,
}: {
  staff: PayrollStaff;
  month: string;
}) {
  return (
    <div className="space-y-6">
      {/* Staff Overview */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Staff Information
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={staff.staffAvatar} alt={staff.staffName} />
                <AvatarFallback>{staff.staffName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">{staff.staffName}</div>
                <div className="text-sm text-muted-foreground">
                  {staff.role}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Period</span>
                <span className="text-sm font-medium">
                  {new Date(month + "-01").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Hourly Rate
                </span>
                <span className="text-sm font-medium">€{staff.hourlyRate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hours & Performance
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Hours Worked
                </span>
                <span className="text-sm font-medium">
                  {staff.hoursWorked}h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Bookings
                </span>
                <span className="text-sm font-medium">
                  {staff.totalBookings}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Avg. Rating
                </span>
                <div className="flex items-center gap-1">
                  {renderStars(staff.avgRating)}
                  <span className="text-sm font-medium ml-1">
                    {staff.avgRating}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              €{staff.netPay.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              After taxes and deductions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Regular Pay</span>
                <span className="text-sm font-medium">
                  €{staff.regularPay.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overtime Pay</span>
                <span className="text-sm font-medium">
                  €{staff.overtimePay}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600">Bonuses</span>
                <span className="text-sm font-medium text-green-600">
                  +€{staff.bonuses}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-medium">
                <span className="text-sm">Gross Pay</span>
                <span className="text-sm">
                  €
                  {(
                    staff.regularPay +
                    staff.overtimePay +
                    staff.bonuses
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Deductions & Taxes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Tax Withheld</span>
                <span className="text-sm font-medium text-red-600">
                  -€{staff.taxWithheld}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Social Security</span>
                <span className="text-sm font-medium text-red-600">
                  -€{staff.socialSecurity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Other Deductions</span>
                <span className="text-sm font-medium text-red-600">
                  -€{staff.deductions}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-medium">
                <span className="text-sm">Total Deductions</span>
                <span className="text-sm text-red-600">
                  -€
                  {(
                    staff.taxWithheld +
                    staff.socialSecurity +
                    staff.deductions
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                €
                {(
                  staff.regularPay +
                  staff.overtimePay +
                  staff.bonuses
                ).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Gross Pay</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-red-600">
                €
                {(
                  staff.taxWithheld +
                  staff.socialSecurity +
                  staff.deductions
                ).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Deductions
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">
                €{staff.netPay.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Net Pay</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {(
                  (staff.netPay /
                    (staff.regularPay + staff.overtimePay + staff.bonuses)) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="text-xs text-muted-foreground">
                Take-home Rate
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Payment Method</div>
              <div className="text-sm text-muted-foreground">Bank Transfer</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Payment Date</div>
              <div className="text-sm text-muted-foreground">
                {new Date(month + "-01").getDate() === 1
                  ? new Date(
                      new Date(month + "-01").getFullYear(),
                      new Date(month + "-01").getMonth() + 1,
                      0
                    ).toLocaleDateString()
                  : "End of month"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Currency</div>
              <div className="text-sm text-muted-foreground">EUR (€)</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Status</div>
              <Badge variant="secondary">Processed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
