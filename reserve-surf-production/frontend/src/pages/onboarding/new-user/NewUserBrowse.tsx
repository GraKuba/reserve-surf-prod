import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Users,
  ShoppingCart,
  ChevronRight,
  Star,
  User,
  Waves,
  Wind,
  Activity,
  Anchor,
  ArrowRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Sport categories
const sports = [
  {
    id: "surfing",
    name: "Surfing",
    icon: Waves,
    description: "Ride the waves and feel the ocean's power",
    popular: true,
    classes: [
      {
        id: 1,
        title: "Beginner Surfing Fundamentals",
        description:
          "Perfect introduction to surfing. Learn ocean safety, board handling, and catching your first waves.",
        instructor: "Sarah Johnson",
        difficulty: "Beginner",
        duration: "2 hours",
        price: 89,
        rating: 4.8,
        reviews: 124,
        maxParticipants: 8,
        equipment: "Board and wetsuit included",
      },
      {
        id: 2,
        title: "Intermediate Wave Riding",
        description:
          "Take your surfing to the next level with advanced techniques and wave selection.",
        instructor: "Mike Chen",
        difficulty: "Intermediate",
        duration: "2.5 hours",
        price: 109,
        rating: 4.9,
        reviews: 89,
        maxParticipants: 6,
        equipment: "Board rental available",
      },
      {
        id: 3,
        title: "Kids Surf Club (7-12)",
        description:
          "Fun and safe surfing lessons designed specifically for young adventurers.",
        instructor: "Emma Wilson",
        difficulty: "Kids",
        duration: "1 hour",
        price: 55,
        rating: 5.0,
        reviews: 156,
        maxParticipants: 12,
        equipment: "All equipment provided",
      },
    ],
  },
  {
    id: "sup",
    name: "Stand Up Paddleboard",
    icon: Activity,
    description: "Glide across calm waters with perfect balance",
    popular: true,
    classes: [
      {
        id: 4,
        title: "SUP Basics & Balance",
        description:
          "Learn the fundamentals of stand up paddleboarding in calm, protected waters.",
        instructor: "Mike Torres",
        difficulty: "Beginner",
        duration: "1.5 hours",
        price: 75,
        rating: 4.9,
        reviews: 203,
        maxParticipants: 10,
        equipment: "Board, paddle, and PFD included",
      },
      {
        id: 5,
        title: "SUP Yoga Flow",
        description:
          "Combine yoga and paddleboarding for the ultimate mind-body water experience.",
        instructor: "Lisa Zhang",
        difficulty: "All Levels",
        duration: "1.5 hours",
        price: 85,
        rating: 4.8,
        reviews: 97,
        maxParticipants: 8,
        equipment: "Specialized yoga SUP boards provided",
      },
    ],
  },
  {
    id: "windsurfing",
    name: "Windsurfing",
    icon: Wind,
    description: "Harness the wind for an exhilarating ride",
    classes: [
      {
        id: 6,
        title: "Windsurfing Introduction",
        description:
          "Master the basics of windsurfing including rigging, launching, and basic sailing.",
        instructor: "Carlos Martinez",
        difficulty: "Beginner",
        duration: "3 hours",
        price: 120,
        rating: 4.7,
        reviews: 78,
        maxParticipants: 6,
        equipment: "Full rig and wetsuit included",
      },
      {
        id: 7,
        title: "Advanced Wind Techniques",
        description:
          "Learn jibing, water starts, and harness techniques for experienced windsurfers.",
        instructor: "Alex Chen",
        difficulty: "Advanced",
        duration: "3 hours",
        price: 150,
        rating: 4.9,
        reviews: 45,
        maxParticipants: 4,
        equipment: "Advanced equipment available",
      },
    ],
  },
  {
    id: "kayaking",
    name: "Kayaking",
    icon: Anchor,
    description: "Explore waterways at your own pace",
    classes: [
      {
        id: 8,
        title: "Sunset Kayak Tour",
        description:
          "Peaceful evening paddle with stunning sunset views and wildlife spotting.",
        instructor: "Lisa Park",
        difficulty: "Beginner",
        duration: "2 hours",
        price: 65,
        rating: 4.8,
        reviews: 312,
        maxParticipants: 16,
        equipment: "Kayak, paddle, and PFD provided",
      },
      {
        id: 9,
        title: "Sea Kayaking Adventure",
        description:
          "Explore coastal caves and hidden beaches on this guided sea kayaking tour.",
        instructor: "Tom Roberts",
        difficulty: "Intermediate",
        duration: "4 hours",
        price: 95,
        rating: 4.9,
        reviews: 167,
        maxParticipants: 8,
        equipment: "Sea kayaks and safety gear included",
      },
    ],
  },
];

