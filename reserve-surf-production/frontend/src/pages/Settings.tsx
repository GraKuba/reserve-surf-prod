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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Settings as SettingsIcon,
  Building,
  Calendar,
  CreditCard,
  Bell,
  Waves,
  Zap,
  Users,
  Receipt,
  Save,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Palette,
  Shield,
  Key,
  Database,
  Webhook,
  ExternalLink,
} from "lucide-react";

export default function Settings() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock settings data
  const businessProfile = {
    name: "ReserveSurf Ericeira",
    description:
      "Professional surf school offering lessons for all levels in the beautiful waters of Ericeira, Portugal.",
    email: "info@reservesurf.com",
    phone: "+351 261 860 492",
    address: "Praia de Ribeira d'Ilhas, 2655-319 Ericeira, Portugal",
    website: "https://reservesurf.com",
    logo: "/logos/reservesurf-logo.png",
  };

  const operatingHours = [
    { day: "Monday", open: "08:00", close: "18:00", enabled: true },
    { day: "Tuesday", open: "08:00", close: "18:00", enabled: true },
    { day: "Wednesday", open: "08:00", close: "18:00", enabled: true },
    { day: "Thursday", open: "08:00", close: "18:00", enabled: true },
    { day: "Friday", open: "08:00", close: "18:00", enabled: true },
    { day: "Saturday", open: "07:00", close: "19:00", enabled: true },
    { day: "Sunday", open: "07:00", close: "19:00", enabled: true },
  ];

  const activityTypes = [
    {
      name: "Surf Lessons",
      duration: [1, 2, 3],
      pricing: [30, 45, 65],
      capacity: 6,
      enabled: true,
    },
    {
      name: "Kite Lessons",
      duration: [2, 3, 4],
      pricing: [50, 75, 100],
      capacity: 4,
      enabled: true,
    },
    {
      name: "SUP Lessons",
      duration: [1, 2],
      pricing: [25, 40],
      capacity: 8,
      enabled: true,
    },
    {
      name: "Photography Session",
      duration: [1, 2],
      pricing: [50, 80],
      capacity: 2,
      enabled: false,
    },
  ];

  const integrations = [
    {
      name: "Stripe",
      type: "Payment",
      status: "connected",
      description: "Process credit card payments",
    },
    {
      name: "Google Calendar",
      type: "Calendar",
      status: "connected",
      description: "Sync bookings with calendar",
    },
    {
      name: "Mailchimp",
      type: "Email",
      status: "disconnected",
      description: "Email marketing automation",
    },
    {
      name: "QuickBooks",
      type: "Accounting",
      status: "disconnected",
      description: "Automated bookkeeping",
    },
    {
      name: "Zapier",
      type: "Automation",
      status: "connected",
      description: "Connect with 3000+ apps",
    },
  ];

  const teamMembers = [
    {
      name: "Carlos Silva",
      email: "carlos@reservesurf.com",
      role: "Admin",
      status: "active",
    },
    {
      name: "Ana Costa",
      email: "ana@reservesurf.com",
      role: "Manager",
      status: "active",
    },
    {
      name: "Miguel Santos",
      email: "miguel@reservesurf.com",
      role: "Instructor",
      status: "active",
    },
    {
      name: "Sofia Alves",
      email: "sofia@reservesurf.com",
      role: "Assistant",
      status: "inactive",
    },
  ];

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    // Save logic here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
        return "secondary";
      case "disconnected":
      case "inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <DashboardLayout
      pageTitle="Settings"
      breadcrumbs={[{ title: "Settings" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        <Tabs defaultValue="business" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full grid-cols-6 lg:w-fit">
              <TabsTrigger value="business">
                <Building className="h-4 w-4 mr-2" />
                Business
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar className="h-4 w-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="h-4 w-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <Zap className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="team">
                <Users className="h-4 w-4 mr-2" />
                Team
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Business Profile */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Logo Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Business Logo
                  </h3>
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={businessProfile.logo}
                        alt="Business Logo"
                      />
                      <AvatarFallback>
                        <Camera className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Recommended: 400x400px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Basic Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Basic Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input
                          id="business-name"
                          defaultValue={businessProfile.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          defaultValue={businessProfile.website}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">About Your Business</Label>
                      <Textarea
                        id="description"
                        defaultValue={businessProfile.description}
                        rows={3}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={businessProfile.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          defaultValue={businessProfile.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue={businessProfile.address}
                        rows={2}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Operating Hours Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Operating Hours
                  </h3>
                  <div className="space-y-4">
                    {operatingHours.map((schedule) => (
                      <div
                        key={schedule.day}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Switch defaultChecked={schedule.enabled} />
                          <span className="w-20 text-sm font-medium">
                            {schedule.day}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            defaultValue={schedule.open}
                            className="w-32"
                            disabled={!schedule.enabled}
                            onChange={handleInputChange}
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="time"
                            defaultValue={schedule.close}
                            className="w-32"
                            disabled={!schedule.enabled}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Settings */}
          <TabsContent value="bookings" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="activities">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4" />
                    Activity Types & Pricing
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {activityTypes.map((activity, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Switch defaultChecked={activity.enabled} />
                              <h4 className="font-semibold text-lg">
                                {activity.name}
                              </h4>
                            </div>
                            <Badge
                              variant={
                                activity.enabled ? "secondary" : "outline"
                              }
                            >
                              {activity.enabled ? "Active" : "Disabled"}
                            </Badge>
                          </div>

                          <Separator />

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">
                                Duration Options (hours)
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {activity.duration.map((dur, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-sm"
                                  >
                                    {dur}h
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">
                                Pricing (€)
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {activity.pricing.map((price, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-sm"
                                  >
                                    €{price}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">
                                Max Capacity
                              </Label>
                              <div>
                                <Badge variant="outline" className="text-sm">
                                  {activity.capacity} people
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="availability">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Availability Rules
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Booking Timing Rules
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="advance-booking">
                            Advance Booking Limit (days)
                          </Label>
                          <Input
                            id="advance-booking"
                            type="number"
                            defaultValue="30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buffer-time">
                            Buffer Time Between Bookings (minutes)
                          </Label>
                          <Input
                            id="buffer-time"
                            type="number"
                            defaultValue="15"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="min-notice">
                            Minimum Booking Notice (hours)
                          </Label>
                          <Input
                            id="min-notice"
                            type="number"
                            defaultValue="2"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        Cancellation Policy
                      </h4>
                      <div className="space-y-2">
                        <Label>Policy Details</Label>
                        <Textarea
                          placeholder="Enter your cancellation policy..."
                          rows={4}
                          defaultValue="Free cancellation up to 24 hours before the lesson. Cancellations within 24 hours are subject to a 50% fee."
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="equipment">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Equipment Management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Equipment inventory management coming soon
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stripe Integration</CardTitle>
                  <CardDescription>
                    Manage your payment processing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Connected</span>
                    </div>
                    <Badge variant="secondary">Live Mode</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Account ID</span>
                      <span className="font-mono">acct_1234567890</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Processing Fee</span>
                      <span>2.9% + €0.30</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage in Stripe
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Settings</CardTitle>
                  <CardDescription>Configure fees and policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="guest-fee">Guest Fee (%)</Label>
                    <Input id="guest-fee" type="number" defaultValue="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms-pricing">
                      SMS Notification Fee (€)
                    </Label>
                    <Input
                      id="sms-pricing"
                      type="number"
                      defaultValue="0.10"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payout-schedule">Payout Schedule</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Tabs defaultValue="email" className="w-full">
              <TabsList>
                <TabsTrigger value="email">Email Templates</TabsTrigger>
                <TabsTrigger value="sms">SMS Settings</TabsTrigger>
                <TabsTrigger value="staff">Staff Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>
                      Customize automated email messages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-4">
                      <AccordionItem value="confirmation">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Booking Confirmation
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="conf-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="conf-subject"
                                defaultValue="Your surf lesson is confirmed! 🏄‍♂️"
                              />
                            </div>

                            <Separator />

                            <div className="space-y-3">
                              <Label
                                htmlFor="conf-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="conf-template"
                                rows={8}
                                defaultValue="Hi {customer_name},

Great news! Your surf lesson has been confirmed for {date} at {time}.

Lesson Details:
- Activity: {activity}
- Instructor: {instructor}
- Duration: {duration}
- Location: Praia de Ribeira d'Ilhas

See you at the beach!
ReserveSurf Team"
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="reminder">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            Lesson Reminder
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-center py-8">
                            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground">
                              Template editor coming soon
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SMS Settings</CardTitle>
                    <CardDescription>
                      Configure text message notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        SMS Configuration
                      </h4>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Label htmlFor="sms-enabled" className="font-medium">
                            Enable SMS Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Send booking confirmations and reminders via SMS
                          </p>
                        </div>
                        <Switch id="sms-enabled" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Timing Settings
                      </h4>
                      <div className="space-y-3">
                        <Label
                          htmlFor="reminder-timing"
                          className="text-sm font-semibold"
                        >
                          Reminder Timing
                        </Label>
                        <Select defaultValue="24h">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2h">2 hours before</SelectItem>
                            <SelectItem value="24h">24 hours before</SelectItem>
                            <SelectItem value="48h">48 hours before</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="staff" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Notifications</CardTitle>
                    <CardDescription>
                      Configure notifications for staff members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Notification Preferences
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium">
                              New Booking Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Notify staff when new bookings are made
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium">
                              Cancellation Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Notify when bookings are cancelled
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium">
                              Schedule Changes
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Alert staff about schedule modifications
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Apps</CardTitle>
                <CardDescription>
                  Manage your third-party integrations and connected services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {integration.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={getStatusColor(integration.status) as any}
                        >
                          {integration.status}
                        </Badge>
                        <Button
                          variant={
                            integration.status === "connected"
                              ? "outline"
                              : "default"
                          }
                          size="sm"
                        >
                          {integration.status === "connected"
                            ? "Configure"
                            : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys and webhook endpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      type="password"
                      value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                      readOnly
                    />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://your-app.com/webhooks/reservesurf"
                  />
                </div>
                <Button variant="outline">
                  <Webhook className="h-4 w-4 mr-2" />
                  Test Webhook
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team & Permissions */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage user access and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(member.status) as any}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Configure what each role can access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Advanced permission management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Changes Bar */}
        {hasUnsavedChanges && (
          <Card className="fixed bottom-6 left-1/2 transform -translate-x-1/2 shadow-lg border-orange-200 bg-orange-50">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-orange-900">
                  You have unsaved changes
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHasUnsavedChanges(false)}
                >
                  Discard
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
