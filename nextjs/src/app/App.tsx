import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { History } from './pages/History';
import { Compare } from './pages/Compare';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { Pricing } from './pages/Pricing';
import { BulkAnalyze } from './pages/BulkAnalyze';
import { Help } from './pages/Help';

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/bulk-analyze" element={<BulkAnalyze />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
