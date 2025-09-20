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

// New User Flow imports
import NewUserBrowse from "./pages/onboarding/new-user/NewUserBrowse";
import NewUserCart from "./pages/onboarding/new-user/NewUserCart";
import NewUserAuth from "./pages/onboarding/new-user/NewUserAuth";
import NewUserPayment from "./pages/onboarding/new-user/NewUserPayment";
import NewUserConfirmation from "./pages/onboarding/new-user/NewUserConfirmation";

// Partner Flow imports
import PartnerDataHandler from "./components/partner/PartnerDataHandler";
import PartnerBookingSummary from "./pages/onboarding/partner/PartnerBookingSummary";
import PartnerAuth from "./pages/onboarding/partner/PartnerAuth";
import PartnerPayment from "./pages/onboarding/partner/PartnerPayment";

// Existing User Flow imports
import ExistingUserLogin from "./pages/onboarding/existing/LoginPage";
import ExistingUserRecommendations from "./pages/onboarding/existing/RecommendationsPage";
import ExistingUserBookingSummary from "./pages/onboarding/existing/BookingSummaryPage";
import PartnerConfirmation from "./pages/onboarding/partner/PartnerConfirmation";

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
              
              {/* Partner Entry Point - handles redirect from partner sites */}
              <Route path="/book" element={<PartnerDataHandler />} />

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
                
                {/* New User Flow (Flow 1) */}
                <Route path="new-user/browse" element={<NewUserBrowse />} />
                <Route path="new-user/cart" element={<NewUserCart />} />
                <Route path="new-user/auth" element={<NewUserAuth />} />
                <Route path="new-user/payment" element={<NewUserPayment />} />
                <Route path="new-user/confirmation" element={<NewUserConfirmation />} />
                
                {/* Partner Flow (Flow 2) - Returning from Partner Site */}
                <Route path="partner/validate" element={<PartnerDataHandler />} />
                <Route path="partner/booking-summary" element={<PartnerBookingSummary />} />
                <Route path="partner/auth" element={<PartnerAuth />} />
                <Route path="partner/payment" element={<PartnerPayment />} />
                <Route path="partner/confirmation" element={<PartnerConfirmation />} />
                
                {/* Existing User Flow (Flow 3) - Existing Users */}
                <Route path="existing/login" element={<ExistingUserLogin />} />
                <Route path="existing/recommendations" element={<ExistingUserRecommendations />} />
                <Route path="existing/booking-summary" element={<ExistingUserBookingSummary />} />
                
                {/* Legacy onboarding routes */}
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
