import { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SecondaryButton({ children, className = '', ...props }: SecondaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 bg-transparent border-2 border-[#1A1F36] text-[#1A1F36] rounded-[24px] hover:bg-[#1A1F36] hover:text-white transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
