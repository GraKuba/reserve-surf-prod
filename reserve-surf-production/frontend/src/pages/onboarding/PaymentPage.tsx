import { useNavigate } from 'react-router-dom'
import { PaymentForm } from '@/components/onboarding/PaymentForm'
import { useOnboardingBooking } from '@/store/onboarding/onboardingStore'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { booking } = useOnboardingBooking()
  
  // Calculate total amount
  const basePrice = booking.price || 0
  const equipmentFee = booking.equipmentIncluded ? 0 : 25
  const processingFee = basePrice * 0.03 // 3% processing fee
  const totalAmount = basePrice + equipmentFee + processingFee

  const handlePaymentSuccess = () => {
    // Navigate to confirmation page
    navigate('/onboarding/confirmation')
  }

  const handleBack = () => {
    // Navigate back to booking summary
    navigate('/onboarding/booking')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Payment</h2>
        <p className="text-muted-foreground">Complete your booking payment</p>
      </div>

      <PaymentForm 
        totalAmount={totalAmount}
        onSuccess={handlePaymentSuccess}
        onBack={handleBack}
      />
    </div>
  )
}