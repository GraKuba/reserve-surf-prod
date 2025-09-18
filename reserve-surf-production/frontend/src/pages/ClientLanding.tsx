import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CalendarDays,
  Shield,
  Zap,
  Euro,
  CloudRain,
  Star,
  ChevronDown,
  Menu,
  X,
  Play,
  Users,
  CheckCircle,
  Waves,
  User,
  Wind,
  Anchor,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Smartphone,
  Globe,
} from "lucide-react";

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/client" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Waves className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-sans">
              ReserveSurf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Activities</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink className="flex flex-col space-y-1">
                        <div className="font-medium">Surfing Lessons</div>
                        <p className="text-sm text-muted-foreground">
                          Learn to surf with certified instructors
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="flex flex-col space-y-1">
                        <div className="font-medium">Kitesurfing</div>
                        <p className="text-sm text-muted-foreground">
                          Experience the thrill of kitesurfing
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="flex flex-col space-y-1">
                        <div className="font-medium">Diving</div>
                        <p className="text-sm text-muted-foreground">
                          Explore underwater adventures
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Locations
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    For Business
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Button className="hidden md:inline-flex">Login</Button>

            <Button className="md:hidden">Book Now</Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                Activities
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Locations
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                About Us
              </Button>
              <Link to="/" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  For Business
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-chart-2"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headlines */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 font-serif">
            Book Your Ocean Adventure in 60 Seconds
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto font-sans">
            Real-time conditions. Verified instructors. No hidden fees.
          </p>
        </div>

        {/* Search Widget */}
        <Card className="max-w-2xl mx-auto mb-6">
          <CardContent className="p-6">
            <Tabs defaultValue="kitesurf" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="surf"
                  className="flex items-center space-x-2"
                >
                  <Waves className="h-4 w-4" />
                  <span>Surf</span>
                </TabsTrigger>
                <TabsTrigger
                  value="kitesurf"
                  className="flex items-center space-x-2"
                >
                  <Wind className="h-4 w-4" />
                  <span>Kitesurf</span>
                </TabsTrigger>
                <TabsTrigger
                  value="dive"
                  className="flex items-center space-x-2"
                >
                  <Anchor className="h-4 w-4" />
                  <span>Dive</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="surf" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button className="flex-1">Check Availability</Button>
                </div>
              </TabsContent>

              <TabsContent value="kitesurf" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button className="flex-1">Check Availability</Button>
                </div>
              </TabsContent>

              <TabsContent value="dive" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button className="flex-1">Check Availability</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Availability Teaser */}
        <Alert className="max-w-md mx-auto bg-destructive/10 border-destructive/30 shadow-lg">
          <Zap className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive font-medium">
            Only 3 spots left today
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

