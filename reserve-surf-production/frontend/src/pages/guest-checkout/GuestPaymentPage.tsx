import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Smartphone, 
  Gift, 
  MapPin, 
  Lock,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  type: 'apple_pay' | 'google_pay' | 'paypal' | 'credit_card' | 'gift_certificate';
  name: string;
  icon: React.ReactNode;
  available: boolean;
}

const GuestPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId');
  
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    zip: ''
  });
  const [giftCode, setGiftCode] = useState('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'apple_pay',
      type: 'apple_pay',
      name: 'Apple Pay',
      icon: <Smartphone className="h-5 w-5" />,
      available: (window as any).ApplePaySession?.canMakePayments?.() || false
    },
    {
      id: 'google_pay',
      type: 'google_pay',
      name: 'Google Pay',
      icon: <Smartphone className="h-5 w-5" />,
      available: true // Check for actual Google Pay availability
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      icon: <CreditCard className="h-5 w-5" />,
      available: true
    },
    {
      id: 'credit_card',
      type: 'credit_card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      available: true
    },
    {
      id: 'gift_certificate',
      type: 'gift_certificate',
      name: 'Gift Certificate',
      icon: <Gift className="h-5 w-5" />,
      available: true
    }
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate booking code
      const bookingCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Store booking details
      const guestData = sessionStorage.getItem('guestCheckoutData');
      const bookingDetails = {
        bookingCode,
        classId,
        guestData: guestData ? JSON.parse(guestData) : null,
        paymentMethod: selectedMethod,
        timestamp: new Date().toISOString()
      };
      
      sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
      
      // Navigate to confirmation
      navigate(`/guest-checkout/confirmation?code=${bookingCode}`);
    } catch (error) {
      console.error('Payment failed:', error);
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payment</h1>
        <p className="text-muted-foreground">
          Complete your booking with secure payment
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedMethod}
                onValueChange={setSelectedMethod}
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors',
                      selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-border',
                      !method.available && 'opacity-50 cursor-not-allowed'
                    )}
                    onClick={() => method.available && setSelectedMethod(method.id)}
                  >
                    <RadioGroupItem
                      value={method.id}
                      disabled={!method.available}
                    />
                    <div className="flex items-center gap-3 flex-1">
                      {method.icon}
                      <span className="font-medium">{method.name}</span>
                    </div>
                    {method.id === 'apple_pay' && method.available && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
              </RadioGroup>

              {selectedMethod === 'credit_card' && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          number: formatCardNumber(e.target.value)
                        })}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            expiry: formatExpiry(e.target.value)
                          })}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, '')
                          })}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input
                        id="zip"
                        placeholder="12345"
                        value={cardDetails.zip}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          zip: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'gift_certificate' && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div>
                    <Label htmlFor="gift-code">Gift Certificate Code</Label>
                    <Input
                      id="gift-code"
                      placeholder="Enter your gift code"
                      value={giftCode}
                      onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Check Balance
                  </Button>
                </div>
              )}

              {(selectedMethod === 'apple_pay' || selectedMethod === 'google_pay' || selectedMethod === 'paypal') && (
                <Alert className="mt-4">
                  <AlertDescription>
                    You'll be redirected to {
                      selectedMethod === 'apple_pay' ? 'Apple Pay' :
                      selectedMethod === 'google_pay' ? 'Google Pay' :
                      'PayPal'
                    } to complete your payment securely.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Your payment information is encrypted and secure. We never store your card details.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Beginner Surf Lesson</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Bondi Beach</span>
                  </div>
                  <div>Today, 2:00 PM - 3:30 PM</div>
                  <div>90 minutes</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Class Fee</span>
                  <span>$89.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Equipment Rental</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee</span>
                  <span>$3.50</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>$92.50</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Equipment included</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          disabled={processing}
        >
          Back
        </Button>
        <Button
          size="lg"
          onClick={handlePayment}
          disabled={processing}
          className="min-w-[200px]"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Processing...
            </>
          ) : (
            'Complete Booking'
          )}
        </Button>
      </div>
    </div>
  );
};

export default GuestPaymentPage;