import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
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
import BusinessLanding from "./pages/BusinessLanding";
import { ThemeDemo } from "./components/ThemeDemo";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/business" element={<BusinessLanding />} />
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
          <Route path="/operator/settings" element={<Settings />} />
          <Route path="/operator/checkin" element={<MobileCheckin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
