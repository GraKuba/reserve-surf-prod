import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BookingDetails from "./pages/BookingDetails";
import BookingGear from "./pages/BookingGear";
import BookingPayment from "./pages/BookingPayment";
import BookingConfirmation from "./pages/BookingConfirmation";
import OperatorLogin from "./pages/OperatorLogin";
import OperatorDashboard from "./pages/OperatorDashboard";
import CustomerCRM from "./pages/CustomerCRM";
import MobileCheckin from "./pages/MobileCheckin";
import { ThemeDemo } from "./components/ThemeDemo";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/theme-demo" element={<ThemeDemo />} />
          <Route path="/booking/details" element={<BookingDetails />} />
          <Route path="/booking/gear" element={<BookingGear />} />
          <Route path="/booking/payment" element={<BookingPayment />} />
          <Route
            path="/booking/confirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/operator/login" element={<OperatorLogin />} />
          <Route path="/operator/dashboard" element={<OperatorDashboard />} />
          <Route path="/operator/customers" element={<CustomerCRM />} />
          <Route path="/operator/checkin" element={<MobileCheckin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
