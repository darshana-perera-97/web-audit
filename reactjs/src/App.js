import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from './app/components/ui/sonner';
import { Navbar } from './app/components/Navbar';
import { Footer } from './app/components/Footer';

// Pages
import { Landing } from './app/pages/Landing';
import { Dashboard } from './app/pages/Dashboard';
import { CollectUrl } from './app/pages/CollectUrl';
import { Preview } from './app/pages/Preview';
import { Analytics } from './app/pages/Analytics';
import { Results } from './app/pages/Results';
import { History } from './app/pages/History';
import { Report } from './app/pages/Report';
import { Compare } from './app/pages/Compare';
import { Login } from './app/pages/Login';
import { Register } from './app/pages/Register';
import { Settings } from './app/pages/Settings';
import { Pricing } from './app/pages/Pricing';
import { BulkAnalyze } from './app/pages/BulkAnalyze';
import { Help } from './app/pages/Help';

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/analyze" component={CollectUrl} />
          <Route path="/preview" component={Preview} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/results" component={Results} />
          <Route path="/history" component={History} />
          <Route path="/report/:reportId" component={Report} />
          <Route path="/compare" component={Compare} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={Settings} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/bulk-analyze" component={BulkAnalyze} />
          <Route path="/help" component={Help} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