// Available time slots
const timeSlots = [
  { id: 1, time: "6:00 AM", label: "Early Morning" },
  { id: 2, time: "7:00 AM", label: "Morning" },
  { id: 3, time: "9:00 AM", label: "Morning" },
  { id: 4, time: "10:00 AM", label: "Late Morning" },
  { id: 5, time: "12:00 PM", label: "Noon" },
  { id: 6, time: "2:00 PM", label: "Afternoon" },
  { id: 7, time: "4:00 PM", label: "Late Afternoon" },
  { id: 8, time: "5:30 PM", label: "Evening" },
];

interface CartItem {
  classId: number;
  sportId: string;
  date: string;
  timeSlot: string;
  quantity: number;
}

export default function NewUserBrowse() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<
    "sport" | "class" | "datetime"
  >("sport");
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const isInitialMount = useRef(true);

  // Load cart from session storage on mount
  useEffect(() => {
    const savedCart = sessionStorage.getItem("onboarding-cart");
    console.log("Browse: Loading cart from sessionStorage:", savedCart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Browse: Parsed cart:", parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Browse: Error parsing cart:", error);
        setCart([]);
      }
    } else {
      console.log("Browse: No cart in sessionStorage, initializing empty");
      setCart([]);
    }
  }, []);

  // Save cart to session storage whenever it changes (but not on initial load)
  useEffect(() => {
    // Skip the initial render to avoid overwriting existing cart
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log("Browse: Skipping initial save to sessionStorage");
      return;
    }
    console.log("Browse: Saving cart to sessionStorage:", cart);
    sessionStorage.setItem("onboarding-cart", JSON.stringify(cart));
  }, [cart]);

  const handleSportSelect = (sportId: string) => {
    setSelectedSport(sportId);
    setCurrentStep("class");
  };

  const handleClassSelect = (classId: number) => {
    setSelectedClass(classId);
    setCurrentStep("datetime");
  };

  const handleAddToCart = () => {
    if (selectedSport && selectedClass && selectedDate && selectedTime) {
      const newItem: CartItem = {
        classId: selectedClass,
        sportId: selectedSport,
        date: selectedDate,
        timeSlot: selectedTime,
        quantity: quantity,
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      // Also update sessionStorage immediately
      sessionStorage.setItem("onboarding-cart", JSON.stringify(updatedCart));

      // Show success feedback (you can add a toast here if needed)
      console.log("Added to cart:", newItem);
      console.log("Cart now has", updatedCart.length, "items");

      // Reset selections for next item
      setSelectedSport(null);
      setSelectedClass(null);
      setSelectedDate("");
      setSelectedTime("");
      setQuantity(1);

      return true; // Return success
    }
    return false; // Return failure
  };

  const getSelectedSport = () => sports.find((s) => s.id === selectedSport);
  const getSelectedClass = () => {
    const sport = getSelectedSport();
    return sport?.classes.find((c) => c.id === selectedClass);
  };

  const getTotalCartItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const sport = sports.find((s) => s.id === item.sportId);
      const classData = sport?.classes.find((c) => c.id === item.classId);
      return sum + (classData?.price || 0) * item.quantity;
    }, 0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      case "advanced":
        return "bg-red-500/10 text-red-600 border-red-200";
      case "kids":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-200";
    }
  };

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header with Progress */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Book Your Water Sports Experience
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={currentStep === "sport" ? "default" : "secondary"}
                  >
                    1. Choose Sport
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <Badge
                    variant={currentStep === "class" ? "default" : "secondary"}
                  >
                    2. Select Class
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <Badge
                    variant={
                      currentStep === "datetime" ? "default" : "secondary"
                    }
                  >
                    3. Pick Date & Time
                  </Badge>
                </div>
              </div>

              {/* Cart Widget */}
              {getTotalCartItems() > 0 && (
                <Button
                  onClick={() => navigate("/onboarding/new-user/cart")}
                  className="relative"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View Cart (${getTotalPrice()})
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                    {getTotalCartItems()}
                  </Badge>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Step 1: Sport Selection */}
          {currentStep === "sport" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  What would you like to try?
                </h2>
                <p className="text-muted-foreground">
                  Choose from our range of water sports activities
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {sports.map((sport) => {
                  const Icon = sport.icon;
                  return (
                    <Card
                      key={sport.id}
                      className={cn(
                        "cursor-pointer hover:shadow-lg transition-all border-2",
                        selectedSport === sport.id &&
                          "ring-2 ring-primary border-primary"
                      )}
                      onClick={() => handleSportSelect(sport.id)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-sm">
                              <Icon className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl font-bold">
                                {sport.name}
                              </CardTitle>
                              {sport.popular && (
                                <Badge className="mt-2 bg-orange-100 text-orange-700 border-orange-200 font-semibold">
                                  Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-4" />
                        <p className="text-foreground/80 mb-6 text-base leading-relaxed">
                          {sport.description}
                        </p>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm font-semibold text-foreground/70">
                            {sport.classes.length} classes available
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="font-semibold hover:bg-primary/10"
                          >
                            View Classes
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {cart.length > 0 && (
                <Alert>
                  <ShoppingCart className="w-4 h-4" />
                  <AlertDescription>
                    You have {getTotalCartItems()} item(s) in your cart. Add
                    more or proceed to checkout.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step 2: Class Selection */}
          {currentStep === "class" && selectedSport && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Select Your {getSelectedSport()?.name} Class
                  </h2>
                  <p className="text-muted-foreground">
                    Choose the class that matches your skill level
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setCurrentStep("sport")}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Change Sport
                </Button>
              </div>

              <RadioGroup
                value={selectedClass?.toString()}
                onValueChange={(value) => handleClassSelect(parseInt(value))}
              >
                <div className="grid gap-4">
                  {getSelectedSport()?.classes.map((cls) => (
                    <Card
                      key={cls.id}
                      className={cn(
                        "cursor-pointer hover:shadow-md transition-all",
                        selectedClass === cls.id && "ring-2 ring-primary"
                      )}
                    >
                      <CardContent className="p-0">
                        <div className="flex gap-4 p-6">
                          <RadioGroupItem
                            value={cls.id.toString()}
                            id={`class-${cls.id}`}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={`class-${cls.id}`}
                              className="cursor-pointer"
                            >
                              {/* Header with Title and Price */}
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                  <h3 className="font-bold text-xl mb-2">
                                    {cls.title}
                                  </h3>
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <Badge
                                      className={cn(
                                        getDifficultyColor(cls.difficulty),
                                        "font-semibold"
                                      )}
                                    >
                                      {cls.difficulty}
                                    </Badge>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                      <span className="text-sm font-bold text-yellow-700">
                                        {cls.rating}
                                      </span>
                                      <span className="text-sm text-yellow-600">
                                        ({cls.reviews})
                                      </span>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="font-medium"
                                    >
                                      <User className="w-3 h-3 mr-1" />
                                      {cls.instructor}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right ml-4">
                                  <div className="bg-primary/10 px-3 py-2 rounded-lg">
                                    <p className="text-2xl font-bold text-primary">
                                      ${cls.price}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      per person
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-foreground leading-relaxed mb-4">
                                {cls.description}
                              </p>

                              <Separator className="my-4" />

                              {/* Key Details Grid */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Duration
                                    </p>
                                    <p className="text-sm font-semibold">
                                      {cls.duration}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Group Size
                                    </p>
                                    <p className="text-sm font-semibold">
                                      Max {cls.maxParticipants}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Equipment Badge - Compact */}
                              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-950/30 rounded-full border border-green-300 dark:border-green-700">
                                <Activity className="w-4 h-4 text-green-700 dark:text-green-400 flex-shrink-0" />
                                <span className="text-xs font-semibold text-green-800 dark:text-green-300">
                                  {cls.equipment}
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep("datetime")}
                  disabled={!selectedClass}
                >
                  Continue to Date & Time
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {currentStep === "datetime" && selectedClass && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Choose Your Date & Time
                  </h2>
                  <p className="text-muted-foreground">
                    {getSelectedClass()?.title} • {getSelectedSport()?.name}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setCurrentStep("class")}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Change Class
                </Button>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Date Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedDate}
                      onValueChange={setSelectedDate}
                    >
                      <div className="grid gap-2">
                        {getAvailableDates()
                          .slice(0, 7)
                          .map((date) => {
                            const dateObj = new Date(date);
                            const dayName = dateObj.toLocaleDateString(
                              "en-US",
                              { weekday: "short" }
                            );
                            const monthDay = dateObj.toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            );
                            const isToday =
                              new Date().toDateString() ===
                              dateObj.toDateString();

                            return (
                              <div
                                key={date}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem value={date} id={date} />
                                <Label
                                  htmlFor={date}
                                  className="flex-1 cursor-pointer p-2 rounded hover:bg-muted"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                      {dayName}, {monthDay}
                                    </span>
                                    {isToday && (
                                      <Badge variant="secondary">Today</Badge>
                                    )}
                                  </div>
                                </Label>
                              </div>
                            );
                          })}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Time Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Select Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                    >
                      <div className="grid gap-2">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={slot.time}
                              id={`time-${slot.id}`}
                            />
                            <Label
                              htmlFor={`time-${slot.id}`}
                              className="flex-1 cursor-pointer p-2 rounded hover:bg-muted"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{slot.time}</span>
                                <span className="text-sm text-muted-foreground">
                                  {slot.label}
                                </span>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Quantity Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Number of Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setQuantity(
                          Math.min(
                            getSelectedClass()?.maxParticipants || 8,
                            quantity + 1
                          )
                        )
                      }
                    >
                      +
                    </Button>
                    <div className="ml-4 text-sm text-muted-foreground">
                      <p>
                        Max {getSelectedClass()?.maxParticipants} participants
                      </p>
                      <p className="font-semibold">
                        ${(getSelectedClass()?.price || 0) * quantity} total
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary and Add to Cart */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold mb-1">Booking Summary</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>{getSelectedClass()?.title}</p>
                        <p>
                          {selectedDate &&
                            new Date(selectedDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                        </p>
                        <p>{selectedTime}</p>
                        <p>{quantity} participant(s)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">
                        ${(getSelectedClass()?.price || 0) * quantity}
                      </p>
                      <Button
                        className="mt-2"
                        size="lg"
                        onClick={() => {
                          const success = handleAddToCart();
                          if (success) {
                            alert("Item added to cart!");
                            setCurrentStep("sport");
                          }
                        }}
                        disabled={!selectedDate || !selectedTime}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping or Checkout */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    const success = handleAddToCart();
                    if (success) {
                      setCurrentStep("sport");
                    }
                  }}
                  disabled={!selectedDate || !selectedTime}
                >
                  Add & Continue Shopping
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    const success = handleAddToCart();
                    if (success) {
                      navigate("/onboarding/new-user/cart");
                    }
                  }}
                  disabled={!selectedDate || !selectedTime}
                >
                  Add & Go to Cart
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
