import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import OrganizerSignup from './pages/OrganizerSignup';
import VolunteerScanner from './pages/VolunteerScanner';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import EventDetails from './pages/EventDetails';
import RegistrationSuccess from './pages/RegistrationSuccess';
import TicketView from './pages/TicketView';
import NotFound from './pages/NotFound';
import DebugPanel from './pages/DebugPanel';
import SeedData from './pages/SeedData';
import { useEffect } from 'react';
import { checkDBConnection } from './firebase/services';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Events from './pages/dashboard/Events';
import Registrations from './pages/dashboard/Registrations';
import FormBuilder from './pages/dashboard/FormBuilder';
import Volunteers from './pages/dashboard/Volunteers';
import { 
  Payments, 
  CheckIns, 
  Settings as DashSettings, 
  Billing, 
  Communication, 
  Updates 
} from './pages/dashboard/Placeholders';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';
import AdminSystem from './pages/admin/AdminSystem';
import { AdminAnalytics, AdminPayments } from './pages/admin/AdminPlaceholders';

// Auth & Security
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    checkDBConnection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<OrganizerSignup />} />
          
          {/* Admin Routes (Super Admin Only) */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminOverview /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute requiredRole="admin"><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/system" element={<ProtectedRoute requiredRole="admin"><AdminSystem /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute requiredRole="admin"><AdminPayments /></ProtectedRoute>} />

          {/* Dashboard Nested Routes (Organizer Only) */}
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="organizer"><Overview /></ProtectedRoute>} />
          <Route path="/dashboard/events" element={<ProtectedRoute requiredRole="organizer"><Events /></ProtectedRoute>} />
          <Route path="/dashboard/registrations" element={<ProtectedRoute requiredRole="organizer"><Registrations /></ProtectedRoute>} />
          <Route path="/dashboard/forms" element={<ProtectedRoute requiredRole="organizer"><FormBuilder /></ProtectedRoute>} />
          <Route path="/dashboard/volunteers" element={<ProtectedRoute requiredRole="organizer"><Volunteers /></ProtectedRoute>} />
          <Route path="/dashboard/payments" element={<ProtectedRoute requiredRole="organizer"><Payments /></ProtectedRoute>} />
          <Route path="/dashboard/check-ins" element={<ProtectedRoute requiredRole="organizer"><CheckIns /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute requiredRole="organizer"><DashSettings /></ProtectedRoute>} />
          <Route path="/dashboard/billing" element={<ProtectedRoute requiredRole="organizer"><Billing /></ProtectedRoute>} />
          <Route path="/dashboard/communication" element={<ProtectedRoute requiredRole="organizer"><Communication /></ProtectedRoute>} />
          <Route path="/dashboard/updates" element={<ProtectedRoute requiredRole="organizer"><Updates /></ProtectedRoute>} />

          <Route path="/scanner" element={<ProtectedRoute requiredRole="volunteer"><VolunteerScanner /></ProtectedRoute>} />
        
        {/* Participant Flow */}
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event/:id/register" element={<Register />} />
        <Route path="/event/:id/success" element={<RegistrationSuccess />} />
        <Route path="/ticket/:registrationId" element={<TicketView />} />
        
        {/* Marketing Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* Debug & Utilities */}
        <Route path="/debug/firebase" element={<DebugPanel />} />
        <Route path="/seed" element={<SeedData />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
