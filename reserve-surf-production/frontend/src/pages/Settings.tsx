import { useState } from "react";
import { format } from "date-fns";

interface PromoCode {
  id: number;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  minAmount: number;
  maxUses: number | null;
  usedCount: number;
  validFrom: Date;
  validTo: Date;
  enabled: boolean;
}
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Building,
  Calendar as CalendarIcon,
  Bell,
  Waves,
  Zap,
  Users,
  Save,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Camera,
  Shield,
  Database,
  Webhook,
  Plus,
  Trash2,
  CalendarDays,
  Tag,
  Copy,
  Edit,
  Percent,
} from "lucide-react";

export default function Settings() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedDaysOff, setSelectedDaysOff] = useState<Date[]>([
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 11, 26), // Boxing Day
    new Date(2025, 0, 1), // New Year's Day
  ]);

  // Template character limits and validation
  const CHARACTER_LIMIT = 200;
  const [templateCharCounts, setTemplateCharCounts] = useState<
    Record<string, number>
  >({});
  const [templateErrors, setTemplateErrors] = useState<Record<string, string>>(
    {}
  );
  const [operatingPeriods, setOperatingPeriods] = useState([
    {
      id: 1,
      name: "Summer Season",
      startMonth: "April",
      endMonth: "October",
      enabled: true,
    },
    {
      id: 2,
      name: "Winter Break",
      startMonth: "November",
      endMonth: "March",
      enabled: false,
    },
  ]);
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: 1,
      code: "SUMMER2024",
      description: "Summer season discount",
      type: "percentage",
      value: 20,
      minAmount: 50,
      maxUses: 100,
      usedCount: 23,
      validFrom: new Date(2024, 5, 1),
      validTo: new Date(2024, 8, 30),
      enabled: true,
    },
    {
      id: 2,
      code: "FIRSTTIME",
      description: "First-time customer discount",
      type: "fixed",
      value: 15,
      minAmount: 0,
      maxUses: null,
      usedCount: 45,
      validFrom: new Date(2024, 0, 1),
      validTo: new Date(2024, 11, 31),
      enabled: true,
    },
    {
      id: 3,
      code: "WINTER50",
      description: "Winter promotion",
      type: "percentage",
      value: 50,
      minAmount: 100,
      maxUses: 50,
      usedCount: 50,
      validFrom: new Date(2024, 10, 1),
      validTo: new Date(2024, 11, 31),
      enabled: false,
    },
  ]);

  // Role management state
  const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [customRoles, setCustomRoles] = useState<any[]>([]);

  // Default roles with predefined permissions
  const defaultRoles = [
    {
      id: "admin",
      name: "Admin",
      description: "Full access to all features and settings",
      isDefault: true,
      permissions: [
        "bookings.view",
        "bookings.create",
        "bookings.edit",
        "bookings.delete",
        "calendar.view",
        "calendar.edit",
        "customers.view",
        "customers.create",
        "customers.edit",
        "customers.delete",
        "staff.view",
        "staff.create",
        "staff.edit",
        "staff.delete",
        "reports.view",
        "reports.export",
        "settings.view",
        "settings.edit",
        "equipment.view",
        "equipment.edit",
        "pricing.view",
        "pricing.edit",
        "notifications.view",
        "notifications.edit",
      ],
    },
    {
      id: "manager",
      name: "Manager",
      description: "Manage bookings, customers, and staff operations",
      isDefault: true,
      permissions: [
        "bookings.view",
        "bookings.create",
        "bookings.edit",
        "calendar.view",
        "calendar.edit",
        "customers.view",
        "customers.create",
        "customers.edit",
        "staff.view",
        "reports.view",
        "equipment.view",
        "equipment.edit",
        "pricing.view",
        "notifications.view",
      ],
    },
    {
      id: "instructor",
      name: "Instructor",
      description: "Access to bookings and customer information for teaching",
      isDefault: true,
      permissions: [
        "bookings.view",
        "bookings.edit",
        "calendar.view",
        "customers.view",
        "equipment.view",
        "notifications.view",
      ],
    },
    {
      id: "assistant",
      name: "Assistant",
      description: "Basic access to view bookings and customer information",
      isDefault: true,
      permissions: [
        "bookings.view",
        "calendar.view",
        "customers.view",
        "equipment.view",
      ],
    },
  ];

  // Permission categories for the permission matrix
  const permissionCategories = [
    {
      name: "Bookings",
      icon: CalendarIcon,
      permissions: [
        {
          key: "bookings.view",
          name: "View Bookings",
          description: "View all booking information",
        },
        {
          key: "bookings.create",
          name: "Create Bookings",
          description: "Create new bookings for customers",
        },
        {
          key: "bookings.edit",
          name: "Edit Bookings",
          description: "Modify existing booking details",
        },
        {
          key: "bookings.delete",
          name: "Delete Bookings",
          description: "Cancel and delete bookings",
        },
      ],
    },
    {
      name: "Calendar",
      icon: CalendarIcon,
      permissions: [
        {
          key: "calendar.view",
          name: "View Calendar",
          description: "Access calendar and scheduling views",
        },
        {
          key: "calendar.edit",
          name: "Edit Calendar",
          description: "Modify calendar events and availability",
        },
      ],
    },
    {
      name: "Customers",
      icon: Users,
      permissions: [
        {
          key: "customers.view",
          name: "View Customers",
          description: "Access customer profiles and information",
        },
        {
          key: "customers.create",
          name: "Create Customers",
          description: "Add new customer profiles",
        },
        {
          key: "customers.edit",
          name: "Edit Customers",
          description: "Modify customer information",
        },
        {
          key: "customers.delete",
          name: "Delete Customers",
          description: "Remove customer profiles",
        },
      ],
    },
    {
      name: "Staff Management",
      icon: Users,
      permissions: [
        {
          key: "staff.view",
          name: "View Staff",
          description: "View team member information",
        },
        {
          key: "staff.create",
          name: "Create Staff",
          description: "Add new team members",
        },
        {
          key: "staff.edit",
          name: "Edit Staff",
          description: "Modify staff information and roles",
        },
        {
          key: "staff.delete",
          name: "Delete Staff",
          description: "Remove team members",
        },
      ],
    },
    {
      name: "Reports",
      icon: Database,
      permissions: [
        {
          key: "reports.view",
          name: "View Reports",
          description: "Access business reports and analytics",
        },
        {
          key: "reports.export",
          name: "Export Reports",
          description: "Download and export report data",
        },
      ],
    },
    {
      name: "Settings",
      icon: Shield,
      permissions: [
        {
          key: "settings.view",
          name: "View Settings",
          description: "Access system settings",
        },
        {
          key: "settings.edit",
          name: "Edit Settings",
          description: "Modify system configuration",
        },
      ],
    },
    {
      name: "Equipment",
      icon: Database,
      permissions: [
        {
          key: "equipment.view",
          name: "View Equipment",
          description: "View equipment inventory",
        },
        {
          key: "equipment.edit",
          name: "Edit Equipment",
          description: "Manage equipment inventory",
        },
      ],
    },
    {
      name: "Pricing",
      icon: Tag,
      permissions: [
        {
          key: "pricing.view",
          name: "View Pricing",
          description: "View pricing information",
        },
        {
          key: "pricing.edit",
          name: "Edit Pricing",
          description: "Modify pricing and promo codes",
        },
      ],
    },
    {
      name: "Notifications",
      icon: Bell,
      permissions: [
        {
          key: "notifications.view",
          name: "View Notifications",
          description: "Access notification settings",
        },
        {
          key: "notifications.edit",
          name: "Edit Notifications",
          description: "Configure notification templates",
        },
      ],
    },
  ];

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

  const [activityTypes, setActivityTypes] = useState([
    {
      id: 1,
      name: "Surf Lessons",
      duration: [1, 2, 3],
      pricing: [30, 45, 65],
      capacity: 6,
      enabled: true,
    },
    {
      id: 2,
      name: "Kite Lessons",
      duration: [2, 3, 4],
      pricing: [50, 75, 100],
      capacity: 4,
      enabled: true,
    },
    {
      id: 3,
      name: "SUP Lessons",
      duration: [1, 2],
      pricing: [25, 40],
      capacity: 8,
      enabled: true,
    },
    {
      id: 4,
      name: "Photography Session",
      duration: [1, 2],
      pricing: [50, 80],
      capacity: 2,
      enabled: false,
    },
  ]);

  const [cancellationPolicy, setCancellationPolicy] = useState(
    "Free cancellation up to 24 hours before the lesson. Cancellations within 24 hours are subject to a 50% fee."
  );

  const googleCalendarIntegration = {
    name: "Google Calendar",
    type: "Calendar",
    status: "connected",
    description: "Sync bookings with calendar",
  };

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

  // Template validation functions
  const validateTemplateLength = (templateId: string, value: string) => {
    const charCount = value.length;
    setTemplateCharCounts((prev) => ({ ...prev, [templateId]: charCount }));

    if (charCount > CHARACTER_LIMIT) {
      setTemplateErrors((prev) => ({
        ...prev,
        [templateId]: `Message exceeds ${CHARACTER_LIMIT} character limit`,
      }));
      return false;
    } else {
      setTemplateErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[templateId];
        return newErrors;
      });
      return true;
    }
  };

  const handleTemplateChange = (templateId: string, value: string) => {
    if (value.length <= CHARACTER_LIMIT) {
      validateTemplateLength(templateId, value);
      setHasUnsavedChanges(true);
    }
    // If over limit, don't update the value but show error
    else {
      setTemplateErrors((prev) => ({
        ...prev,
        [templateId]: `Message exceeds ${CHARACTER_LIMIT} character limit`,
      }));
    }
  };

  const getCharacterCountColor = (count: number) => {
    if (count > CHARACTER_LIMIT) return "text-red-600";
    if (count > CHARACTER_LIMIT * 0.9) return "text-yellow-600";
    return "text-muted-foreground";
  };

  const addDayOff = (date: Date | undefined) => {
    if (
      date &&
      !selectedDaysOff.some((d) => d.toDateString() === date.toDateString())
    ) {
      setSelectedDaysOff([...selectedDaysOff, date]);
      setHasUnsavedChanges(true);
    }
  };

  const removeDayOff = (dateToRemove: Date) => {
    setSelectedDaysOff(
      selectedDaysOff.filter(
        (date) => date.toDateString() !== dateToRemove.toDateString()
      )
    );
    setHasUnsavedChanges(true);
  };

  const addOperatingPeriod = () => {
    const newPeriod = {
      id: Math.max(...operatingPeriods.map((p) => p.id)) + 1,
      name: "New Period",
      startMonth: "January",
      endMonth: "December",
      enabled: true,
    };
    setOperatingPeriods([...operatingPeriods, newPeriod]);
    setHasUnsavedChanges(true);
  };

  const updateOperatingPeriod = (
    id: number,
    updates: Partial<(typeof operatingPeriods)[0]>
  ) => {
    setOperatingPeriods(
      operatingPeriods.map((period) =>
        period.id === id ? { ...period, ...updates } : period
      )
    );
    setHasUnsavedChanges(true);
  };

  const removeOperatingPeriod = (id: number) => {
    setOperatingPeriods(operatingPeriods.filter((period) => period.id !== id));
    setHasUnsavedChanges(true);
  };

  const handleCreatePromo = () => {
    setEditingPromo(null);
    setIsPromoDialogOpen(true);
  };

  const handleEditPromo = (promo: PromoCode) => {
    setEditingPromo(promo);
    setIsPromoDialogOpen(true);
  };

  const handleSavePromo = (promoData: Omit<PromoCode, "id" | "usedCount">) => {
    if (editingPromo) {
      // Update existing promo
      setPromoCodes(
        promoCodes.map((promo) =>
          promo.id === editingPromo.id ? { ...promo, ...promoData } : promo
        )
      );
    } else {
      // Create new promo
      const newPromo = {
        id: Math.max(...promoCodes.map((p) => p.id)) + 1,
        ...promoData,
        usedCount: 0,
      };
      setPromoCodes([...promoCodes, newPromo]);
    }
    setIsPromoDialogOpen(false);
    setEditingPromo(null);
    setHasUnsavedChanges(true);
  };

  const handleDeletePromo = (id: number) => {
    setPromoCodes(promoCodes.filter((promo) => promo.id !== id));
    setHasUnsavedChanges(true);
  };

  const togglePromoStatus = (id: number) => {
    setPromoCodes(
      promoCodes.map((promo) =>
        promo.id === id ? { ...promo, enabled: !promo.enabled } : promo
      )
    );
    setHasUnsavedChanges(true);
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  // Role management handlers
  const handleCreateCustomRole = (roleData: {
    name: string;
    description: string;
  }) => {
    const newRole = {
      id: `custom-${Date.now()}`,
      name: roleData.name,
      description: roleData.description,
      isDefault: false,
      permissions: [], // Start with no permissions
    };
    setCustomRoles([...customRoles, newRole]);
    setIsCreateRoleDialogOpen(false);
    setHasUnsavedChanges(true);
  };

  const handleDeleteCustomRole = (roleId: string) => {
    setCustomRoles(customRoles.filter((role) => role.id !== roleId));
    setHasUnsavedChanges(true);
  };

  const handlePermissionToggle = (
    roleId: string,
    permissionKey: string,
    checked: boolean
  ) => {
    setCustomRoles(
      customRoles.map((role) => {
        if (role.id === roleId) {
          const newPermissions = checked
            ? [...role.permissions, permissionKey]
            : role.permissions.filter((p: string) => p !== permissionKey);
          return { ...role, permissions: newPermissions };
        }
        return role;
      })
    );
    setHasUnsavedChanges(true);
  };

  const handleSaveRole = () => {
    setSelectedRole(null);
    // The permissions are already updated via handlePermissionToggle
  };

  const handleMemberRoleChange = () => {
    // This would update the team member's role
    // For now, just trigger unsaved changes
    setHasUnsavedChanges(true);
  };

  // Activity type management functions
  const addActivityType = () => {
    const newActivity = {
      id: Math.max(...activityTypes.map((a) => a.id)) + 1,
      name: "New Activity",
      duration: [1],
      pricing: [30],
      capacity: 4,
      enabled: true,
    };
    setActivityTypes([...activityTypes, newActivity]);
    setHasUnsavedChanges(true);
  };

  const updateActivityType = (
    id: number,
    updates: Partial<(typeof activityTypes)[0]>
  ) => {
    setActivityTypes(
      activityTypes.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
    setHasUnsavedChanges(true);
  };

  const removeActivityType = (id: number) => {
    setActivityTypes(activityTypes.filter((activity) => activity.id !== id));
    setHasUnsavedChanges(true);
  };

  const addDurationOption = (activityId: number) => {
    const activity = activityTypes.find((a) => a.id === activityId);
    if (activity) {
      const newDuration = Math.max(...activity.duration) + 1;
      const newPricing = activity.pricing[activity.pricing.length - 1] + 10;
      updateActivityType(activityId, {
        duration: [...activity.duration, newDuration],
        pricing: [...activity.pricing, newPricing],
      });
    }
  };

  const removeDurationOption = (activityId: number, index: number) => {
    const activity = activityTypes.find((a) => a.id === activityId);
    if (activity && activity.duration.length > 1) {
      const newDuration = activity.duration.filter((_, i) => i !== index);
      const newPricing = activity.pricing.filter((_, i) => i !== index);
      updateActivityType(activityId, {
        duration: newDuration,
        pricing: newPricing,
      });
    }
  };

  const updateDurationOption = (
    activityId: number,
    index: number,
    value: number,
    type: "duration" | "pricing"
  ) => {
    const activity = activityTypes.find((a) => a.id === activityId);
    if (activity) {
      const newArray = [
        ...(type === "duration" ? activity.duration : activity.pricing),
      ];
      newArray[index] = value;
      updateActivityType(activityId, {
        [type]: newArray,
      });
    }
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
                <CalendarIcon className="h-4 w-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="promo">
                <Tag className="h-4 w-4 mr-2" />
                Promo Code
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
                Permission
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

                <Separator />

                {/* Operating Periods Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      Operating Periods
                    </h3>
                    <Button onClick={addOperatingPeriod} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Period
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Define seasonal operating periods when your business is open
                    or closed (e.g., closed during winter months)
                  </p>
                  <div className="space-y-4">
                    {operatingPeriods.map((period) => (
                      <div
                        key={period.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <Switch
                            checked={period.enabled}
                            onCheckedChange={(checked) =>
                              updateOperatingPeriod(period.id, {
                                enabled: checked,
                              })
                            }
                          />
                          <div className="flex-1">
                            <Input
                              value={period.name}
                              onChange={(e) =>
                                updateOperatingPeriod(period.id, {
                                  name: e.target.value,
                                })
                              }
                              className="font-medium mb-2"
                              placeholder="Period name"
                            />
                            <div className="flex items-center gap-2">
                              <Select
                                value={period.startMonth}
                                onValueChange={(value) =>
                                  updateOperatingPeriod(period.id, {
                                    startMonth: value,
                                  })
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                  ].map((month) => (
                                    <SelectItem key={month} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <span className="text-muted-foreground">to</span>
                              <Select
                                value={period.endMonth}
                                onValueChange={(value) =>
                                  updateOperatingPeriod(period.id, {
                                    endMonth: value,
                                  })
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                  ].map((month) => (
                                    <SelectItem key={month} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOperatingPeriod(period.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Individual Days Off Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Individual Days Off
                    </h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Day Off
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={undefined}
                          onSelect={addDayOff}
                          initialFocus
                          disabled={(date) =>
                            selectedDaysOff.some(
                              (d) => d.toDateString() === date.toDateString()
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mark specific dates when your business will be closed
                    (holidays, maintenance days, etc.)
                  </p>
                  <div className="space-y-2">
                    {selectedDaysOff.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        No days off scheduled
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {selectedDaysOff
                          .sort((a, b) => a.getTime() - b.getTime())
                          .map((date, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                            >
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {format(date, "PPP")}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDayOff(date)}
                                className="text-destructive hover:text-destructive h-6 w-6 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    )}
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Activity Types
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your activity types, pricing, and capacity
                          settings
                        </p>
                      </div>
                      <Button onClick={addActivityType} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Activity
                      </Button>
                    </div>

                    {activityTypes.map((activity) => (
                      <Card key={activity.id}>
                        <CardContent className="pt-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={activity.enabled}
                                onCheckedChange={(checked) =>
                                  updateActivityType(activity.id, {
                                    enabled: checked,
                                  })
                                }
                              />
                              <Input
                                value={activity.name}
                                onChange={(e) =>
                                  updateActivityType(activity.id, {
                                    name: e.target.value,
                                  })
                                }
                                className="font-semibold text-lg border-none p-0 h-auto focus-visible:ring-0"
                                placeholder="Activity name"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  activity.enabled ? "secondary" : "outline"
                                }
                              >
                                {activity.enabled ? "Active" : "Disabled"}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeActivityType(activity.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-semibold">
                                  Duration & Pricing Options
                                </Label>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addDurationOption(activity.id)}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Option
                                </Button>
                              </div>
                              <div className="space-y-3">
                                {activity.duration.map((dur, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 border rounded-lg"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Label className="text-sm font-medium">
                                        Duration:
                                      </Label>
                                      <Input
                                        type="number"
                                        value={dur}
                                        onChange={(e) =>
                                          updateDurationOption(
                                            activity.id,
                                            index,
                                            Number(e.target.value),
                                            "duration"
                                          )
                                        }
                                        className="w-20"
                                        min="0.5"
                                        step="0.5"
                                      />
                                      <span className="text-sm text-muted-foreground">
                                        hours
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Label className="text-sm font-medium">
                                        Price:
                                      </Label>
                                      <Input
                                        type="number"
                                        value={activity.pricing[index]}
                                        onChange={(e) =>
                                          updateDurationOption(
                                            activity.id,
                                            index,
                                            Number(e.target.value),
                                            "pricing"
                                          )
                                        }
                                        className="w-24"
                                        min="0"
                                        step="0.01"
                                      />
                                      <span className="text-sm text-muted-foreground">
                                        €
                                      </span>
                                    </div>
                                    {activity.duration.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          removeDurationOption(
                                            activity.id,
                                            index
                                          )
                                        }
                                        className="text-destructive hover:text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold">
                                Maximum Capacity
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={activity.capacity}
                                  onChange={(e) =>
                                    updateActivityType(activity.id, {
                                      capacity: Number(e.target.value),
                                    })
                                  }
                                  className="w-24"
                                  min="1"
                                />
                                <span className="text-sm text-muted-foreground">
                                  people per session
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancellation">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Cancellation Policy
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Policy Details</Label>
                      <Textarea
                        placeholder="Enter your cancellation policy..."
                        rows={4}
                        value={cancellationPolicy}
                        onChange={(e) => {
                          setCancellationPolicy(e.target.value);
                          setHasUnsavedChanges(true);
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        This policy will be displayed to customers during
                        booking and in confirmation emails.
                      </p>
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

          {/* Promo Codes */}
          <TabsContent value="promo" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Promo Code Management</h2>
                <p className="text-muted-foreground">
                  Create and manage discount codes for your customers
                </p>
              </div>
              <Button onClick={handleCreatePromo}>
                <Plus className="h-4 w-4 mr-2" />
                Create Promo Code
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Promo Codes</CardTitle>
                <CardDescription>
                  Manage your promotional discount codes and track their usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Valid Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promoCodes.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="font-mono text-sm"
                            >
                              {promo.code}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyPromoCode(promo.code)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <div className="font-medium">
                              {promo.description}
                            </div>
                            {promo.minAmount > 0 && (
                              <div className="text-sm text-muted-foreground">
                                Min. €{promo.minAmount}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {promo.type === "percentage" ? (
                              <div className="flex items-center gap-1">
                                <Percent className="h-3 w-3" />
                                Percentage
                              </div>
                            ) : (
                              "Fixed Amount"
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {promo.type === "percentage"
                              ? `${promo.value}%`
                              : `€${promo.value}`}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {promo.usedCount}
                              {promo.maxUses ? ` / ${promo.maxUses}` : ""}
                            </div>
                            {promo.maxUses && (
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      (promo.usedCount / promo.maxUses) * 100,
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{format(promo.validFrom, "MMM dd, yyyy")}</div>
                            <div className="text-muted-foreground">
                              to {format(promo.validTo, "MMM dd, yyyy")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={promo.enabled}
                              onCheckedChange={() =>
                                togglePromoStatus(promo.id)
                              }
                            />
                            <Badge
                              variant={promo.enabled ? "secondary" : "outline"}
                            >
                              {promo.enabled ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPromo(promo)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePromo(promo.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Promo Code Statistics</CardTitle>
                <CardDescription>
                  Overview of your promotional campaigns performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total Codes</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {promoCodes.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {promoCodes.filter((p) => p.enabled).length} active
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total Uses</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {promoCodes.reduce(
                        (sum, promo) => sum + promo.usedCount,
                        0
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      All time usage
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Avg. Discount</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {Math.round(
                        promoCodes
                          .filter((p) => p.type === "percentage")
                          .reduce((sum, promo) => sum + promo.value, 0) /
                          promoCodes.filter((p) => p.type === "percentage")
                            .length || 0
                      )}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Percentage codes
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Success Rate</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {promoCodes.filter((p) => p.usedCount > 0).length > 0
                        ? Math.round(
                            (promoCodes.filter((p) => p.usedCount > 0).length /
                              promoCodes.length) *
                              100
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Codes with usage
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code Dialog */}
            <Dialog
              open={isPromoDialogOpen}
              onOpenChange={setIsPromoDialogOpen}
            >
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingPromo ? "Edit Promo Code" : "Create New Promo Code"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingPromo
                      ? "Update the promo code details below."
                      : "Create a new promotional discount code for your customers."}
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const promoData: Omit<PromoCode, "id" | "usedCount"> = {
                      code: formData.get("code") as string,
                      description: formData.get("description") as string,
                      type: formData.get("type") as "percentage" | "fixed",
                      value: Number(formData.get("value")),
                      minAmount: Number(formData.get("minAmount")) || 0,
                      maxUses: formData.get("maxUses")
                        ? Number(formData.get("maxUses"))
                        : null,
                      validFrom: new Date(formData.get("validFrom") as string),
                      validTo: new Date(formData.get("validTo") as string),
                      enabled: formData.get("enabled") === "on",
                    };
                    handleSavePromo(promoData);
                  }}
                >
                  <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">Promo Code *</Label>
                        <Input
                          id="code"
                          name="code"
                          placeholder="SUMMER2024"
                          defaultValue={editingPromo?.code || ""}
                          className="font-mono"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Discount Type *</Label>
                        <Select
                          name="type"
                          defaultValue={editingPromo?.type || "percentage"}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Percentage
                            </SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        placeholder="Summer season discount"
                        defaultValue={editingPromo?.description || ""}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="value">Discount Value *</Label>
                        <Input
                          id="value"
                          name="value"
                          type="number"
                          placeholder="20"
                          defaultValue={editingPromo?.value || ""}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minAmount">Minimum Amount (€)</Label>
                        <Input
                          id="minAmount"
                          name="minAmount"
                          type="number"
                          placeholder="0"
                          defaultValue={editingPromo?.minAmount || ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxUses">Maximum Uses</Label>
                      <Input
                        id="maxUses"
                        name="maxUses"
                        type="number"
                        placeholder="Leave empty for unlimited"
                        defaultValue={editingPromo?.maxUses || ""}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="validFrom">Valid From *</Label>
                        <Input
                          id="validFrom"
                          name="validFrom"
                          type="date"
                          defaultValue={
                            editingPromo?.validFrom
                              ?.toISOString()
                              .split("T")[0] || format(new Date(), "yyyy-MM-dd")
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="validTo">Valid To *</Label>
                        <Input
                          id="validTo"
                          name="validTo"
                          type="date"
                          defaultValue={
                            editingPromo?.validTo
                              ?.toISOString()
                              .split("T")[0] || ""
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enabled"
                        name="enabled"
                        defaultChecked={editingPromo?.enabled ?? true}
                      />
                      <Label htmlFor="enabled">Enable this promo code</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                      {editingPromo ? "Update" : "Create"} Promo Code
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                      Customize automated email messages for different customer
                      scenarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-4">
                      <AccordionItem value="reservation-confirmation">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Reservation Confirmation
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="confirmation-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="confirmation-subject"
                                defaultValue="Your surf lesson is confirmed! 🏄‍♂️"
                                onChange={handleInputChange}
                              />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <Label
                                htmlFor="confirmation-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="confirmation-template"
                                rows={10}
                                onChange={(e) =>
                                  handleTemplateChange(
                                    "confirmation-template",
                                    e.target.value
                                  )
                                }
                                defaultValue="Hi {customer_name},

Your reservation has been confirmed!

Booking Details:
- Booking Reference: {booking_id}
- Activity: {activity}
- Date: {date}
- Time: {time}
- Duration: {duration}
- Instructor: {instructor}
- Number of Participants: {participants}
- Total Price: €{total_price}

Location:
Praia de Ribeira d'Ilhas
2655-319 Ericeira, Portugal

What to bring:
- Swimwear
- Towel
- Sunscreen
- Water bottle

All equipment (surfboard and wetsuit) will be provided.

Important Information:
- Please arrive 15 minutes before your scheduled time
- {cancellation_policy}

Questions? Reply to this email or call us at +351 261 860 492

See you on the water!
ReserveSurf Team"
                              />
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-xs ${getCharacterCountColor(
                                    templateCharCounts["confirmation-template"] || 0
                                  )}`}
                                >
                                  Character count:{" "}
                                  {templateCharCounts["confirmation-template"] || 0}/
                                  {CHARACTER_LIMIT}
                                </p>
                                {templateErrors["confirmation-template"] && (
                                  <p className="text-xs text-red-600">
                                    {templateErrors["confirmation-template"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="first-time-signup">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            First-Time Customer Welcome
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="first-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="first-subject"
                                defaultValue="Welcome to ReserveSurf! Your first lesson is confirmed 🏄‍♂️"
                                onChange={handleInputChange}
                              />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <Label
                                htmlFor="first-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="first-template"
                                rows={10}
                                onChange={(e) =>
                                  handleTemplateChange(
                                    "first-template",
                                    e.target.value
                                  )
                                }
                                defaultValue="Hi {customer_name},

Welcome to ReserveSurf! We're thrilled you've chosen us for your first surf lesson.

Your lesson is confirmed for {date} at {time}.

What to expect on your first visit:
- Arrive 15 minutes early for equipment fitting
- Bring swimwear, towel, and sunscreen
- We provide all surf equipment and wetsuits
- Our experienced instructors will guide you through everything

Lesson Details:
- Activity: {activity}
- Instructor: {instructor}
- Duration: {duration}
- Location: Praia de Ribeira d'Ilhas
- Meeting Point: ReserveSurf Beach Hut

Can't wait to see you catch your first wave!
ReserveSurf Team

Need help? Reply to this email or call us at +351 261 860 492"
                              />
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-xs ${getCharacterCountColor(
                                    templateCharCounts["first-template"] || 0
                                  )}`}
                                >
                                  Character count:{" "}
                                  {templateCharCounts["first-template"] || 0}/
                                  {CHARACTER_LIMIT}
                                </p>
                                {templateErrors["first-template"] && (
                                  <p className="text-xs text-red-600">
                                    {templateErrors["first-template"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="returning-customer">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Returning Customer Confirmation
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="return-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="return-subject"
                                defaultValue="Welcome back! Your lesson is confirmed 🌊"
                                onChange={handleInputChange}
                              />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <Label
                                htmlFor="return-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="return-template"
                                rows={8}
                                onChange={(e) =>
                                  handleTemplateChange(
                                    "return-template",
                                    e.target.value
                                  )
                                }
                                defaultValue="Hi {customer_name},

Great to have you back! Your lesson is confirmed for {date} at {time}.

Lesson Details:
- Activity: {activity}
- Instructor: {instructor}
- Duration: {duration}
- Location: Praia de Ribeira d'Ilhas

Since you're a returning customer, you know the drill - just bring your enthusiasm and we'll take care of the rest!

See you at the beach!
ReserveSurf Team"
                              />
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-xs ${getCharacterCountColor(
                                    templateCharCounts["return-template"] || 0
                                  )}`}
                                >
                                  Character count:{" "}
                                  {templateCharCounts["return-template"] || 0}/
                                  {CHARACTER_LIMIT}
                                </p>
                                {templateErrors["return-template"] && (
                                  <p className="text-xs text-red-600">
                                    {templateErrors["return-template"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="lesson-reminder">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            Lesson Reminder (24h)
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="reminder-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="reminder-subject"
                                defaultValue="Your surf lesson is tomorrow! 🏄‍♂️"
                                onChange={handleInputChange}
                              />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <Label
                                htmlFor="reminder-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="reminder-template"
                                rows={8}
                                onChange={(e) =>
                                  handleTemplateChange(
                                    "reminder-template",
                                    e.target.value
                                  )
                                }
                                defaultValue="Hi {customer_name},

Just a friendly reminder that your surf lesson is tomorrow!

Lesson Details:
- Date: {date}
- Time: {time}
- Activity: {activity}
- Instructor: {instructor}
- Location: Praia de Ribeira d'Ilhas

Weather forecast: {weather_conditions}

Don't forget to bring:
- Swimwear
- Towel
- Sunscreen
- Positive attitude!

See you tomorrow!
ReserveSurf Team"
                              />
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-xs ${getCharacterCountColor(
                                    templateCharCounts["reminder-template"] || 0
                                  )}`}
                                >
                                  Character count:{" "}
                                  {templateCharCounts["reminder-template"] || 0}
                                  /{CHARACTER_LIMIT}
                                </p>
                                {templateErrors["reminder-template"] && (
                                  <p className="text-xs text-red-600">
                                    {templateErrors["reminder-template"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="cancellation">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4" />
                            Cancellation Confirmation
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="cancel-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="cancel-subject"
                                defaultValue="Lesson cancelled - we hope to see you soon!"
                                onChange={handleInputChange}
                              />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <Label
                                htmlFor="cancel-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="cancel-template"
                                rows={6}
                                onChange={(e) =>
                                  handleTemplateChange(
                                    "cancel-template",
                                    e.target.value
                                  )
                                }
                                defaultValue="Hi {customer_name},

Your lesson for {date} at {time} has been successfully cancelled.

{refund_details}

We're sorry we won't see you this time, but we hope to welcome you back to ReserveSurf soon!

Best regards,
ReserveSurf Team"
                              />
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-xs ${getCharacterCountColor(
                                    templateCharCounts["cancel-template"] || 0
                                  )}`}
                                >
                                  Character count:{" "}
                                  {templateCharCounts["cancel-template"] || 0}/
                                  {CHARACTER_LIMIT}
                                </p>
                                {templateErrors["cancel-template"] && (
                                  <p className="text-xs text-red-600">
                                    {templateErrors["cancel-template"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="follow-up">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Post-Lesson Follow-up
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                              <Label
                                htmlFor="followup-subject"
                                className="text-sm font-semibold"
                              >
                                Subject Line
                              </Label>
                              <Input
                                id="followup-subject"
                                defaultValue="How was your surf lesson? 🌊"
                                onChange={handleInputChange}
                              />
                            </div>
                            <Separator />
                            <div className="space-y-3">
                              <Label
                                htmlFor="followup-template"
                                className="text-sm font-semibold"
                              >
                                Email Template
                              </Label>
                              <Textarea
                                id="followup-template"
                                rows={8}
                                onChange={(e) =>
                                  handleTemplateChange(
                                    "followup-template",
                                    e.target.value
                                  )
                                }
                                defaultValue="Hi {customer_name},

We hope you had an amazing time with your {activity} lesson with {instructor}!

We'd love to hear about your experience and any feedback you might have. Your input helps us improve our services.

Ready for your next adventure? Check out our upcoming lessons and special offers:
- Advanced surf techniques
- Sunset photography sessions
- Group lessons with friends

Book your next lesson: {booking_link}

Thanks for choosing ReserveSurf!
The ReserveSurf Team"
                              />
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-xs ${getCharacterCountColor(
                                    templateCharCounts["followup-template"] || 0
                                  )}`}
                                >
                                  Character count:{" "}
                                  {templateCharCounts["followup-template"] || 0}
                                  /{CHARACTER_LIMIT}
                                </p>
                                {templateErrors["followup-template"] && (
                                  <p className="text-xs text-red-600">
                                    {templateErrors["followup-template"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sms" className="space-y-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>SMS Configuration</CardTitle>
                      <CardDescription>
                        Configure text message notifications and templates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          <Phone className="h-5 w-5" />
                          SMS Settings
                        </h4>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label
                              htmlFor="sms-enabled"
                              className="font-medium"
                            >
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
                              <SelectItem value="24h">
                                24 hours before
                              </SelectItem>
                              <SelectItem value="48h">
                                48 hours before
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SMS Templates</CardTitle>
                      <CardDescription>
                        Customize SMS messages for different customer scenarios
                        (160 character limit recommended)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion
                        type="single"
                        collapsible
                        className="space-y-4"
                      >
                        <AccordionItem value="sms-confirmation">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Reservation Confirmation SMS
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="sms-confirmation-template"
                                  className="text-sm font-semibold"
                                >
                                  SMS Template
                                </Label>
                                <Textarea
                                  id="sms-confirmation-template"
                                  rows={3}
                                  onChange={(e) =>
                                    handleTemplateChange(
                                      "sms-confirmation-template",
                                      e.target.value
                                    )
                                  }
                                  defaultValue="Confirmed! Your {activity} is booked for {date} at {time}. Ref: {booking_id}. Location: Praia de Ribeira d'Ilhas. Arrive 15min early. 🏄‍♂️"
                                />
                                <div className="flex justify-between items-center">
                                  <p
                                    className={`text-xs ${getCharacterCountColor(
                                      templateCharCounts[
                                        "sms-confirmation-template"
                                      ] || 0
                                    )}`}
                                  >
                                    Character count:{" "}
                                    {templateCharCounts["sms-confirmation-template"] ||
                                      0}
                                    /{CHARACTER_LIMIT}
                                  </p>
                                  {templateErrors["sms-confirmation-template"] && (
                                    <p className="text-xs text-red-600">
                                      {templateErrors["sms-confirmation-template"]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sms-first-time">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              First-Time Customer SMS
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="sms-first-template"
                                  className="text-sm font-semibold"
                                >
                                  SMS Template
                                </Label>
                                <Textarea
                                  id="sms-first-template"
                                  rows={3}
                                  onChange={(e) =>
                                    handleTemplateChange(
                                      "sms-first-template",
                                      e.target.value
                                    )
                                  }
                                  defaultValue="Welcome to ReserveSurf! Your first lesson is confirmed for {date} at {time}. Arrive 15min early. Bring swimwear & towel. We provide equipment! 🏄‍♂️"
                                />
                                <div className="flex justify-between items-center">
                                  <p
                                    className={`text-xs ${getCharacterCountColor(
                                      templateCharCounts[
                                        "sms-first-template"
                                      ] || 0
                                    )}`}
                                  >
                                    Character count:{" "}
                                    {templateCharCounts["sms-first-template"] ||
                                      0}
                                    /{CHARACTER_LIMIT}
                                  </p>
                                  {templateErrors["sms-first-template"] && (
                                    <p className="text-xs text-red-600">
                                      {templateErrors["sms-first-template"]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sms-returning">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Returning Customer SMS
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="sms-return-template"
                                  className="text-sm font-semibold"
                                >
                                  SMS Template
                                </Label>
                                <Textarea
                                  id="sms-return-template"
                                  rows={3}
                                  onChange={(e) =>
                                    handleTemplateChange(
                                      "sms-return-template",
                                      e.target.value
                                    )
                                  }
                                  defaultValue="Welcome back to ReserveSurf! Your {activity} lesson is confirmed for {date} at {time} with {instructor}. See you at the beach! 🌊"
                                />
                                <div className="flex justify-between items-center">
                                  <p
                                    className={`text-xs ${getCharacterCountColor(
                                      templateCharCounts[
                                        "sms-return-template"
                                      ] || 0
                                    )}`}
                                  >
                                    Character count:{" "}
                                    {templateCharCounts[
                                      "sms-return-template"
                                    ] || 0}
                                    /{CHARACTER_LIMIT}
                                  </p>
                                  {templateErrors["sms-return-template"] && (
                                    <p className="text-xs text-red-600">
                                      {templateErrors["sms-return-template"]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sms-reminder">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Lesson Reminder SMS
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="sms-reminder-template"
                                  className="text-sm font-semibold"
                                >
                                  SMS Template
                                </Label>
                                <Textarea
                                  id="sms-reminder-template"
                                  rows={3}
                                  onChange={(e) =>
                                    handleTemplateChange(
                                      "sms-reminder-template",
                                      e.target.value
                                    )
                                  }
                                  defaultValue="Reminder: Your surf lesson is tomorrow at {time}! Weather looks {weather}. Don't forget swimwear, towel & sunscreen. See you soon! 🏄‍♂️"
                                />
                                <div className="flex justify-between items-center">
                                  <p
                                    className={`text-xs ${getCharacterCountColor(
                                      templateCharCounts[
                                        "sms-reminder-template"
                                      ] || 0
                                    )}`}
                                  >
                                    Character count:{" "}
                                    {templateCharCounts[
                                      "sms-reminder-template"
                                    ] || 0}
                                    /{CHARACTER_LIMIT}
                                  </p>
                                  {templateErrors["sms-reminder-template"] && (
                                    <p className="text-xs text-red-600">
                                      {templateErrors["sms-reminder-template"]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sms-cancellation">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              Cancellation SMS
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="sms-cancel-template"
                                  className="text-sm font-semibold"
                                >
                                  SMS Template
                                </Label>
                                <Textarea
                                  id="sms-cancel-template"
                                  rows={3}
                                  onChange={(e) =>
                                    handleTemplateChange(
                                      "sms-cancel-template",
                                      e.target.value
                                    )
                                  }
                                  defaultValue="Your lesson for {date} at {time} has been cancelled. {refund_info} We hope to see you back at ReserveSurf soon!"
                                />
                                <div className="flex justify-between items-center">
                                  <p
                                    className={`text-xs ${getCharacterCountColor(
                                      templateCharCounts[
                                        "sms-cancel-template"
                                      ] || 0
                                    )}`}
                                  >
                                    Character count:{" "}
                                    {templateCharCounts[
                                      "sms-cancel-template"
                                    ] || 0}
                                    /{CHARACTER_LIMIT}
                                  </p>
                                  {templateErrors["sms-cancel-template"] && (
                                    <p className="text-xs text-red-600">
                                      {templateErrors["sms-cancel-template"]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sms-last-minute">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Last-Minute Changes SMS
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="sms-lastminute-template"
                                  className="text-sm font-semibold"
                                >
                                  SMS Template
                                </Label>
                                <Textarea
                                  id="sms-lastminute-template"
                                  rows={3}
                                  onChange={(e) =>
                                    handleTemplateChange(
                                      "sms-lastminute-template",
                                      e.target.value
                                    )
                                  }
                                  defaultValue="URGENT: Your lesson today has been {change_type}. New time: {new_time} or {new_date}. Please confirm ASAP. Call us: +351 261 860 492"
                                />
                                <div className="flex justify-between items-center">
                                  <p
                                    className={`text-xs ${getCharacterCountColor(
                                      templateCharCounts[
                                        "sms-lastminute-template"
                                      ] || 0
                                    )}`}
                                  >
                                    Character count:{" "}
                                    {templateCharCounts[
                                      "sms-lastminute-template"
                                    ] || 0}
                                    /{CHARACTER_LIMIT}
                                  </p>
                                  {templateErrors[
                                    "sms-lastminute-template"
                                  ] && (
                                    <p className="text-xs text-red-600">
                                      {
                                        templateErrors[
                                          "sms-lastminute-template"
                                        ]
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
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

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium">
                              Class Reminders
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Send reminders to staff before their scheduled
                              classes
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium">
                              Equipment Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Notify staff about equipment maintenance or
                              availability
                            </p>
                          </div>
                          <Switch />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label className="font-medium">
                              Weather Updates
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Send weather alerts that might affect lessons
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
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>
                  Sync your bookings with Google Calendar for seamless
                  scheduling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Google Calendar Section */}
                  <div className="flex items-center justify-between p-6 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center border">
                        <CalendarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">
                          {googleCalendarIntegration.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {googleCalendarIntegration.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          getStatusColor(googleCalendarIntegration.status) as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline"
                        }
                      >
                        {googleCalendarIntegration.status}
                      </Badge>
                      <Button
                        variant={
                          googleCalendarIntegration.status === "connected"
                            ? "outline"
                            : "default"
                        }
                        size="sm"
                      >
                        {googleCalendarIntegration.status === "connected"
                          ? "Configure"
                          : "Connect"}
                      </Button>
                    </div>
                  </div>

                  {/* Calendar Sync Settings */}
                  {googleCalendarIntegration.status === "connected" && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Sync Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label>Auto-sync new bookings</Label>
                              <p className="text-sm text-muted-foreground">
                                Automatically add new bookings to your Google
                                Calendar
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label>Sync cancellations</Label>
                              <p className="text-sm text-muted-foreground">
                                Remove cancelled bookings from your calendar
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label>Include customer details</Label>
                              <p className="text-sm text-muted-foreground">
                                Add customer name and contact info to calendar
                                events
                              </p>
                            </div>
                            <Switch
                              defaultChecked
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Integrate ReserveSurf with your applications using our RESTful
                  API and real-time webhooks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* API Key Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      API Authentication
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use your API key to authenticate requests to the ReserveSurf
                    API. Include it in the Authorization header of your
                    requests.
                  </p>

                  <div className="space-y-3">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="api-key"
                        type="password"
                        value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline">Copy</Button>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        Example API Request:
                      </p>
                      <pre className="text-xs text-muted-foreground bg-background p-3 rounded border overflow-x-auto">
                        {`curl -X GET "https://api.reservesurf.com/v1/bookings" \\
  -H "Authorization: Bearer sk_live_xxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`}
                      </pre>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Webhook Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Webhook className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Webhook Notifications
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time notifications about booking events,
                    cancellations, and customer updates directly to your
                    application.
                  </p>

                  <div className="space-y-3">
                    <Label htmlFor="webhook-url">Webhook Endpoint URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-app.com/webhooks/reservesurf"
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your endpoint must respond with a 200 status code within
                      10 seconds to acknowledge receipt.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Webhook Events</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <div>
                          <Label className="text-sm font-medium">
                            booking.created
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            New booking made
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <div>
                          <Label className="text-sm font-medium">
                            booking.cancelled
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Booking cancelled
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <div>
                          <Label className="text-sm font-medium">
                            booking.updated
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Booking details changed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <input type="checkbox" className="rounded" />
                        <div>
                          <Label className="text-sm font-medium">
                            customer.created
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            New customer registered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      Example Webhook Payload:
                    </p>
                    <pre className="text-xs text-muted-foreground bg-background p-3 rounded border overflow-x-auto">
                      {`{
  "event": "booking.created",
  "timestamp": "2024-03-15T10:30:00Z",
  "data": {
    "booking_id": "bk_1234567890",
    "customer": {
      "name": "João Silva",
      "email": "joao@example.com",
      "phone": "+351 912 345 678"
    },
    "activity": "Surf Lessons",
    "date": "2024-03-20",
    "time": "14:00",
    "duration": 2,
    "price": 45.00,
    "status": "confirmed"
  }
}`}
                    </pre>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Webhook className="h-4 w-4 mr-2" />
                      Test Webhook
                    </Button>
                    <Button variant="outline">View Documentation</Button>
                  </div>
                </div>

                <Separator />

                {/* API Endpoints Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Available Endpoints
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Common API endpoints you can use to integrate with
                    ReserveSurf. Base URL: https://api.reservesurf.com/v1
                  </p>

                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          GET
                        </Badge>
                        <code className="text-sm">/bookings</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Retrieve all bookings with optional filtering by date,
                        status, or customer
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          POST
                        </Badge>
                        <code className="text-sm">/bookings</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Create a new booking for a customer
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          GET
                        </Badge>
                        <code className="text-sm">/customers</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        List all customers with their booking history
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          GET
                        </Badge>
                        <code className="text-sm">/availability</code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Check available time slots for specific activities and
                        dates
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    View Complete API Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="team" className="space-y-6">
            <Tabs defaultValue="roles" className="w-full">
              <TabsList>
                <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                <TabsTrigger value="members">Team Members</TabsTrigger>
              </TabsList>

              <TabsContent value="roles" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Role Management</h2>
                    <p className="text-muted-foreground">
                      Manage default roles and create custom ones with specific
                      permissions
                    </p>
                  </div>
                  <Button onClick={() => setIsCreateRoleDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Custom Role
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Default Roles</CardTitle>
                    <CardDescription>
                      Pre-configured roles with standard permission sets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {defaultRoles.map((role) => (
                        <div
                          key={role.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {role.name}
                                <Badge variant="outline" className="text-xs">
                                  Default
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {role.description}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {role.permissions.length} permissions
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedRole(role)}
                            >
                              View Permissions
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Roles</CardTitle>
                    <CardDescription>
                      Roles created specifically for your business needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customRoles.length === 0 ? (
                        <div className="text-center py-8">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">
                            No custom roles created yet
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setIsCreateRoleDialogOpen(true)}
                          >
                            Create Your First Custom Role
                          </Button>
                        </div>
                      ) : (
                        customRoles.map((role) => (
                          <div
                            key={role.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <Users className="h-5 w-5 text-secondary" />
                              </div>
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  {role.name}
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Custom
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {role.description}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {role.permissions.length} permissions
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRole(role)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCustomRole(role.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Permission Details Dialog */}
                <Dialog
                  open={!!selectedRole}
                  onOpenChange={() => setSelectedRole(null)}
                >
                  <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedRole?.name} - Permissions
                      </DialogTitle>
                      <DialogDescription>
                        {selectedRole?.isDefault
                          ? "View the permissions for this default role"
                          : "Edit permissions for this custom role"}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedRole && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {permissionCategories.map((category) => (
                            <div key={category.name} className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2">
                                <category.icon className="h-4 w-4" />
                                {category.name}
                              </h4>
                              <div className="space-y-2 pl-6">
                                {category.permissions.map((permission) => (
                                  <div
                                    key={permission.key}
                                    className="flex items-center justify-between"
                                  >
                                    <div>
                                      <Label className="text-sm font-medium">
                                        {permission.name}
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        {permission.description}
                                      </p>
                                    </div>
                                    <Switch
                                      checked={selectedRole.permissions.includes(
                                        permission.key
                                      )}
                                      disabled={selectedRole.isDefault}
                                      onCheckedChange={(checked) => {
                                        if (!selectedRole.isDefault) {
                                          handlePermissionToggle(
                                            selectedRole.id,
                                            permission.key,
                                            checked
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRole(null)}
                      >
                        {selectedRole?.isDefault ? "Close" : "Cancel"}
                      </Button>
                      {selectedRole && !selectedRole.isDefault && (
                        <Button onClick={() => handleSaveRole()}>
                          Save Changes
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Create Custom Role Dialog */}
                <Dialog
                  open={isCreateRoleDialogOpen}
                  onOpenChange={setIsCreateRoleDialogOpen}
                >
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create Custom Role</DialogTitle>
                      <DialogDescription>
                        Define a new role with specific permissions for your
                        team
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const roleData = {
                          name: formData.get("name") as string,
                          description: formData.get("description") as string,
                        };
                        handleCreateCustomRole(roleData);
                      }}
                    >
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="role-name">Role Name *</Label>
                          <Input
                            id="role-name"
                            name="name"
                            placeholder="e.g., Beach Manager"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role-description">Description</Label>
                          <Textarea
                            id="role-description"
                            name="description"
                            placeholder="Brief description of this role's responsibilities"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setIsCreateRoleDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Create Role</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="members" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Manage user access and assign roles
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
                                  <AvatarFallback>
                                    {member.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {member.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select
                                defaultValue={member.role}
                                onValueChange={() =>
                                  handleMemberRoleChange()
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[...defaultRoles, ...customRoles].map(
                                    (role) => (
                                      <SelectItem
                                        key={role.id}
                                        value={role.name}
                                      >
                                        {role.name}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  getStatusColor(member.status) as
                                    | "default"
                                    | "secondary"
                                    | "destructive"
                                    | "outline"
                                }
                              >
                                {member.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
