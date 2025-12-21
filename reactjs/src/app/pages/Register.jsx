import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { Link } from 'react-router-dom';

export function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="p-10 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
          <h1 className="text-3xl font-semibold text-[#1A1F36] mb-2 text-center">Create Account</h1>
          <p className="text-[#6B7280] text-center mb-8">Sign up to start analyzing websites</p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-[#1A1F36] mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1A1F36] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1A1F36] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <PrimaryButton className="w-full">Create Account</PrimaryButton>
          </form>

          <p className="text-center mt-6 text-sm text-[#6B7280]">
            Already have an account? <Link to="/login" className="text-[#10B981] hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