// Trust Indicators Component
const TrustIndicators = () => {
  const indicators = [
    { icon: Shield, text: "All Instructors Certified" },
    { icon: CloudRain, text: "100% Refundable" },
    { icon: Zap, text: "Confirm in 60 Seconds" },
    { icon: Euro, text: "Transparent Pricing" },
  ];

  return (
    <section className="py-6 bg-muted border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-2 text-center"
            >
              <indicator.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground font-sans">
                {indicator.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Activities Section Component
const ActivitiesSection = () => {
  const activities = [
    {
      id: "surfing",
      title: "Surfing Lessons",
      description:
        "Learn to surf with our certified instructors in perfect conditions",
      image: "/api/placeholder/400/300",
      price: "€65",
      duration: "2 hours",
      features: [
        "Professional instructors",
        "All equipment included",
        "Insurance covered",
      ],
      skillLevels: ["Beginner", "Intermediate", "Advanced"],
      nextAvailable: "Today 2PM",
    },
    {
      id: "kitesurfing",
      title: "Kitesurfing",
      description: "Experience the thrill of kitesurfing with expert guidance",
      image: "/api/placeholder/400/300",
      price: "€85",
      duration: "3 hours",
      features: [
        "Certified kite instructors",
        "Premium kite equipment",
        "Safety gear included",
      ],
      skillLevels: ["Beginner", "Intermediate", "Advanced"],
      nextAvailable: "Tomorrow 10AM",
    },
    {
      id: "diving",
      title: "Diving Adventures",
      description: "Explore the underwater world with our diving experiences",
      image: "/api/placeholder/400/300",
      price: "€95",
      duration: "4 hours",
      features: [
        "PADI certified instructors",
        "Professional diving gear",
        "Underwater photography",
      ],
      skillLevels: ["Beginner", "Advanced"],
      nextAvailable: "Today 3PM",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 font-sans">
            WHAT WE OFFER
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            All equipment included. All levels welcome.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-primary to-accent"></div>
                <Badge className="absolute top-4 right-4 bg-card text-foreground">
                  From {activity.price}
                </Badge>
                <Badge variant="secondary" className="absolute bottom-4 left-4">
                  {activity.duration}
                </Badge>
              </div>

              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 text-foreground font-serif">
                  {activity.title}
                </CardTitle>
                <p className="text-muted-foreground mb-4 text-sm font-sans">
                  {activity.description}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {activity.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-chart-1 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Skill Levels */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.skillLevels.map((level) => (
                    <Badge key={level} variant="outline" className="text-xs">
                      {level}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Next: {activity.nextAvailable}
                  </span>
                  <Button variant="secondary" size="sm">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Calendar CTA */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
          >
            View Full Calendar →
          </Button>
        </div>
      </div>
    </section>
  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: CalendarDays,
      title: "Pick Your Time",
      description: "See real-time availability and choose your perfect slot",
    },
    {
      number: 2,
      icon: Users,
      title: "Enter Details",
      description: "Quick form, no account needed. Just basic info.",
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Secure Payment",
      description: "Apple Pay, Google Pay, or card. Safe and instant.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 font-sans">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Book in 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            No account needed. Pay securely.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border z-0">
                  <div className="absolute right-0 w-0 h-0 border-l-4 border-l-border border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}

              {/* Step Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 font-serif">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Demo */}
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-64 h-96 bg-foreground rounded-3xl p-2 mx-auto">
              <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-foreground font-sans">
                    Watch Demo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    60 second booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Instructor Showcase Component
const InstructorShowcase = () => {
  const instructors = [
    {
      id: 1,
      name: "Emma van der Berg",
      image: "/api/placeholder/200/200",
      specialties: ["Kitesurfing", "Beginners"],
      languages: ["Dutch", "English", "German"],
      experience: "8 years, 2000+ lessons",
      rating: 4.9,
      reviewCount: 127,
      certifications: ["IKO", "VDWS"],
      bio: "Emma is a passionate kitesurfing instructor with over 8 years of experience. She specializes in teaching beginners and has helped thousands of students take their first steps on the water.",
      fullBio:
        "Emma started kitesurfing at age 16 and quickly fell in love with the sport. After competing professionally for several years, she transitioned to teaching and has since become one of Amsterdam's most sought-after instructors. Her patient teaching style and infectious enthusiasm make learning both safe and fun.",
    },
    {
      id: 2,
      name: "Lars Andersen",
      image: "/api/placeholder/200/200",
      specialties: ["Surfing", "Advanced"],
      languages: ["Dutch", "English", "Danish"],
      experience: "12 years, 3500+ lessons",
      rating: 4.8,
      reviewCount: 203,
      certifications: ["ISA", "WSI"],
      bio: "Lars brings 12 years of surfing expertise to every lesson. Known for his technical precision and ability to help advanced surfers break through plateaus.",
      fullBio:
        "A former professional surfer from Denmark, Lars moved to Amsterdam to share his love for surfing with others. His methodical approach and deep understanding of wave dynamics make him the perfect instructor for those looking to master advanced techniques.",
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      image: "/api/placeholder/200/200",
      specialties: ["Diving", "Underwater Photography"],
      languages: ["Spanish", "English", "Dutch"],
      experience: "10 years, 1800+ dives",
      rating: 4.9,
      reviewCount: 156,
      certifications: ["PADI", "SSI"],
      bio: "Sofia is a certified dive master with a passion for underwater photography. She combines safety expertise with artistic vision to create unforgettable diving experiences.",
      fullBio:
        "Originally from Spain, Sofia discovered her love for diving in the Mediterranean. She's explored dive sites around the world and brings that global experience to every lesson. Her underwater photography skills add an extra dimension to diving adventures.",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 font-sans">
            MEET YOUR INSTRUCTORS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Learn from the Best
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Certified, experienced, multilingual
          </p>
        </div>

        {/* Instructor Carousel */}
        <Carousel className="max-w-5xl mx-auto mb-8">
          <CarouselContent>
            {instructors.map((instructor) => (
              <CarouselItem
                key={instructor.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    {/* Image Section */}
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarImage
                            src={instructor.image}
                            alt={instructor.name}
                          />
                          <AvatarFallback>
                            {instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {/* Certification Badges */}
                        <div className="absolute -bottom-1 -right-1 flex space-x-1">
                          {instructor.certifications.map((cert) => (
                            <Badge
                              key={cert}
                              variant="secondary"
                              className="text-xs px-1 py-0"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 font-serif">
                        {instructor.name}
                      </h3>

                      {/* Specialties */}
                      <div className="flex justify-center flex-wrap gap-2 mb-4">
                        {instructor.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className="text-xs px-2 py-1"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="flex justify-center flex-wrap gap-2 mb-4">
                        {instructor.languages.map((language, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs px-2 py-1"
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 font-sans">
                        {instructor.experience}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= instructor.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {instructor.rating} ({instructor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border mb-4"></div>

                    {/* Bio */}
                    <Collapsible>
                      <div className="text-sm text-muted-foreground text-center">
                        <p className="mb-3 font-sans leading-relaxed">
                          {instructor.bio}
                        </p>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                          >
                            Read more <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          <div className="border-t border-border pt-3">
                            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                              {instructor.fullBio}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Become Instructor CTA */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
          >
            Become an Instructor →
          </Button>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "/api/placeholder/40/40",
      date: "2 days ago",
      rating: 5,
      activity: "Surfing Lesson",
      review:
        "Amazing experience! Emma was such a patient instructor and I actually managed to stand up on my first lesson. The equipment was top quality and the whole booking process was super smooth.",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/api/placeholder/40/40",
      date: "1 week ago",
      rating: 5,
      activity: "Kitesurfing",
      review:
        "Best kitesurfing lesson I've ever had. Lars really knows his stuff and the conditions were perfect. Will definitely be booking again!",
      verified: true,
    },
    {
      id: 3,
      name: "Anna Johansson",
      avatar: "/api/placeholder/40/40",
      date: "2 weeks ago",
      rating: 5,
      activity: "Diving Adventure",
      review:
        "Sofia made my first diving experience unforgettable. The underwater photography was a bonus I wasn't expecting. Highly recommend for anyone wanting to try diving.",
      verified: true,
    },
    {
      id: 4,
      name: "Tom Wilson",
      avatar: "/api/placeholder/40/40",
      date: "3 weeks ago",
      rating: 5,
      activity: "Surfing Lesson",
      review:
        "Great value for money. All equipment included and no hidden fees like other places. The instructor was professional and made sure everyone felt safe.",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Zhang",
      avatar: "/api/placeholder/40/40",
      date: "1 month ago",
      rating: 4,
      activity: "Kitesurfing",
      review:
        "Really enjoyed the lesson. The only minor issue was the weather changed halfway through, but the instructor handled it well and we still had a great time.",
      verified: true,
    },
    {
      id: 6,
      name: "David Brown",
      avatar: "/api/placeholder/40/40",
      date: "1 month ago",
      rating: 5,
      activity: "Diving Adventure",
      review:
        "Incredible experience! The instructor was knowledgeable and the equipment was in excellent condition. Booking was easy and communication was clear.",
      verified: true,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 font-sans">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Join 5,000+ Happy Adventurers
          </h2>
          <div className="flex items-center justify-center space-x-1 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 text-chart-4 fill-current"
                />
              ))}
            </div>
            <span className="text-lg font-medium text-foreground ml-2 font-sans">
              4.8 average
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground font-sans">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.activity}
                  </Badge>
                </div>

                {/* Review Text */}
                <Collapsible>
                  <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                    {review.review.length > 120
                      ? `${review.review.substring(0, 120)}...`
                      : review.review}
                  </p>
                  {review.review.length > 120 && (
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0 h-auto mt-2"
                      >
                        Read more
                      </Button>
                    </CollapsibleTrigger>
                  )}
                  <CollapsibleContent className="mt-2">
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                      {review.review.substring(120)}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Review Platforms */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4 font-sans">
            Also featured on
          </p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <span className="text-lg font-semibold text-foreground">
              Google
            </span>
            <span className="text-lg font-semibold text-foreground">
              TripAdvisor
            </span>
            <span className="text-lg font-semibold text-foreground">
              Trustpilot
            </span>
            <span className="text-lg font-semibold text-foreground">
              Facebook
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const faqs = [
    {
      id: "booking-payment-1",
      question: "How do I book a lesson?",
      answer:
        "Booking is simple! Just select your preferred activity, choose a date and time, fill in your details, and pay securely. The whole process takes less than 60 seconds.",
    },
    {
      id: "booking-payment-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, Apple Pay, Google Pay, and PayPal. All payments are processed securely and there are no hidden fees.",
    },
    {
      id: "booking-payment-3",
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes! You can cancel or reschedule up to 24 hours before your lesson for a full refund. Weather-related cancellations are always fully refunded.",
    },
    {
      id: "safety-equipment-1",
      question: "Is all equipment included?",
      answer:
        "Absolutely! We provide all necessary equipment including wetsuits, boards, safety gear, and any specialized equipment needed for your chosen activity.",
    },
    {
      id: "safety-equipment-2",
      question: "Are your instructors certified?",
      answer:
        "Yes, all our instructors are certified by internationally recognized organizations (IKO, VDWS, ISA, PADI, etc.) and have extensive experience teaching students of all levels.",
    },
    {
      id: "weather-cancellations-1",
      question: "What happens if the weather is bad?",
      answer:
        "Safety is our top priority. If conditions are unsafe, we'll contact you to reschedule or provide a full refund. We monitor conditions in real-time.",
    },
    {
      id: "weather-cancellations-2",
      question: "How do you determine if conditions are safe?",
      answer:
        "Our experienced instructors assess wind, wave, and weather conditions multiple times daily. We follow strict safety protocols and never compromise on safety.",
    },
    {
      id: "experience-levels-1",
      question: "I'm a complete beginner. Is that okay?",
      answer:
        "Perfect! Most of our students are beginners. Our instructors specialize in teaching first-timers and will ensure you feel comfortable and safe throughout your lesson.",
    },
    {
      id: "experience-levels-2",
      question: "Do you offer lessons for advanced students?",
      answer:
        "Yes! We have instructors who specialize in advanced techniques and can help experienced students improve their skills and learn new tricks.",
    },
  ];

  const categories = [
    {
      id: "booking-payment",
      name: "Booking & Payment",
      icon: CreditCard,
      faqs: faqs.filter((faq) => faq.id.startsWith("booking-payment")),
    },
    {
      id: "safety-equipment",
      name: "Safety & Equipment",
      icon: Shield,
      faqs: faqs.filter((faq) => faq.id.startsWith("safety-equipment")),
    },
    {
      id: "weather-cancellations",
      name: "Weather & Cancellations",
      icon: CloudRain,
      faqs: faqs.filter((faq) => faq.id.startsWith("weather-cancellations")),
    },
    {
      id: "experience-levels",
      name: "Experience Levels",
      icon: Users,
      faqs: faqs.filter((faq) => faq.id.startsWith("experience-levels")),
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto">
            Everything you need to know about booking your ocean adventure.{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary font-medium"
            >
              Can't find your answer? Chat with us →
            </Button>
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground font-serif">
                  {category.name}
                </h3>
              </div>

              {/* Category FAQs */}
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <Card
                    key={faq.id}
                    className="border border-border/50 hover:border-border transition-colors"
                  >
                    <Accordion type="single" collapsible>
                      <AccordionItem value={faq.id} className="border-none">
                        <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline text-foreground font-sans [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground font-sans leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Waves className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-sans">ReserveSurf</span>
            </div>
            <p className="text-primary-foreground/70 mb-4 font-sans">
              Book ocean adventures in seconds. Real-time conditions, verified
              instructors, transparent pricing.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                About Us
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                How It Works
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                Safety Standards
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                Login
              </Button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Support</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                Help Center
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                Contact Us
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                Terms of Service
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground justify-start font-sans"
              >
                Privacy Policy
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">
              Get Ocean Updates
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground"
                required
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-primary-foreground/70 mt-2 font-sans">
              Weekly conditions & deals
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm font-sans">
              © 2025 ReserveSurf. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-foreground/70 font-sans">
                We accept:
              </span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <CreditCard className="h-3 w-3" />
                </div>
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <Smartphone className="h-3 w-3" />
                </div>
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <Globe className="h-3 w-3" />
                </div>
                <div className="w-8 h-5 bg-primary-foreground/20 rounded text-xs flex items-center justify-center">
                  <User className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-32 bg-background/10 border-primary-foreground/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="nl">Nederlands</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function ClientLanding() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrustIndicators />
      <ActivitiesSection />
      <HowItWorksSection />
      <InstructorShowcase />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
