import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientLanding from "./pages/ClientLanding";
import BookingDetails from "./pages/BookingDetails";
import BookingGear from "./pages/BookingGear";
import BookingPayment from "./pages/BookingPayment";
import BookingConfirmation from "./pages/BookingConfirmation";
import OperatorLogin from "./pages/OperatorLogin";
import OperatorDashboard from "./pages/OperatorDashboard";
import CalendarView from "./pages/CalendarView";
import CustomerCRM from "./pages/CustomerCRM";
import StaffManagement from "./pages/StaffManagement";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Weather from "./pages/Weather";
import Equipment from "./pages/Equipment";
import Pricing from "./pages/Pricing";
import MobileCheckin from "./pages/MobileCheckin";
import Notifications from "./pages/Notifications";
import BusinessLanding from "./pages/BusinessLanding";
import { ThemeDemo } from "./components/ThemeDemo";

// Profile imports
import SkillPassport from "./pages/profile/SkillPassport";

// Onboarding imports
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import WelcomePage from "./pages/onboarding/WelcomePage";
import AuthPage from "./pages/onboarding/AuthPage";
import AssessmentQuiz from "./pages/onboarding/AssessmentQuiz";
import WaiverPage from "./pages/onboarding/WaiverPage";
import EmergencyContactPage from "./pages/onboarding/EmergencyContactPage";
import RecommendationsPage from "./pages/onboarding/RecommendationsPage";
import BookingSummary from "./pages/onboarding/BookingSummary";
import PaymentPage from "./pages/onboarding/PaymentPage";
import ConfirmationPage from "./pages/onboarding/ConfirmationPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<BusinessLanding />} />
          <Route path="/client" element={<ClientLanding />} />
          <Route path="/theme-demo" element={<ThemeDemo />} />

          {/* Booking Routes */}
          <Route path="/booking/details" element={<BookingDetails />} />
          <Route path="/booking/gear" element={<BookingGear />} />
          <Route path="/booking/payment" element={<BookingPayment />} />
          <Route
            path="/booking/confirmation"
            element={<BookingConfirmation />}
          />

          {/* Operator Routes */}
          <Route path="/operator/login" element={<OperatorLogin />} />
          <Route path="/operator/dashboard" element={<OperatorDashboard />} />
          <Route path="/operator/calendar" element={<CalendarView />} />
          <Route path="/operator/customers" element={<CustomerCRM />} />
          <Route path="/operator/staff" element={<StaffManagement />} />
          <Route path="/operator/reports" element={<Reports />} />
          <Route path="/operator/pricing" element={<Pricing />} />
          <Route path="/operator/weather" element={<Weather />} />
          <Route path="/operator/equipment" element={<Equipment />} />
          <Route path="/operator/notifications" element={<Notifications />} />
          <Route path="/operator/settings" element={<Settings />} />
          <Route path="/operator/checkin" element={<MobileCheckin />} />

          {/* Profile Routes */}
          <Route path="/profile/passport" element={<SkillPassport />} />

          {/* Onboarding Routes */}
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="assessment" element={<AssessmentQuiz />} />
            <Route path="waiver" element={<WaiverPage />} />
            <Route path="emergency" element={<EmergencyContactPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="booking" element={<BookingSummary />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
          </Route>
            </Routes>
          </div>
        </ProtectedRoute>
      </Router>
    </AuthProvider>
  );
}

export default App;
