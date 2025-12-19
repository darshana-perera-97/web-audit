import { Link, useLocation } from 'react-router-dom';
import { Activity, ChevronDown, User } from 'lucide-react';
import { motion } from 'motion/react';
import { PrimaryButton } from './PrimaryButton';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669]">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-[#1A1F36]">SitePulse</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/analyze"
                className={`hover:text-[#10B981] transition-colors ${
                  location.pathname === '/analyze' ? 'text-[#10B981]' : 'text-[#1A1F36]'
                }`}
              >
                Analyze
              </Link>

              <div className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                <button className="flex items-center gap-1 hover:text-[#10B981] transition-colors text-[#1A1F36]">
                  Tools <ChevronDown className="w-4 h-4" />
                </button>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden"
                  >
                    <Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/history" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                      History
                    </Link>
                    <Link to="/compare" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                      Compare
                    </Link>
                    <Link to="/bulk-analyze" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                      Bulk Analyze
                    </Link>
                  </motion.div>
                )}
              </div>

              <Link
                to="/pricing"
                className={`hover:text-[#10B981] transition-colors ${
                  location.pathname === '/pricing' ? 'text-[#10B981]' : 'text-[#1A1F36]'
                }`}
              >
                Pricing
              </Link>

              <Link
                to="/help"
                className={`hover:text-[#10B981] transition-colors ${
                  location.pathname === '/help' ? 'text-[#10B981]' : 'text-[#1A1F36]'
                }`}
              >
                Help
              </Link>
            </div>

            <Link to="/analyze">
              <PrimaryButton className="px-6 py-3">Analyze Now</PrimaryButton>
            </Link>

            <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-6 h-6 text-[#1A1F36]" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
