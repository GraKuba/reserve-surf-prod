import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Trash2, Plus, Minus, ArrowLeft, ShoppingCart, Tag, User, Waves, Wind, Activity, Anchor } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Sport and class data - matches Browse component
const sports = [
  {
    id: 'surfing',
    name: 'Surfing',
    icon: Waves,
    classes: [
      {
        id: 1,
        title: "Beginner Surfing Fundamentals",
        instructor: "Sarah Johnson",
        difficulty: "Beginner",
        duration: "2 hours",
        price: 89,
        rating: 4.8,
        maxParticipants: 8
      },
      {
        id: 2,
        title: "Intermediate Wave Riding",
        instructor: "Mike Chen",
        difficulty: "Intermediate",
        duration: "2.5 hours",
        price: 109,
        rating: 4.9,
        maxParticipants: 6
      },
      {
        id: 3,
        title: "Kids Surf Club (7-12)",
        instructor: "Emma Wilson",
        difficulty: "Kids",
        duration: "1 hour",
        price: 55,
        rating: 5.0,
        maxParticipants: 12
      }
    ]
  },
  {
    id: 'sup',
    name: 'Stand Up Paddleboard',
    icon: Activity,
    classes: [
      {
        id: 4,
        title: "SUP Basics & Balance",
        instructor: "Mike Torres",
        difficulty: "Beginner",
        duration: "1.5 hours",
        price: 75,
        rating: 4.9,
        maxParticipants: 10
      },
      {
        id: 5,
        title: "SUP Yoga Flow",
        instructor: "Lisa Zhang",
        difficulty: "All Levels",
        duration: "1.5 hours",
        price: 85,
        rating: 4.8,
        maxParticipants: 8
      }
    ]
  },
  {
    id: 'windsurfing',
    name: 'Windsurfing',
    icon: Wind,
    classes: [
      {
        id: 6,
        title: "Windsurfing Introduction",
        instructor: "Carlos Martinez",
        difficulty: "Beginner",
        duration: "3 hours",
        price: 120,
        rating: 4.7,
        maxParticipants: 6
      },
      {
        id: 7,
        title: "Advanced Wind Techniques",
        instructor: "Alex Chen",
        difficulty: "Advanced",
        duration: "3 hours",
        price: 150,
        rating: 4.9,
        maxParticipants: 4
      }
    ]
  },
  {
    id: 'kayaking',
    name: 'Kayaking',
    icon: Anchor,
    classes: [
      {
        id: 8,
        title: "Sunset Kayak Tour",
        instructor: "Lisa Park",
        difficulty: "Beginner",
        duration: "2 hours",
        price: 65,
        rating: 4.8,
        maxParticipants: 16
      },
      {
        id: 9,
        title: "Sea Kayaking Adventure",
        instructor: "Tom Roberts",
        difficulty: "Intermediate",
        duration: "4 hours",
        price: 95,
        rating: 4.9,
        maxParticipants: 8
      }
    ]
  }
]

interface CartItem {
  classId: number
  sportId: string
  date: string
  timeSlot: string
  quantity: number
}

export default function NewUserCart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const isInitialMount = useRef(true)

  // Load cart from session storage
  useEffect(() => {
    const savedCart = sessionStorage.getItem('onboarding-cart')
    console.log('Cart: Loading from sessionStorage:', savedCart)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        console.log('Cart: Parsed cart:', parsedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error('Cart: Error parsing:', error)
        setCart([])
      }
    } else {
      console.log('Cart: No saved cart found')
      setCart([])
    }
  }, [])

  // Save cart to session storage when it changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      console.log('Cart: Skipping initial save')
      return
    }
    console.log('Cart: Saving to sessionStorage:', cart)
    sessionStorage.setItem('onboarding-cart', JSON.stringify(cart))
  }, [cart])

  const getClassDetails = (sportId: string, classId: number) => {
    const sport = sports.find(s => s.id === sportId)
    return sport?.classes.find(c => c.id === classId)
  }

  const getSportDetails = (sportId: string) => {
    return sports.find(s => s.id === sportId)
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(index)
    } else {
      const item = cart[index]
      const classData = getClassDetails(item.sportId, item.classId)
      if (classData && newQuantity <= classData.maxParticipants) {
        setCart(prev => prev.map((cartItem, i) => 
          i === index 
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        ))
      }
    }
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const getSubtotal = () => {
    return cart.reduce((sum, item) => {
      const classData = getClassDetails(item.sportId, item.classId)
      return sum + (classData?.price || 0) * item.quantity
    }, 0)
  }

  const getDiscountAmount = () => {
    return getSubtotal() * (discount / 100)
  }

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount()
  }

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toUpperCase() === 'SURF20') {
      setDiscount(20)
      setPromoApplied(true)
    } else if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(10)
      setPromoApplied(true)
    } else {
      setDiscount(0)
      setPromoApplied(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500/10 text-green-600 border-green-200'
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
      case 'advanced': return 'bg-red-500/10 text-red-600 border-red-200'
      case 'kids': return 'bg-purple-500/10 text-purple-600 border-purple-200'
      default: return 'bg-blue-500/10 text-blue-600 border-blue-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle>Your cart is empty</CardTitle>
              <CardDescription>Browse our water sports classes and add some to your cart</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button onClick={() => navigate('/onboarding/new-user/browse')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Classes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/onboarding/new-user/browse')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <p className="text-muted-foreground">Review your selected classes before checkout</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => {
                const classData = getClassDetails(item.sportId, item.classId)
                const sportData = getSportDetails(item.sportId)
                const Icon = sportData?.icon || Activity
                
                if (!classData || !sportData) return null
                
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">{sportData.name}</span>
                              </div>
                              <h3 className="font-semibold">{classData.title}</h3>
                            </div>
                            <Badge className={getDifficultyColor(classData.difficulty)}>
                              {classData.difficulty}
                            </Badge>
                          </div>

                          <div className="grid gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{classData.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(item.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{item.timeSlot} • {classData.duration}</span>
                            </div>
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                                className="w-20 text-center"
                                min="1"
                                max={classData.maxParticipants}
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                disabled={item.quantity >= classData.maxParticipants}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold">${classData.price * item.quantity}</p>
                              <p className="text-sm text-muted-foreground">
                                ${classData.price} x {item.quantity}
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(index)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button
                        variant="secondary"
                        onClick={applyPromoCode}
                      >
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600">
                        Promo code applied: {discount}% off
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${getDiscountAmount().toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      You'll create your account at checkout. No payment will be processed in this demo.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => navigate('/onboarding/new-user/auth')}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}