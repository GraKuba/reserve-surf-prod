import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, Lock, Shield, Building2, Tag,
  Calendar, Clock, MapPin, User, ArrowRight,
  CheckCircle, Info
} from 'lucide-react'
import type { PartnerBookingData } from '@/components/partner/PartnerDataHandler'

export default function PartnerPayment() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<PartnerBookingData | null>(null)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    name: 'John Smith',
    expiry: '12/25',
    cvv: '123',
    saveCard: true
  })

  useEffect(() => {
    // Load partner booking data
    const savedData = sessionStorage.getItem('partner-booking')
    if (savedData) {
      setBookingData(JSON.parse(savedData))
    } else {
      navigate('/onboarding')
    }
  }, [navigate])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Store payment confirmation
    sessionStorage.setItem('partner-payment', JSON.stringify({
      method: paymentMethod,
      amount: finalPrice,
      timestamp: new Date().toISOString(),
      bookingId: `BK${Date.now()}`
    }))

    // Navigate to confirmation
    navigate('/onboarding/partner/confirmation')
  }

  if (!bookingData) {
    return null
  }

  const finalPrice = bookingData.selectedClass.price - (bookingData.selectedClass.partnerDiscount || 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Partner Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary border-b-2 border-primary">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium">Booking through</p>
                  <p className="font-bold text-sm text-white">{bookingData.partnerName}</p>
                </div>
              </div>
              <Badge className="gap-1 bg-white/20 backdrop-blur-sm text-white border-white/30">
                <Lock className="w-3 h-3" />
                Secure Checkout
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>
                    Complete your booking with secure payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-3">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <RadioGroupItem value="card" id="card" className="peer sr-only" />
                            <Label
                              htmlFor="card"
                              className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/5"
                            >
                              <CreditCard className="w-6 h-6 mb-2" />
                              <span>Credit Card</span>
                            </Label>
                          </div>
                          <div className="relative">
                            <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/5"
                            >
                              <div className="w-6 h-6 mb-2 bg-blue-600 rounded" />
                              <span>PayPal</span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === 'card' && (
                      <>
                        <Separator />
                        
                        {/* Card Details */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                              <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="saveCard"
                              checked={cardDetails.saveCard}
                              onChange={(e) => setCardDetails({...cardDetails, saveCard: e.target.checked})}
                              className="rounded"
                            />
                            <Label htmlFor="saveCard" className="text-sm">
                              Save card for future bookings
                            </Label>
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === 'paypal' && (
                      <Alert>
                        <Info className="w-4 h-4" />
                        <AlertDescription>
                          You'll be redirected to PayPal to complete your payment securely.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Separator />

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        'Processing Payment...'
                      ) : (
                        <>
                          Pay ${finalPrice} & Complete Booking
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    {/* Security Notice */}
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>SSL Encrypted</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span>PCI Compliant</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Class Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">{bookingData.selectedClass.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(bookingData.selectedClass.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{bookingData.selectedClass.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{bookingData.selectedClass.instructor.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{bookingData.selectedClass.location.name}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Class Price</span>
                      <span>${bookingData.selectedClass.price}</span>
                    </div>
                    {bookingData.selectedClass.partnerDiscount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {bookingData.partnerName} Discount
                        </span>
                        <span>-${bookingData.selectedClass.partnerDiscount}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Due</span>
                      <span className="text-xl text-primary">${finalPrice}</span>
                    </div>
                  </div>

                  {/* Partner Benefits */}
                  <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-sm">
                      <strong>Partner Benefits Applied!</strong>
                      <ul className="mt-2 space-y-1 text-xs">
                        <li>• ${bookingData.selectedClass.partnerDiscount} discount applied</li>
                        <li>• Priority booking confirmation</li>
                        <li>• Linked account benefits</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}