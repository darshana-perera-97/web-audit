import { motion } from 'motion/react';

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_48px_rgba(16,185,129,0.3)] transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
