import { motion } from 'motion/react';
import { Mail, Lock, Github } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="p-10 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
          <h1 className="text-3xl font-semibold text-[#1A1F36] mb-2 text-center">Welcome Back</h1>
          <p className="text-[#6B7280] text-center mb-8">Sign in to your account</p>

          <form className="space-y-6">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-[#6B7280]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#10B981] hover:underline">Forgot password?</a>
            </div>

            <PrimaryButton className="w-full">Sign In</PrimaryButton>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-[#6B7280]">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SecondaryButton className="flex items-center justify-center gap-2 py-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#1A1F36" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#1A1F36" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#1A1F36" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#1A1F36" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </SecondaryButton>
            <SecondaryButton className="flex items-center justify-center gap-2 py-3">
              <Github className="w-5 h-5" />
              GitHub
            </SecondaryButton>
          </div>

          <p className="text-center mt-6 text-sm text-[#6B7280]">
            Don't have an account? <Link to="/register" className="text-[#10B981] hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
