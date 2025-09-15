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
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  TrendingUp,
  Calendar as CalendarIcon,
  Download,
  LineChart as LineChartIcon,
  Table as TableIcon,
  ChevronDown,
  FileText,
  Mail,
  Printer,
  Search,
  Filter,
  DollarSign,
  CreditCard,
} from "lucide-react";

export default function Reports() {
  const [selectedDateRange, setSelectedDateRange] = useState("month");
  const [selectedReportType, setSelectedReportType] = useState("revenue");
  const [chartType, setChartType] = useState("line");
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for reports
  const revenueData = [
    { month: "Jan", revenue: 4200, bookings: 42, customers: 38 },
    { month: "Feb", revenue: 3800, bookings: 38, customers: 35 },
    { month: "Mar", revenue: 5200, bookings: 52, customers: 47 },
    { month: "Apr", revenue: 6100, bookings: 61, customers: 54 },
    { month: "May", revenue: 7800, bookings: 78, customers: 68 },
    { month: "Jun", revenue: 9200, bookings: 92, customers: 79 },
    { month: "Jul", revenue: 12400, bookings: 124, customers: 102 },
    { month: "Aug", revenue: 13800, bookings: 138, customers: 115 },
    { month: "Sep", revenue: 11200, bookings: 112, customers: 95 },
    { month: "Oct", revenue: 8600, bookings: 86, customers: 73 },
    { month: "Nov", revenue: 6400, bookings: 64, customers: 58 },
    { month: "Dec", revenue: 7200, bookings: 72, customers: 65 },
  ];

  const activityBreakdown = [
    { activity: "Surf Lessons", value: 45, revenue: 18500 },
    { activity: "Kite Lessons", value: 25, revenue: 15600 },
    { activity: "SUP Lessons", value: 15, revenue: 7200 },
    { activity: "Equipment Rental", value: 10, revenue: 3400 },
    { activity: "Photography", value: 5, revenue: 1800 },
  ];

  const staffPerformance = [
    { name: "Carlos", bookings: 342, revenue: 15680, rating: 4.9 },
    { name: "Ana", bookings: 287, revenue: 12340, rating: 4.8 },
    { name: "Miguel", bookings: 156, revenue: 8920, rating: 4.7 },
    { name: "Sofia", bookings: 89, revenue: 3560, rating: 4.6 },
  ];

  const dailyOperations = [
    {
      date: "2024-01-15",
      bookings: 12,
      revenue: 520,
      noShows: 1,
      cancellations: 0,
    },
    {
      date: "2024-01-16",
      bookings: 15,
      revenue: 680,
      noShows: 2,
      cancellations: 1,
    },
    {
      date: "2024-01-17",
      bookings: 18,
      revenue: 780,
      noShows: 0,
      cancellations: 2,
    },
    {
      date: "2024-01-18",
      bookings: 21,
      revenue: 920,
      noShows: 1,
      cancellations: 0,
    },
    {
      date: "2024-01-19",
      bookings: 24,
      revenue: 1040,
      noShows: 3,
      cancellations: 1,
    },
  ];

  // Transaction data for Finances tab
  const mockTransactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      time: "14:30",
      customer: "John Smith",
      type: "Booking Payment",
      amount: 150.0,
      status: "completed",
      paymentMethod: "Credit Card",
      bookingId: "BK-2024-001",
      description: "Surf lesson - 2 hours",
    },
    {
      id: "TXN-002",
      date: "2024-01-15",
      time: "12:15",
      customer: "Sarah Johnson",
      type: "Equipment Rental",
      amount: 75.0,
      status: "completed",
      paymentMethod: "PayPal",
      bookingId: "BK-2024-002",
      description: "Surfboard rental - Full day",
    },
    {
      id: "TXN-003",
      date: "2024-01-14",
      time: "16:45",
      customer: "Mike Wilson",
      type: "Booking Payment",
      amount: 200.0,
      status: "pending",
      paymentMethod: "Bank Transfer",
      bookingId: "BK-2024-003",
      description: "Group lesson - 4 people",
    },
    {
      id: "TXN-004",
      date: "2024-01-14",
      time: "10:20",
      customer: "Emma Davis",
      type: "Refund",
      amount: -100.0,
      status: "completed",
      paymentMethod: "Credit Card",
      bookingId: "BK-2024-004",
      description: "Cancelled booking refund",
    },
    {
      id: "TXN-005",
      date: "2024-01-13",
      time: "13:30",
      customer: "Alex Brown",
      type: "Equipment Rental",
      amount: 45.0,
      status: "completed",
      paymentMethod: "Cash",
      bookingId: "BK-2024-005",
      description: "Wetsuit rental - Half day",
    },
  ];

  // Helper functions for transaction formatting
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? `-€${formatted}` : `€${formatted}`;
  };

  const getAmountColor = (amount: number) => {
    if (amount < 0) return "text-red-600";
    return "text-green-600";
  };

  // Calculate finance summary stats
  const totalTransactionRevenue = mockTransactions
    .filter((t) => t.status === "completed" && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = Math.abs(
    mockTransactions
      .filter((t) => t.status === "completed" && t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const pendingAmount = mockTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(142, 76%, 36%)", // Green for revenue
    },
    bookings: {
      label: "Bookings",
      color: "hsl(221, 83%, 53%)", // Blue for bookings
    },
    customers: {
      label: "Customers",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const pieColors = [
    "hsl(142, 76%, 36%)",
    "hsl(221, 83%, 53%)",
    "hsl(38, 92%, 50%)",
    "hsl(0, 84%, 60%)",
    "hsl(280, 100%, 70%)",
  ];

  const summaryMetrics = {
    totalRevenue: 96200,
    totalBookings: 959,
    avgBookingValue: 100.3,
    customerRetention: 68,
    revenueGrowth: 12.5,
    bookingGrowth: 8.3,
  };

  return (
    <DashboardLayout
      pageTitle="Reports & Analytics"
      breadcrumbs={[{ title: "Reports" }]}
      showQuickActions={true}
    >
      <div className="space-y-6">
        {/* Reports Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select
                  value={selectedReportType}
                  onValueChange={setSelectedReportType}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue Reports</SelectItem>
                    <SelectItem value="bookings">Booking Analytics</SelectItem>
                    <SelectItem value="customers">Customer Insights</SelectItem>
                    <SelectItem value="staff">Staff Performance</SelectItem>
                    <SelectItem value="operations">Daily Operations</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="min-w-[200px]">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDateRange === "month" && "Last 30 days"}
                      {selectedDateRange === "quarter" && "Last 3 months"}
                      {selectedDateRange === "year" && "Last 12 months"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-4 space-y-4">
                      <ToggleGroup
                        type="single"
                        value={selectedDateRange}
                        onValueChange={setSelectedDateRange}
                      >
                        <ToggleGroupItem value="week">Week</ToggleGroupItem>
                        <ToggleGroupItem value="month">Month</ToggleGroupItem>
                        <ToggleGroupItem value="quarter">
                          Quarter
                        </ToggleGroupItem>
                        <ToggleGroupItem value="year">Year</ToggleGroupItem>
                      </ToggleGroup>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={showComparison}
                          onCheckedChange={setShowComparison}
                        />
                        <span className="text-sm">Compare periods</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TableIcon className="h-4 w-4 mr-2" />
                      Export CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="h-4 w-4 mr-2" />
                      Print Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Schedule Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold">
                €{summaryMetrics.totalRevenue.toLocaleString()}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />+
                  {summaryMetrics.revenueGrowth}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold">
                {summaryMetrics.totalBookings}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />+
                  {summaryMetrics.bookingGrowth}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg Booking Value</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold">
                €{summaryMetrics.avgBookingValue}
              </CardTitle>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Customer Retention</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold">
                {summaryMetrics.customerRetention}%
              </CardTitle>
              <Progress
                value={summaryMetrics.customerRetention}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Visualization */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Track performance over time with detailed insights
                </CardDescription>
              </div>
              <ToggleGroup
                type="single"
                value={chartType}
                onValueChange={setChartType}
              >
                <ToggleGroupItem value="line">
                  <LineChartIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table">
                  <TableIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent>
            {chartType === "line" && (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    fill="var(--color-revenue)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  {showComparison && (
                    <Area
                      dataKey="bookings"
                      type="monotone"
                      stroke="var(--color-bookings)"
                      fill="var(--color-bookings)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  )}
                </AreaChart>
              </ChartContainer>
            )}

            {chartType === "table" && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Avg Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueData.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell>€{row.revenue}</TableCell>
                      <TableCell>{row.bookings}</TableCell>
                      <TableCell>{row.customers}</TableCell>
                      <TableCell>
                        €{Math.round(row.revenue / row.bookings)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="finances">Finances</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Breakdown</CardTitle>
                  <CardDescription>
                    Revenue distribution by activity type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activityBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {activityBreakdown.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={pieColors[index % pieColors.length]}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background border rounded-lg p-3 shadow-md">
                                  <p className="font-medium">{data.activity}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {data.value}% (€{data.revenue})
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {activityBreakdown.map((item, index) => (
                      <div
                        key={item.activity}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: pieColors[index] }}
                          />
                          <span className="text-sm">{item.activity}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>
                    Individual performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffPerformance.map((staff) => (
                      <div key={staff.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{staff.name}</span>
                          <Badge variant="outline">{staff.rating}★</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Bookings:{" "}
                            </span>
                            <span>{staff.bookings}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Revenue:{" "}
                            </span>
                            <span>€{staff.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                        <Progress
                          value={(staff.bookings / 350) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Direct Bookings</span>
                      <span className="text-sm font-medium">€45,200</span>
                    </div>
                    <Progress value={70} />
                    <div className="flex justify-between">
                      <span className="text-sm">Online Platforms</span>
                      <span className="text-sm font-medium">€28,600</span>
                    </div>
                    <Progress value={45} />
                    <div className="flex justify-between">
                      <span className="text-sm">Walk-ins</span>
                      <span className="text-sm font-medium">€22,400</span>
                    </div>
                    <Progress value={35} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Credit Card</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                    <div className="flex justify-between">
                      <span className="text-sm">Cash</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <Progress value={22} />
                    <div className="flex justify-between">
                      <span className="text-sm">Bank Transfer</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Targets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Revenue Goal</span>
                        <span className="text-sm font-medium">€15,000</span>
                      </div>
                      <Progress value={85} />
                      <p className="text-xs text-muted-foreground mt-1">
                        €12,750 achieved
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Booking Target</span>
                        <span className="text-sm font-medium">120</span>
                      </div>
                      <Progress value={92} />
                      <p className="text-xs text-muted-foreground mt-1">
                        110 bookings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finances" className="space-y-6">
            {/* Finance Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Total Revenue</CardDescription>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl font-bold text-green-600">
                    €{totalTransactionRevenue.toFixed(2)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Pending Payments</CardDescription>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl font-bold text-orange-600">
                    €{pendingAmount.toFixed(2)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {mockTransactions.filter(t => t.status === "pending").length} transactions pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Total Refunds</CardDescription>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl font-bold text-red-600">
                    €{totalRefunds.toFixed(2)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    -2.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>Transactions</CardDescription>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl font-bold">
                    {mockTransactions.length}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Booking Payment">Booking Payment</SelectItem>
                      <SelectItem value="Equipment Rental">Equipment Rental</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{transaction.date}</span>
                            <span className="text-xs text-muted-foreground">
                              {transaction.time}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {transaction.description}
                        </TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(transaction.status)}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium ${getAmountColor(
                            transaction.amount
                          )}`}
                        >
                          {formatAmount(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredTransactions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="text-muted-foreground">
                      No transactions found matching your criteria
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setTypeFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detailed Breakdown */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Detailed Breakdown</CardTitle>
                    <CardDescription>
                      Expand for comprehensive data analysis
                    </CardDescription>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Operations Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>No-Shows</TableHead>
                      <TableHead>Cancellations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyOperations.map((day) => (
                      <TableRow key={day.date}>
                        <TableCell>{day.date}</TableCell>
                        <TableCell>{day.bookings}</TableCell>
                        <TableCell>€{day.revenue}</TableCell>
                        <TableCell>{day.noShows}</TableCell>
                        <TableCell>{day.cancellations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </DashboardLayout>
  );
}
