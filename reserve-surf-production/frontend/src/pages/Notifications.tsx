import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Calendar,
  AlertCircle,
  Wrench,
  DollarSign,
  Cloud,
  UserCheck,
  Clock,
  Trash2,
  Settings,
  Filter,
  Archive,
  Mail,
  MessageSquare,
  CalendarPlus,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NotificationType =
  | "booking"
  | "payment"
  | "maintenance"
  | "weather"
  | "staff"
  | "system";
type NotificationPriority = "high" | "medium" | "low";
type NotificationStatus = "unread" | "read" | "archived";

interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  status: NotificationStatus;
  actionRequired?: boolean;
  relatedId?: string;
  metadata?: Record<string, any>;
  calendarEvent?: {
    title: string;
    startTime: string;
    endTime: string;
    location?: string;
    description?: string;
  };
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  bookingAlerts: boolean;
  paymentAlerts: boolean;
  maintenanceAlerts: boolean;
  weatherAlerts: boolean;
  staffAlerts: boolean;
  systemAlerts: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

const notificationTypeConfig = {
  booking: { icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-50" },
  payment: {
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  maintenance: {
    icon: Wrench,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  weather: { icon: Cloud, color: "text-purple-600", bgColor: "bg-purple-50" },
  staff: { icon: UserCheck, color: "text-orange-600", bgColor: "bg-orange-50" },
  system: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50" },
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    priority: "high",
    title: "New Booking Request",
    message:
      "John Doe has requested a booking for 3 surfboards on Dec 15, 2024",
    timestamp: "2024-12-10T10:30:00",
    status: "unread",
    actionRequired: true,
    relatedId: "BOOK-2024-1215",
    calendarEvent: {
      title: "Surf Lesson - John Doe",
      startTime: "2024-12-15T09:00:00",
      endTime: "2024-12-15T11:00:00",
      location: "Main Beach",
      description: "3 surfboards rental with lesson for John Doe",
    },
  },
  {
    id: "2",
    type: "payment",
    priority: "high",
    title: "Payment Received",
    message:
      "Payment of $450 received from Sarah Johnson for booking #BOOK-2024-1214",
    timestamp: "2024-12-10T09:15:00",
    status: "unread",
    relatedId: "PAY-2024-1214",
  },
  {
    id: "3",
    type: "maintenance",
    priority: "medium",
    title: "Equipment Maintenance Due",
    message:
      "5 surfboards and 3 wetsuits are due for routine maintenance this week",
    timestamp: "2024-12-10T08:00:00",
    status: "read",
    actionRequired: true,
    calendarEvent: {
      title: "Equipment Maintenance Session",
      startTime: "2024-12-13T10:00:00",
      endTime: "2024-12-13T14:00:00",
      location: "Equipment Storage",
      description: "Routine maintenance for 5 surfboards and 3 wetsuits",
    },
  },
  {
    id: "4",
    type: "weather",
    priority: "high",
    title: "Weather Alert",
    message:
      "High wind warning issued for tomorrow. Consider rescheduling water activities",
    timestamp: "2024-12-09T18:00:00",
    status: "read",
    metadata: { windSpeed: "35mph", waveHeight: "8-10ft" },
  },
  {
    id: "5",
    type: "staff",
    priority: "low",
    title: "Staff Schedule Update",
    message: "Mike Smith has updated his availability for next week",
    timestamp: "2024-12-09T16:30:00",
    status: "read",
  },
  {
    id: "6",
    type: "system",
    priority: "low",
    title: "System Update Available",
    message:
      "A new system update is available. Please update at your earliest convenience",
    timestamp: "2024-12-09T12:00:00",
    status: "archived",
  },
  {
    id: "7",
    type: "booking",
    priority: "medium",
    title: "Booking Cancellation",
    message: "Robert Brown has cancelled their booking for Dec 12, 2024",
    timestamp: "2024-12-09T11:45:00",
    status: "read",
    relatedId: "BOOK-2024-1212",
    calendarEvent: {
      title: "CANCELLED: Surf Lesson - Robert Brown",
      startTime: "2024-12-12T14:00:00",
      endTime: "2024-12-12T16:00:00",
      location: "Main Beach",
      description: "Booking cancelled by Robert Brown",
    },
  },
  {
    id: "8",
    type: "payment",
    priority: "high",
    title: "Payment Failed",
    message:
      "Payment processing failed for booking #BOOK-2024-1216. Customer needs to retry",
    timestamp: "2024-12-09T10:20:00",
    status: "unread",
    actionRequired: true,
    relatedId: "PAY-2024-1216",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [selectedTab, setSelectedTab] = useState<"all" | "unread" | "archived">(
    "all"
  );
  const [filterType, setFilterType] = useState<NotificationType | "all">("all");
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    bookingAlerts: true,
    paymentAlerts: true,
    maintenanceAlerts: true,
    weatherAlerts: true,
    staffAlerts: true,
    systemAlerts: false,
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  });

  // Google Calendar integration status (this would typically come from a settings context or API)
  const [googleCalendarConnected] = useState(true);

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by tab
    if (selectedTab === "unread") {
      filtered = filtered.filter((n) => n.status === "unread");
    } else if (selectedTab === "archived") {
      filtered = filtered.filter((n) => n.status === "archived");
    } else {
      filtered = filtered.filter((n) => n.status !== "archived");
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((n) => n.type === filterType);
    }

    // Sort by timestamp (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) =>
        n.status === "unread" ? { ...n, status: "read" } : n
      )
    );
  };

  const archiveNotification = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, status: "archived" } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const addToGoogleCalendar = (notification: Notification) => {
    if (!notification.calendarEvent || !googleCalendarConnected) {
      console.warn(
        "Cannot add to calendar: Missing calendar event or Google Calendar not connected"
      );
      return;
    }

    const event = notification.calendarEvent;
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    // Format dates for Google Calendar URL
    const formatDate = (date: Date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    };

    const googleCalendarUrl = new URL(
      "https://calendar.google.com/calendar/render"
    );
    googleCalendarUrl.searchParams.set("action", "TEMPLATE");
    googleCalendarUrl.searchParams.set("text", event.title);
    googleCalendarUrl.searchParams.set(
      "dates",
      `${formatDate(startDate)}/${formatDate(endDate)}`
    );
    googleCalendarUrl.searchParams.set(
      "details",
      event.description || notification.message
    );
    if (event.location) {
      googleCalendarUrl.searchParams.set("location", event.location);
    }

    // Open Google Calendar in a new window
    window.open(googleCalendarUrl.toString(), "_blank");

    // Log success for debugging (in production, this could trigger a toast notification)
    console.log(`Opening Google Calendar to add event: ${event.title}`);
  };

  const canAddToCalendar = (notification: Notification) => {
    return (
      googleCalendarConnected &&
      notification.calendarEvent &&
      (notification.type === "booking" || notification.type === "maintenance")
    );
  };

  const getPriorityBadge = (priority: NotificationPriority) => {
    const config = {
      high: { variant: "destructive" as const, label: "High" },
      medium: { variant: "secondary" as const, label: "Medium" },
      low: { variant: "outline" as const, label: "Low" },
    };
    return (
      <Badge variant={config[priority].variant} className="text-xs">
        {config[priority].label}
      </Badge>
    );
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return then.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => n.status === "unread").length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <DashboardLayout
      pageTitle="Notifications"
      breadcrumbs={[{ title: "Notifications" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        <Tabs
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as any)}
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">
                All
                {notifications.filter((n) => n.status !== "archived").length >
                  0 && (
                  <Badge variant="secondary" className="ml-2">
                    {
                      notifications.filter((n) => n.status !== "archived")
                        .length
                    }
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select
                value={filterType}
                onValueChange={(v) => setFilterType(v as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="booking">Bookings</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>

              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Notifications List */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    {filteredNotifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                        <BellOff className="h-12 w-12 mb-2" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filteredNotifications.map((notification) => {
                          const TypeIcon =
                            notificationTypeConfig[notification.type].icon;
                          const isUnread = notification.status === "unread";

                          return (
                            <div
                              key={notification.id}
                              className={`p-4 hover:bg-muted/50 transition-colors ${
                                isUnread ? "bg-muted/20" : ""
                              }`}
                            >
                              <div className="flex gap-3">
                                <div
                                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                    notificationTypeConfig[notification.type]
                                      .bgColor
                                  }`}
                                >
                                  <TypeIcon
                                    className={`h-5 w-5 ${
                                      notificationTypeConfig[notification.type]
                                        .color
                                    }`}
                                  />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <p
                                          className={`font-medium ${
                                            isUnread ? "font-semibold" : ""
                                          }`}
                                        >
                                          {notification.title}
                                        </p>
                                        {canAddToCalendar(notification) && (
                                          <CalendarPlus className="h-4 w-4 text-blue-600" />
                                        )}
                                        {notification.actionRequired && (
                                          <Badge
                                            variant="destructive"
                                            className="text-xs"
                                          >
                                            Action Required
                                          </Badge>
                                        )}
                                        {getPriorityBadge(
                                          notification.priority
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {notification.message}
                                      </p>
                                      {notification.relatedId && (
                                        <p className="text-xs text-muted-foreground">
                                          Reference: {notification.relatedId}
                                        </p>
                                      )}
                                      {notification.metadata && (
                                        <div className="flex gap-3 mt-2">
                                          {Object.entries(
                                            notification.metadata
                                          ).map(([key, value]) => (
                                            <Badge
                                              key={key}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {key}: {value}
                                            </Badge>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                        >
                                          <Settings className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        {canAddToCalendar(notification) && (
                                          <>
                                            <DropdownMenuItem
                                              onClick={() =>
                                                addToGoogleCalendar(
                                                  notification
                                                )
                                              }
                                            >
                                              <CalendarPlus className="mr-2 h-4 w-4" />
                                              Add to Calendar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                          </>
                                        )}
                                        {isUnread && (
                                          <DropdownMenuItem
                                            onClick={() =>
                                              markAsRead(notification.id)
                                            }
                                          >
                                            <Check className="mr-2 h-4 w-4" />
                                            Mark as read
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem
                                          onClick={() =>
                                            archiveNotification(notification.id)
                                          }
                                        >
                                          <Archive className="mr-2 h-4 w-4" />
                                          Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          onClick={() =>
                                            deleteNotification(notification.id)
                                          }
                                          className="text-red-600"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {getRelativeTime(notification.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Preferences */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="email">Email</Label>
                        </div>
                        <Switch
                          id="email"
                          checked={preferences.email}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, email: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="push">Push Notifications</Label>
                        </div>
                        <Switch
                          id="push"
                          checked={preferences.push}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, push: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="sms">SMS</Label>
                        </div>
                        <Switch
                          id="sms"
                          checked={preferences.sms}
                          onCheckedChange={(checked) =>
                            setPreferences({ ...preferences, sms: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Alert Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bookingAlerts">Booking Alerts</Label>
                        <Switch
                          id="bookingAlerts"
                          checked={preferences.bookingAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              bookingAlerts: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                        <Switch
                          id="paymentAlerts"
                          checked={preferences.paymentAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              paymentAlerts: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenanceAlerts">
                          Maintenance Alerts
                        </Label>
                        <Switch
                          id="maintenanceAlerts"
                          checked={preferences.maintenanceAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              maintenanceAlerts: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="weatherAlerts">Weather Alerts</Label>
                        <Switch
                          id="weatherAlerts"
                          checked={preferences.weatherAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              weatherAlerts: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="staffAlerts">Staff Alerts</Label>
                        <Switch
                          id="staffAlerts"
                          checked={preferences.staffAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              staffAlerts: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="systemAlerts">System Alerts</Label>
                        <Switch
                          id="systemAlerts"
                          checked={preferences.systemAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              systemAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Quiet Hours</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quietHours">Enable Quiet Hours</Label>
                        <Switch
                          id="quietHours"
                          checked={preferences.quietHoursEnabled}
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              quietHoursEnabled: checked,
                            })
                          }
                        />
                      </div>
                      {preferences.quietHoursEnabled && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="quietStart" className="text-xs">
                              Start
                            </Label>
                            <Input
                              id="quietStart"
                              type="time"
                              value={preferences.quietHoursStart}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  quietHoursStart: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="quietEnd" className="text-xs">
                              End
                            </Label>
                            <Input
                              id="quietEnd"
                              type="time"
                              value={preferences.quietHoursEnd}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  quietHoursEnd: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>

              {/* Google Calendar Integration Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Calendar Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">Google Calendar</div>
                        <div className="text-sm text-muted-foreground">
                          {googleCalendarConnected
                            ? "Connected - Events can be added to calendar"
                            : "Not connected - Connect in Settings to add events"}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={googleCalendarConnected ? "default" : "outline"}
                    >
                      {googleCalendarConnected ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>

                  {!googleCalendarConnected && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        To add booking events to your Google Calendar, please
                        connect your Google Calendar integration in the Settings
                        page.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Go to Settings
                      </Button>
                    </div>
                  )}

                  {googleCalendarConnected && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Notifications with calendar events will show a{" "}
                        <CalendarPlus className="h-4 w-4 inline mx-1 text-blue-600" />{" "}
                        icon. Click the menu button and select "Add to Calendar"
                        to add them to your Google Calendar.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
