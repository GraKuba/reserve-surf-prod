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
  Bar,
  BarChart,
  Line,
  LineChart,
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
  BarChart3,
  LineChart as LineChartIcon,
  Table as TableIcon,
  ChevronDown,
  FileText,
  Mail,
  Printer,
} from "lucide-react";

export default function Reports() {
  const [selectedDateRange, setSelectedDateRange] = useState("month");
  const [selectedReportType, setSelectedReportType] = useState("revenue");
  const [chartType, setChartType] = useState("line");
  const [showComparison, setShowComparison] = useState(false);

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

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-2))",
    },
    customers: {
      label: "Customers",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];

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
                <ToggleGroupItem value="bar">
                  <BarChart3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="area">
                  <AreaChart className="h-4 w-4" />
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
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-revenue)" }}
                  />
                  {showComparison && (
                    <Line
                      dataKey="bookings"
                      type="monotone"
                      stroke="var(--color-bookings)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-bookings)" }}
                    />
                  )}
                </LineChart>
              </ChartContainer>
            )}

            {chartType === "bar" && (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ChartContainer>
            )}

            {chartType === "area" && (
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="revenue"
                    type="monotone"
                    fill="var(--color-revenue)"
                    fillOpacity={0.3}
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                  />
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

        {/* Report Templates */}
        <Tabs defaultValue="daily" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="daily">Daily Operations</TabsTrigger>
              <TabsTrigger value="financial">Financial Reports</TabsTrigger>
              <TabsTrigger value="marketing">Marketing Analytics</TabsTrigger>
              <TabsTrigger value="custom">Custom Builder</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="daily" className="space-y-6">
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

          <TabsContent value="financial" className="space-y-6">
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

          <TabsContent value="marketing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>How customers find us</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Google Search</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Social Media</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20" />
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Referrals</span>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="w-20" />
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Direct</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20" />
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Visitor to customer journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">2,450</div>
                      <div className="text-sm text-muted-foreground">
                        Website Visitors
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">485</div>
                      <div className="text-sm text-muted-foreground">
                        Inquiry Forms
                      </div>
                      <Badge variant="outline" className="mt-1">
                        19.8%
                      </Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">142</div>
                      <div className="text-sm text-muted-foreground">
                        Bookings
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        29.3%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>
                  Build your own reports with custom metrics and filters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    Custom Report Builder
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Create personalized reports with drag-and-drop interface
                  </p>
                  <Button>Coming Soon</Button>
                </div>
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
