import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  score?: number;
  trend?: 'up' | 'down';
  loading?: boolean;
  delay?: number;
}

export function MetricCard({ title, value, icon, score, trend, loading = false, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative p-8 rounded-[24px] bg-white/10 backdrop-blur-[20px] border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.15)] transition-all"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white">
          {icon}
        </div>
        {trend && (
          <span className={`text-sm ${trend === 'up' ? 'text-[#10B981]' : 'text-[#DC2626]'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      
      <h3 className="text-[#6B7280] mb-2">{title}</h3>
      
      {loading ? (
        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg" />
      ) : (
        <p className="text-3xl font-semibold text-[#1A1F36] mb-4">{value}</p>
      )}
      
      {score !== undefined && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className={`h-full rounded-full ${
                score >= 80 ? 'bg-[#10B981]' : score >= 50 ? 'bg-[#D97706]' : 'bg-[#DC2626]'
              }`}
            />
          </div>
          <span className="text-xs text-[#6B7280] mt-1 block">{score}% Score</span>
        </div>
      )}
    </motion.div>
  );
}
