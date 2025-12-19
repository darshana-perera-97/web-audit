import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';

export function History() {
  const scans = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    url: `website${i + 1}.com`,
    date: `2023-12-${String(19 - i).padStart(2, '0')}`,
    seoScore: Math.floor(Math.random() * 40) + 60,
    speedGrade: ['A+', 'A', 'B', 'C'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-2">Scan History</h1>
          <p className="text-xl text-[#6B7280]">View all your past website scans</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search scans..."
              className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-[16px] border border-gray-200 hover:border-[#10B981] transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <PrimaryButton>Bulk Re-analyze</PrimaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Website</th>
                <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Date</th>
                <th className="text-left py-4 px-4 text-[#6B7280] font-medium">SEO Score</th>
                <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Speed Grade</th>
                <th className="text-right py-4 px-4 text-[#6B7280] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-[#1A1F36] font-medium">{scan.url}</td>
                  <td className="py-4 px-4 text-[#6B7280]">{scan.date}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      scan.seoScore >= 80 ? 'bg-[#10B981]/10 text-[#10B981]' :
                      scan.seoScore >= 60 ? 'bg-[#D97706]/10 text-[#D97706]' :
                      'bg-[#DC2626]/10 text-[#DC2626]'
                    }`}>
                      {scan.seoScore}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#10B981]/10 text-[#10B981]">
                      {scan.speedGrade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-[#10B981] hover:underline">View Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
