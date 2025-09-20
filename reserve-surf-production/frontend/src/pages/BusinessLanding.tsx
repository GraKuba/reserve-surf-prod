import { Link } from "react-router-dom";
import {
  Menu,
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Euro,
} from "lucide-react";
import Footer from "@/components/Footer";
// Image is in public directory, referenced directly in src attribute

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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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

const BusinessLanding = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
                <span className="text-xl font-bold font-sans">ReserveSurf</span>
              </Link>
              <Badge variant="secondary" className="text-xs font-sans">
                for Business
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="hidden md:flex">
                <Link to="/client">For Customers</Link>
              </Button>
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit font-sans">
                <Users className="h-3 w-3 mr-1" />
                Stop Drowning in Admin, Start Riding the Wave 🌊
              </Badge>

              <div className="space-y-3">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight font-serif">
                  Your Surf School,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Fully Booked.
                  </span>{" "}
                  No Phone Calls. No Paperwork.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl font-sans">
                  Students want to book instantly. You want to spend less time
                  chasing payments and more time in the water. ReserveSurf makes
                  it happen — bookings, waivers, skill tracking, and payments,
                  all in one place.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 text-base font-sans">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📲</span>
                  <div>
                    <span className="font-semibold text-foreground">
                      Bookings on Autopilot
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Wake up to new bookings already paid for — even while
                      you're surfing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">🏄</span>
                  <div>
                    <span className="font-semibold text-foreground">
                      Digital Skill Passports
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      No more guesswork. Every student comes with a verified
                      skill profile.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📝</span>
                  <div>
                    <span className="font-semibold text-foreground">
                      Waivers Without the Hassle
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Paper forms are dead. Get waivers signed online and skip
                      the boring check-in.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="text-base px-6 py-5 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  asChild
                >
                  <Link to="/onboarding">
                    Start Booking Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-6 py-5 border-2"
                  asChild
                >
                  <Link to="/operator/login">
                    Operator Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Badge variant="destructive" className="px-2 py-0.5">
                  Limited Time
                </Badge>
                <span className="text-muted-foreground">
                  Only 47 early access spots left
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-border bg-card">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      ReserveSurf Dashboard
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Live Demo
                  </Badge>
                </div>
                <div className="relative">
                  <img
                    src="/dashboard-screenshot.png"
                    alt="ReserveSurf Operator Dashboard showing real-time bookings, ocean conditions, and staff scheduling"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-2 -left-2 w-24 h-24 bg-accent/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              THE REAL PROBLEM
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              You're Stuck in the Stone Age
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              While you're drowning in WhatsApp messages, paper waivers, and
              Excel sheets, your competitors are surfing with automated bookings
              and happy customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <div className="text-3xl mb-3">📱</div>
              <CardTitle className="text-lg mb-2 text-destructive">
                The WhatsApp Nightmare
              </CardTitle>
              <CardDescription>
                "Hey, is tomorrow's lesson still on?" at 11 PM. Missing bookings
                because you were in the water.
              </CardDescription>
            </Card>

            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <div className="text-3xl mb-3">📋</div>
              <CardTitle className="text-lg mb-2 text-destructive">
                Paper Trail Hell
              </CardTitle>
              <CardDescription>
                Soggy waivers, lost contact forms, and that one time the wind
                took your entire registration stack.
              </CardDescription>
            </Card>

            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <div className="text-3xl mb-3">💸</div>
              <CardTitle className="text-lg mb-2 text-destructive">
                Cash Chaos
              </CardTitle>
              <CardDescription>
                "I'll pay you next time" turns into chasing payments for weeks.
                No-shows that never paid upfront.
              </CardDescription>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-serif mb-2">
                    The Solution: Work Smarter, Not Harder
                  </h3>
                  <p className="text-muted-foreground">
                    ReserveSurf handles the boring stuff so you can focus on
                    what you love
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">
                          24/7 Online Bookings
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Students book while you sleep
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">Instant Payments</span>
                        <p className="text-sm text-muted-foreground">
                          Get paid upfront, every time
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">
                          Digital Everything
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Waivers, skills, contacts - all online
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">Smart Scheduling</span>
                        <p className="text-sm text-muted-foreground">
                          No double bookings, ever
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">
                          Professional Image
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Look like a million-dollar operation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">Growth Insights</span>
                        <p className="text-sm text-muted-foreground">
                          Know what's working and what's not
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="text-center">
                  <p className="text-lg font-semibold text-primary mb-2">
                    Join 500+ operators who've already made the switch
                  </p>
                  <p className="text-muted-foreground">
                    "I got 3 hours of my day back. Now I actually have time to
                    surf again."
                    <span className="text-sm">
                      - Carlos, Peniche Surf School
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              FEATURES THAT SELL THEMSELVES
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              Smarter classes, happier students, more time in the water
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <CardTitle className="mb-2 text-lg">
                    Instant Booking Button
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Add a booking button to your website in minutes.
                  </CardDescription>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📝</div>
                <div>
                  <CardTitle className="mb-2 text-lg">
                    Digital Waivers
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Collect waivers & emergency contacts online.
                  </CardDescription>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🏄</div>
                <div>
                  <CardTitle className="mb-2 text-lg">Skill Tracking</CardTitle>
                  <CardDescription className="text-sm">
                    Track skills with our student progress system.
                  </CardDescription>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🏿</div>
                <div>
                  <CardTitle className="mb-2 text-lg">
                    Gear Management
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Manage gear inventory without the chaos.
                  </CardDescription>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💳</div>
                <div>
                  <CardTitle className="mb-2 text-lg">
                    Instant Payments
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Get paid instantly with Stripe, PayPal, or local gateways.
                  </CardDescription>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <CardTitle className="mb-2 text-lg">
                    Growth Analytics
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Access real-time analytics & growth reports.
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-8">
              <CardContent className="space-y-4">
                <div className="text-3xl">📊</div>
                <h3 className="text-2xl font-bold font-serif">
                  All-in-One Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Your bookings, instructors, payments, and gear — finally in
                  one simple view.
                </p>
                <p className="text-sm text-muted-foreground">
                  Match students to the right lesson, gear, and instructor in
                  seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              PRICING
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              Pricing That Works With You, Not Against You
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              👉 No hidden costs. No massive dev bills. Just tools that work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-primary/20 bg-primary/5 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-primary font-serif">
                  Freemium
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Perfect for getting started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary mb-4">
                  Free Setup
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Just 3% per booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>All core features included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Digital waivers & payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Student skill tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Real-time analytics</span>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-accent bg-card shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                Most Popular
              </div>
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-foreground font-serif">
                  Pro Plans
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  For growing businesses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-foreground mb-4">
                  Flat Monthly Fee
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    <span>Lower transaction fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    <span>Advanced reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    <span>Multi-location support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    <span>Custom branding</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-accent hover:bg-accent/90"
                  size="lg"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who's It For Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-sans">
              WHO'S IT FOR
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">
              Built for Water Sports Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="mb-2">Surf Schools</CardTitle>
              <CardDescription className="mb-4">
                Who want to look modern without spending €5k+ on a website.
              </CardDescription>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Automated lesson scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Instructor management</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Equipment tracking</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="mb-2">Kite Centers</CardTitle>
              <CardDescription className="mb-4">
                Sick of chasing cash and signatures.
              </CardDescription>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Wind condition tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Digital waivers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Instant payments</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle className="mb-2">Independent Instructors</CardTitle>
              <CardDescription className="mb-4">
                Ready to run their business like a pro.
              </CardDescription>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-secondary-foreground mt-0.5 shrink-0" />
                  <span>Professional booking page</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-secondary-foreground mt-0.5 shrink-0" />
                  <span>Client management</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-secondary-foreground mt-0.5 shrink-0" />
                  <span>Growth analytics</span>
                </li>
              </ul>
            </Card>
          </div>
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

      {/* Final CTA Section - Clean & Focused */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Urgency Badge */}
            <Badge variant="destructive" className="text-xs px-3 py-1">
              ⚡ Limited Spots Available
            </Badge>

            {/* Clear Value Proposition */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif">
              Get Early Access to ReserveSurf
            </h2>

            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Join 500+ operators already on the waitlist. Lock in founder
              pricing before we go public.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-secondary border-2 border-background" />
              </div>
              <span>Join Carlos, Maria, João and 497 others</span>
            </div>

            {/* Primary CTA Buttons - Large & Clear */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg px-8 py-6 min-w-[200px]"
              >
                Save My Spot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-muted shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg px-8 py-6 min-w-[200px]"
              >
                Book a Demo
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-600" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-600" />
                Setup in 45 minutes
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-600" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessLanding;
