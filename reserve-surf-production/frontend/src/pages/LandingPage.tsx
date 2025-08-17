import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  MapPin,
  Waves,
  Wind,
  Thermometer,
  AlertTriangle,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function LandingPage() {
  const [selectedActivity, setSelectedActivity] = useState("surf");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock data for time slots
  const timeSlots = [
    { time: "08:00", availability: "available", price: "€45", spots: 8 },
    { time: "10:00", availability: "limited", price: "€45", spots: 2 },
    { time: "12:00", availability: "full", price: "€45", spots: 0 },
    { time: "14:00", availability: "available", price: "€50", spots: 6 },
    { time: "16:00", availability: "available", price: "€50", spots: 4 },
    { time: "18:00", availability: "limited", price: "€55", spots: 1 },
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "outline";
      case "limited":
        return "secondary";
      case "full":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold text-black">
                ReserveSurf
              </Link>

              {/* Navigation Menu */}
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Activities</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-2 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/surf" className="flex flex-col gap-1">
                              <div className="font-medium">Surf Lessons</div>
                              <div className="text-muted-foreground text-sm">
                                Learn to surf with certified instructors
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/kite" className="flex flex-col gap-1">
                              <div className="font-medium">Kitesurfing</div>
                              <div className="text-muted-foreground text-sm">
                                Experience the thrill of kitesurfing
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/dive" className="flex flex-col gap-1">
                              <div className="font-medium">Diving</div>
                              <div className="text-muted-foreground text-sm">
                                Explore underwater adventures
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={NavigationMenuTriggerStyle()}
                    >
                      <Link to="/about">About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Help</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/faq" className="flex items-center gap-2">
                              <HelpCircle className="h-4 w-4" />
                              FAQ
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/contact"
                              className="flex items-center gap-2"
                            >
                              <Settings className="h-4 w-4" />
                              Contact
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <Waves className="h-4 w-4" />
                2-3ft Clean
              </Badge>
              <Link to="/operator/login">
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  Operator Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl">Book Your Session</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Ericeira, Portugal</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <ToggleGroup
                  type="single"
                  value={selectedActivity}
                  onValueChange={(value) => value && setSelectedActivity(value)}
                >
                  <ToggleGroupItem value="surf">Surf</ToggleGroupItem>
                  <ToggleGroupItem value="kite">Kite</ToggleGroupItem>
                  <ToggleGroupItem value="dive">Dive</ToggleGroupItem>
                </ToggleGroup>
                <Badge variant="outline">8 spots available today</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar and Time Slots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <p className="text-muted-foreground">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {timeSlots.map((slot) => (
                    <Card
                      key={slot.time}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedSlot === slot.time ? "ring-2 ring-black" : ""
                      } ${
                        slot.availability === "full"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        slot.availability !== "full" &&
                        setSelectedSlot(slot.time)
                      }
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {slot.time}
                          </div>
                          <Badge
                            variant={
                              getAvailabilityColor(slot.availability) as any
                            }
                            className="mt-2 mb-2"
                          >
                            {slot.availability === "available"
                              ? `${slot.spots} spots`
                              : slot.availability === "limited"
                              ? `${slot.spots} left`
                              : "Full"}
                          </Badge>
                          <div className="text-sm font-medium">
                            {slot.price}
                          </div>
                          {slot.availability !== "full" && (
                            <Button
                              size="sm"
                              className="mt-2 w-full"
                              variant="outline"
                            >
                              Select
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded"></div>
                    <span>Limited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded"></div>
                    <span>Full</span>
                  </div>
                </div>

                {selectedSlot && (
                  <div className="mt-6 pt-6 border-t">
                    <Link to="/booking/details">
                      <Button className="w-full" size="lg">
                        Continue to Booking
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Conditions Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Ocean Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wave Height</span>
                  <Badge variant="outline">2-3ft</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wind</span>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    <Badge variant="outline">5-10 kts NE</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Water Temp</span>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    <Badge variant="outline">18°C</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium">Tide Times</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Low: 06:24 (0.8m)</span>
                      <span>High: 12:45 (3.2m)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low: 18:56 (0.6m)</span>
                      <span>High: 01:12 (3.4m)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Alert */}
            <Card className="border-gray-300 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Weather Notice
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      Strong offshore winds expected after 4 PM. Earlier
                      sessions recommended.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
