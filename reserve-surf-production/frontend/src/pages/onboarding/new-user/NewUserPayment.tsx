import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, CreditCard, Shield, Lock, Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


export default function NewUserPayment() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [saveCard, setSaveCard] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Get user and cart data from session
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}')
  const cart = JSON.parse(sessionStorage.getItem('onboarding-cart') || '[]')

  // Updated sport data structure to match Browse component
  const sports = [
    {
      id: 'surfing',
      name: 'Surfing',
      classes: [
        { id: 1, title: "Beginner Surfing Fundamentals", price: 89, instructor: "Sarah Johnson", difficulty: "Beginner", duration: "2 hours" },
        { id: 2, title: "Intermediate Wave Riding", price: 109, instructor: "Mike Chen", difficulty: "Intermediate", duration: "2.5 hours" },
        { id: 3, title: "Kids Surf Club (7-12)", price: 55, instructor: "Emma Wilson", difficulty: "Kids", duration: "1 hour" }
      ]
    },
    {
      id: 'sup',
      name: 'Stand Up Paddleboard',
      classes: [
        { id: 4, title: "SUP Basics & Balance", price: 75, instructor: "Mike Torres", difficulty: "Beginner", duration: "1.5 hours" },
        { id: 5, title: "SUP Yoga Flow", price: 85, instructor: "Lisa Zhang", difficulty: "All Levels", duration: "1.5 hours" }
      ]
    },
    {
      id: 'windsurfing',
      name: 'Windsurfing',
      classes: [
        { id: 6, title: "Windsurfing Introduction", price: 120, instructor: "Carlos Martinez", difficulty: "Beginner", duration: "3 hours" },
        { id: 7, title: "Advanced Wind Techniques", price: 150, instructor: "Alex Chen", difficulty: "Advanced", duration: "3 hours" }
      ]
    },
    {
      id: 'kayaking',
      name: 'Kayaking',
      classes: [
        { id: 8, title: "Sunset Kayak Tour", price: 65, instructor: "Lisa Park", difficulty: "Beginner", duration: "2 hours" },
        { id: 9, title: "Sea Kayaking Adventure", price: 95, instructor: "Tom Roberts", difficulty: "Intermediate", duration: "4 hours" }
      ]
    }
  ]

  const getCartItems = () => {
    return cart.map((item: any) => {
      const sport = sports.find(s => s.id === item.sportId)
      const classData = sport?.classes.find(c => c.id === item.classId)
      if (classData && sport) {
        return {
          ...classData,
          sportName: sport.name,
          date: item.date,
          timeSlot: item.timeSlot,
          quantity: item.quantity
        }
      }
      return null
    }).filter(Boolean)
  }

  const getSubtotal = () => {
    return cart.reduce((sum: number, item: any) => {
      const sport = sports.find(s => s.id === item.sportId)
      const classData = sport?.classes.find(c => c.id === item.classId)
      return sum + (classData?.price || 0) * item.quantity
    }, 0)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    
    setIsProcessing(true)
    // Simulate payment processing - always succeeds in demo
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store booking confirmation
    const bookingData = {
      user: userData,
      items: getCartItems(),
      total: getSubtotal(),
      bookingId: `RS-${Date.now()}`,
      date: new Date().toISOString(),
      paymentMethod: paymentMethod,
      last4: cardNumber ? cardNumber.slice(-4) : '****'
    }
    
    sessionStorage.setItem('booking', JSON.stringify(bookingData))
    
    // Clear cart after successful payment
    sessionStorage.removeItem('onboarding-cart')
    
    navigate('/onboarding/new-user/confirmation')
  }

  const cartItems = getCartItems()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500/10 text-green-600 border-green-200'
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
      case 'advanced': return 'bg-red-500/10 text-red-600 border-red-200'
      case 'kids': return 'bg-purple-500/10 text-purple-600 border-purple-200'
      default: return 'bg-blue-500/10 text-blue-600 border-blue-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/onboarding/new-user/auth')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Payment & Review</h1>
            <p className="text-muted-foreground">Review your booking and complete payment</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your selected classes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-primary">{item.sportName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge className={getDifficultyColor(item.difficulty)}>
                            {item.difficulty}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {item.instructor}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.timeSlot}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Duration: {item.duration}
                          </div>
                          {item.quantity > 1 && (
                            <p className="font-medium">Quantity: {item.quantity} participants</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price * item.quantity}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">${item.price} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select your payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afterpay" id="afterpay" />
                        <Label htmlFor="afterpay" className="cursor-pointer">
                          Afterpay
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="4242 4242 4242 4242"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">Use any test card number (e.g., 4242 4242 4242 4242)</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="12/25"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Any future date</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Any 3 digits</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="save-card"
                            checked={saveCard}
                            onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                          />
                          <Label 
                            htmlFor="save-card" 
                            className="text-sm font-normal cursor-pointer"
                          >
                            Save card for future bookings
                          </Label>
                        </div>
                      </div>
                    )}

                    {paymentMethod !== 'card' && (
                      <Alert>
                        <AlertDescription>
                          You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Afterpay'} to complete your payment.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                          required
                        />
                        <Label 
                          htmlFor="terms" 
                          className="text-sm font-normal cursor-pointer"
                        >
                          I agree to the Terms of Service, Cancellation Policy, and have read the Safety Guidelines
                        </Label>
                      </div>

                      <Alert>
                        <Shield className="w-4 h-4" />
                        <AlertDescription>
                          This is a demo. No real payment will be processed.
                        </AlertDescription>
                      </Alert>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={!agreeTerms || isProcessing}
                      >
                        {isProcessing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Complete Booking (${getSubtotal()})
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Total Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Processing Fee</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription className="text-sm">
                      Free cancellation up to 24 hours before your class
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Secure Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span>PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}