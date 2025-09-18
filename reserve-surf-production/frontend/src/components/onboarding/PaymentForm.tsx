import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  CreditCard, 
  Lock, 
  Shield, 
  AlertCircle,
  Check,
  Loader2,
  Smartphone,
  Building2
} from 'lucide-react'
import { useOnboardingPayment, useOnboardingBooking, useOnboardingUser } from '@/store/onboarding/onboardingStore'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Payment form schema
const paymentSchema = z.object({
  paymentMethod: z.enum(['card', 'paypal', 'bank_transfer']),
  cardNumber: z.string().min(16, 'Card number must be 16 digits').optional(),
  cardName: z.string().min(3, 'Cardholder name is required').optional(),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date (MM/YY)').optional(),
  cvv: z.string().min(3, 'CVV must be at least 3 digits').optional(),
  billingEmail: z.string().email('Invalid email address'),
  savePaymentMethod: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine((data) => {
  if (data.paymentMethod === 'card') {
    return data.cardNumber && data.cardName && data.expiryDate && data.cvv
  }
  return true
}, {
  message: 'Card details are required for card payment',
  path: ['cardNumber']
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  totalAmount: number
  onSuccess: () => void
  onBack?: () => void
}

export function PaymentForm({ totalAmount, onSuccess, onBack }: PaymentFormProps) {
  const { payment, updatePayment } = useOnboardingPayment()
  const { booking } = useOnboardingBooking()
  const { user } = useOnboardingUser()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: payment.method || 'card',
      billingEmail: user.email || '',
      savePaymentMethod: false,
      termsAccepted: false
    }
  })

  const selectedMethod = watch('paymentMethod')
  const termsAccepted = watch('termsAccepted')

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  const onSubmit = async (data: PaymentFormData) => {
    setProcessing(true)
    setError(null)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In production, this would integrate with Stripe
      // const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(...)

      // Update payment state
      updatePayment({
        method: data.paymentMethod,
        cardLast4: data.cardNumber ? data.cardNumber.slice(-4) : undefined,
        transactionId: `txn_${Date.now()}`,
        amount: totalAmount,
        currency: 'USD',
        status: 'completed'
      })

      onSuccess()
    } catch (err) {
      setError('Payment failed. Please check your details and try again.')
      updatePayment({ status: 'failed' })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Complete your booking for {booking.lessonTitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup
              value={selectedMethod}
              onValueChange={(value) => setValue('paymentMethod', value as any)}
            >
              <div className="grid gap-3">
                <label
                  htmlFor="card"
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
                    selectedMethod === 'card' && "bg-primary/5 border-primary"
                  )}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5" />
                  <div className="flex-1">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                </label>
                
                <label
                  htmlFor="paypal"
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
                    selectedMethod === 'paypal' && "bg-primary/5 border-primary"
                  )}
                >
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Smartphone className="h-5 w-5" />
                  <div className="flex-1">
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-muted-foreground">Fast & secure checkout</p>
                  </div>
                </label>

                <label
                  htmlFor="bank_transfer"
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
                    selectedMethod === 'bank_transfer' && "bg-primary/5 border-primary"
                  )}
                >
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                  <Building2 className="h-5 w-5" />
                  <div className="flex-1">
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-muted-foreground">Direct bank payment</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Card Payment Fields */}
          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      {...register('cardNumber')}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        setValue('cardNumber', formatted.replace(/\s/g, ''))
                        e.target.value = formatted
                      }}
                      maxLength={19}
                      className={cn(
                        "pl-10",
                        errors.cardNumber && "border-destructive"
                      )}
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    {...register('cardName')}
                    className={errors.cardName ? "border-destructive" : ""}
                  />
                  {errors.cardName && (
                    <p className="text-sm text-destructive mt-1">{errors.cardName.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      {...register('expiryDate')}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value)
                        setValue('expiryDate', formatted)
                        e.target.value = formatted
                      }}
                      maxLength={5}
                      className={errors.expiryDate ? "border-destructive" : ""}
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-destructive mt-1">{errors.expiryDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        {...register('cvv')}
                        maxLength={4}
                        className={cn(
                          "pl-10",
                          errors.cvv && "border-destructive"
                        )}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {errors.cvv && (
                      <p className="text-sm text-destructive mt-1">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PayPal */}
          {selectedMethod === 'paypal' && (
            <div className="space-y-4">
              <Separator />
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You will be redirected to PayPal to complete your payment securely.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Bank Transfer */}
          {selectedMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <Separator />
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Bank transfer details will be sent to your email after confirmation.
                  Please complete the transfer within 24 hours to secure your booking.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <Separator />

          {/* Billing Email */}
          <div>
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input
              id="billingEmail"
              type="email"
              placeholder="john@example.com"
              {...register('billingEmail')}
              className={errors.billingEmail ? "border-destructive" : ""}
            />
            {errors.billingEmail && (
              <p className="text-sm text-destructive mt-1">{errors.billingEmail.message}</p>
            )}
          </div>

          {/* Save Payment Method */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="savePayment"
              {...register('savePaymentMethod')}
            />
            <label
              htmlFor="savePayment"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save payment method for future bookings
            </label>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              {...register('termsAccepted')}
              className={errors.termsAccepted ? "border-destructive" : ""}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                By completing this payment, you agree to our{' '}
                <a href="#" className="underline underline-offset-2">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline underline-offset-2">
                  Cancellation Policy
                </a>
              </p>
              {errors.termsAccepted && (
                <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>SSL Encrypted</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={processing}
        >
          Back
        </Button>
        <Button 
          type="submit"
          size="lg"
          disabled={processing || !termsAccepted}
          className="min-w-[200px]"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay ${totalAmount.toFixed(2)}
              <Check className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}