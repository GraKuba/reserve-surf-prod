import { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Menu,
  Check,
  ArrowRight,
  Play,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Euro,
} from "lucide-react";
import Footer from "@/components/Footer";

// Import ShadCN components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const BusinessLanding = () => {
  const [monthlyBookings, setMonthlyBookings] = useState([100]);
  const [averageBookingValue, setAverageBookingValue] = useState(75);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  // Calculate savings
  const competitorCost =
    monthlyBookings[0] * averageBookingValue * 0.03 * 12 + 199 * 12;
  const reserveSurfCost = 0;
  const savings = competitorCost - reserveSurfCost;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
                <span className="text-xl font-bold font-sans">ReserveSurf</span>
              </Link>
              <Badge variant="secondary" className="text-xs font-sans">
                for Business
              </Badge>
            </div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Water Sports Platform
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Complete booking and management solution for surf
                              schools, dive centers, and water sports operators.
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/business/surf-schools"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Surf Schools
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Lesson scheduling and instructor management
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/business/kite-centers"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Kite Centers
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Wind condition tracking and equipment rental
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/business/dive-shops"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Dive Shops
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Certification tracking and dive planning
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/business/features"
                    className={navigationMenuTriggerStyle()}
                  >
                    Features
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/business/pricing"
                    className={navigationMenuTriggerStyle()}
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/business/case-studies"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Case Studies
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              See how operators grow with ReserveSurf
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/business/help"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Help Center
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Documentation and support resources
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/business/compare"
                    className={navigationMenuTriggerStyle()}
                  >
                    Compare
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild className="hidden md:flex">
                <Link to="/operator/login">Login</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hidden md:flex">Book Demo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book a Demo</DialogTitle>
                    <DialogDescription>
                      Schedule a 15-minute demo to see ReserveSurf in action.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Business Name" />
                    <Input placeholder="Your Name" />
                    <Input placeholder="Email" />
                    <Input placeholder="Phone (optional)" />
                    <Button className="w-full">Schedule Demo</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit font-sans">
                <Users className="h-3 w-3 mr-1" />
                Trusted by 500+ water sports operators
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight font-serif">
                  The Only Booking Platform With{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    €0 Monthly Fees
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl font-sans">
                  Stop paying for software. Start growing your business. We only
                  make money when you do.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No monthly subscription</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No per-booking charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Just 5% paid by your customers</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Play className="mr-2 h-4 w-4" />
                  Watch 2-min Demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground font-sans">
                No credit card required
              </p>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="border-2 border-white h-8 w-8">
                      <AvatarImage src={`/api/placeholder/32/32?text=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground font-sans">
                  Join 500+ operators saving €2,400/year
                </p>
              </div>
            </div>

            <div className="relative">
              <Card className="p-6 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Dashboard Overview
                    </CardTitle>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/20">
                      <div className="text-2xl font-bold text-primary">
                        €3,420
                      </div>
                      <div className="text-sm text-primary/70">This Week</div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/20">
                      <div className="text-2xl font-bold text-accent-foreground">
                        47
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Bookings
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/20">
                      <div className="text-2xl font-bold text-secondary-foreground">
                        0%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Platform Fees
                      </div>
                    </Card>
                  </div>

                  <Alert className="bg-primary/10 border-primary/20">
                    <Check className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-primary">
                      <strong>New booking:</strong> Sarah M. - Surf Lesson
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              THE PROBLEM
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              Booking Software Is Too Expensive
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
              Traditional platforms charge you to use your own business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-muted bg-card shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-foreground font-serif">
                  Other Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    €99-299/month subscription
                  </span>
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    Plus 2-3% booking fees
                  </span>
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    Setup fees €500+
                  </span>
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    Lock-in contracts
                  </span>
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <Separator className="my-4" />
                <div className="text-2xl font-bold text-destructive bg-destructive/10 p-4 rounded-lg text-center font-serif">
                  Total: €3,600+/year
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-primary bg-primary/5 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-primary font-serif">
                  ReserveSurf
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    €0/month forever
                  </span>
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    0% booking fees
                  </span>
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">€0 setup</span>
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span className="text-foreground font-sans">
                    No contracts
                  </span>
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <Separator className="my-4" />
                <div className="text-2xl font-bold text-primary bg-primary/10 p-4 rounded-lg text-center font-serif">
                  Total: €0/year
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="link" className="text-lg">
              See full comparison →
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              EVERYTHING YOU NEED
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              Built for Water Sports Operators
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              By instructors, for instructors
            </p>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="intelligence">Ocean Intel</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mb-2">Smart Calendar</CardTitle>
                <CardDescription className="mb-4">
                  Intelligent scheduling that prevents double bookings and
                  optimizes instructor time.
                </CardDescription>
                <Button variant="link" className="p-0">
                  Learn More →
                </Button>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mb-2">Real-time Availability</CardTitle>
                <CardDescription className="mb-4">
                  Live availability updates across all channels and booking
                  platforms.
                </CardDescription>
                <Button variant="link" className="p-0">
                  Learn More →
                </Button>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mb-2">Equipment Tracking</CardTitle>
                <CardDescription className="mb-4">
                  Monitor surfboards, wetsuits, and gear with automated
                  check-in/out.
                </CardDescription>
                <Button variant="link" className="p-0">
                  Learn More →
                </Button>
              </Card>
            </TabsContent>

            <TabsContent
              value="intelligence"
              className="grid md:grid-cols-3 gap-8"
            >
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mb-2">Tide & Wind Dashboard</CardTitle>
                <CardDescription className="mb-4">
                  Real-time ocean conditions integrated with your booking
                  system.
                </CardDescription>
                <Button variant="link" className="p-0">
                  Learn More →
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="staff" className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mb-2">Instructor Scheduling</CardTitle>
                <CardDescription className="mb-4">
                  Automated staff scheduling with availability management and
                  mobile app.
                </CardDescription>
                <Button variant="link" className="p-0">
                  Learn More →
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="growth" className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="mb-2">Automated Marketing</CardTitle>
                <CardDescription>
                  Email campaigns, SMS reminders, and review requests on
                  autopilot.
                </CardDescription>
                <Button variant="link" className="p-0">
                  Learn More →
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              PRICING CALCULATOR
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              Calculate Your Savings
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              See why 0% fees beat 'free trials'
            </p>
          </div>

          <Card className="max-w-5xl mx-auto p-8 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Controls Section */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-foreground font-sans">
                      Monthly Bookings
                    </label>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-primary">
                          {monthlyBookings[0]}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          bookings per month
                        </span>
                      </div>
                      <Slider
                        value={monthlyBookings}
                        onValueChange={setMonthlyBookings}
                        max={500}
                        min={10}
                        step={5}
                        className="w-full mb-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>10 min</span>
                        <span>500 max</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Quick presets:
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[25, 50, 100, 200].map((preset) => (
                        <Button
                          key={preset}
                          variant={
                            monthlyBookings[0] === preset
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setMonthlyBookings([preset])}
                          className="text-foreground font-medium"
                        >
                          {preset}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-foreground font-sans">
                      Average Booking Value
                    </label>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <div className="flex gap-3">
                        <Select
                          value={selectedCurrency}
                          onValueChange={setSelectedCurrency}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">€</SelectItem>
                            <SelectItem value="USD">$</SelectItem>
                            <SelectItem value="GBP">£</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={averageBookingValue}
                          onChange={(e) =>
                            setAverageBookingValue(Number(e.target.value))
                          }
                          className="flex-1 text-lg font-medium"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Results Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground font-serif text-center mb-6">
                  Annual Cost Comparison
                </h3>

                <div className="space-y-4">
                  {/* Competitors Card */}
                  <Card className="border-2 border-destructive/20 bg-destructive/5">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-destructive font-serif flex items-center justify-between">
                        Other Platforms
                        <Badge variant="destructive" className="text-xs">
                          EXPENSIVE
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">
                            Monthly subscription:
                          </span>
                          <span className="font-semibold">€199/month</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">
                            Booking fees (3%):
                          </span>
                          <span className="font-semibold">
                            €
                            {Math.round(
                              monthlyBookings[0] *
                                averageBookingValue *
                                0.03 *
                                12
                            )}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">
                            Payment processing:
                          </span>
                          <span className="font-semibold">
                            €
                            {Math.round(
                              monthlyBookings[0] *
                                averageBookingValue *
                                0.029 *
                                12
                            )}
                          </span>
                        </div>
                        <Separator className="border-destructive/20" />
                        <div className="flex justify-between items-center py-3 bg-destructive/10 -mx-6 px-6 rounded-lg">
                          <span className="font-bold text-destructive">
                            Annual Total:
                          </span>
                          <span className="text-xl font-bold text-destructive">
                            €{Math.round(competitorCost)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ReserveSurf Card */}
                  <Card className="border-2 border-primary/20 bg-primary/5">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-primary font-serif flex items-center justify-between">
                        ReserveSurf
                        <Badge variant="default" className="text-xs bg-primary">
                          FREE
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">
                            Monthly subscription:
                          </span>
                          <span className="font-semibold text-primary">
                            €0/month
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">
                            Booking fees:
                          </span>
                          <span className="font-semibold text-primary">€0</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-muted-foreground">
                            Payment processing:
                          </span>
                          <span className="font-semibold">
                            €
                            {Math.round(
                              monthlyBookings[0] *
                                averageBookingValue *
                                0.029 *
                                12
                            )}
                          </span>
                        </div>
                        <Separator className="border-primary/20" />
                        <div className="flex justify-between items-center py-3 bg-primary/10 -mx-6 px-6 rounded-lg">
                          <span className="font-bold text-primary">
                            Annual Total:
                          </span>
                          <span className="text-xl font-bold text-primary">
                            €
                            {Math.round(
                              monthlyBookings[0] *
                                averageBookingValue *
                                0.029 *
                                12
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Savings Summary */}
                <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">
                          Your Annual Savings
                        </h4>
                        <div className="text-4xl font-bold">
                          €{Math.round(savings)}
                        </div>
                      </div>
                      <Separator className="border-primary-foreground/20" />
                      <div className="space-y-2">
                        <p className="text-primary-foreground/90">
                          That's equivalent to{" "}
                          <span className="font-bold">
                            {Math.round(savings / 25)}
                          </span>{" "}
                          free instructor hours!
                        </p>
                        <Progress
                          value={Math.min((savings / 5000) * 100, 100)}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="text-center space-y-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                Start Saving Today
              </Button>
              <Button variant="link" className="text-muted-foreground">
                See Full Pricing Details →
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              Common Questions
            </h2>
            <p className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto">
              Everything you need to know about ReserveSurf for your business.{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary font-medium"
              >
                Still have questions? Contact us →
              </Button>
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {/* Business Model Category */}
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Euro className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground font-serif">
                  Business Model & Pricing
                </h3>
              </div>

              {/* Category FAQs */}
              <div className="space-y-4">
                <Card className="border border-border/50 hover:border-border transition-colors">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="business-1" className="border-none">
                      <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline text-foreground font-sans [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                        How do you make money?
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground font-sans leading-relaxed">
                        We charge your customers a small 5% convenience fee at
                        checkout, similar to how Airbnb works. You never pay us
                        anything - we only make money when you do. This aligns
                        our incentives with your success.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>

                <Card className="border border-border/50 hover:border-border transition-colors">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="business-2" className="border-none">
                      <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline text-foreground font-sans [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                        What's the catch?
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground font-sans leading-relaxed">
                        There's no catch. We believe booking software should
                        help you grow, not drain your profits. Our model is
                        simple: we succeed when you succeed. No monthly fees, no
                        setup costs, no contracts.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>

                <Card className="border border-border/50 hover:border-border transition-colors">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="business-3" className="border-none">
                      <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline text-foreground font-sans [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                        Can I pass fees to customers?
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground font-sans leading-relaxed">
                        Yes, the 5% convenience fee is automatically added to
                        your customers' total at checkout, similar to booking
                        fees on other platforms. Your listed prices remain
                        unchanged.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
            </div>

            {/* Setup & Security Category */}
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground font-serif">
                  Setup & Security
                </h3>
              </div>

              {/* Category FAQs */}
              <div className="space-y-4">
                <Card className="border border-border/50 hover:border-border transition-colors">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="setup-1" className="border-none">
                      <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline text-foreground font-sans [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                        How long is setup?
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground font-sans leading-relaxed">
                        Most operators are live within 45 minutes. Our team
                        guides you through business verification, payment setup,
                        and customization. We handle the technical details so
                        you can focus on your business.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>

                <Card className="border border-border/50 hover:border-border transition-colors">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="setup-2" className="border-none">
                      <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline text-foreground font-sans [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                        Is it secure?
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground font-sans leading-relaxed">
                        Absolutely. We're PCI DSS compliant and use bank-level
                        encryption. Payments are processed through Stripe
                        Connect, so your customers' data never touches our
                        servers. We're GDPR compliant and SOC 2 certified.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold font-serif">
              Ready to Stop Paying for Booking Software?
            </h2>
            <p className="text-xl text-primary-foreground/80 font-sans">
              Join 500+ operators who switched to ReserveSurf
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-muted"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book 15-min Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-primary-foreground/80 font-sans">
              <span>✓ No credit card required</span>
              <span>✓ Set up in 45 minutes</span>
              <span>✓ Cancel anytime</span>
            </div>

            <blockquote className="text-lg italic border-l-4 border-primary-foreground pl-6 mt-12 font-serif">
              "Best decision for our business. We're saving €200/month and our
              bookings increased 40%."
              <footer className="text-primary-foreground/70 mt-2 font-sans">
                - Marcus, North Shore Surf
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessLanding;
