import { motion } from 'motion/react';
import { Activity, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useHistory } from 'react-router-dom';

export function Dashboard() {
  const history = useHistory();

  const recentScans = [
    { url: 'example.com', date: '2023-12-19', seoScore: 87, speedGrade: 'A', status: 'success' },
    { url: 'testsite.org', date: '2023-12-18', seoScore: 72, speedGrade: 'B', status: 'warning' },
    { url: 'mywebsite.net', date: '2023-12-17', seoScore: 95, speedGrade: 'A+', status: 'success' },
    { url: 'demo.io', date: '2023-12-16', seoScore: 64, speedGrade: 'C', status: 'error' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-2">Dashboard</h1>
          <p className="text-xl text-[#6B7280]">Overview of your website analytics</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Total Scans"
            value="247"
            icon={<Activity className="w-6 h-6" />}
            trend="up"
            delay={0}
          />
          <MetricCard
            title="Avg SEO Score"
            value="82"
            icon={<BarChart3 className="w-6 h-6" />}
            score={82}
            delay={0.1}
          />
          <MetricCard
            title="Active Sites"
            value="12"
            icon={<TrendingUp className="w-6 h-6" />}
            delay={0.2}
          />
          <MetricCard
            title="Last Scan"
            value="2h ago"
            icon={<Clock className="w-6 h-6" />}
            delay={0.3}
          />
        </div>

        {/* Recent Scans Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#1A1F36]">Recent Scans</h2>
            <button onClick={() => history.push('/history')} className="text-[#10B981] hover:underline">
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Website</th>
                  <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Date</th>
                  <th className="text-left py-4 px-4 text-[#6B7280] font-medium">SEO Score</th>
                  <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Speed</th>
                  <th className="text-left py-4 px-4 text-[#6B7280] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, index) => (
                  <motion.tr
                    key={scan.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => history.push('/results')}
                  >
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
                    <td className="py-4 px-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${
                        scan.status === 'success' ? 'bg-[#10B981]' :
                        scan.status === 'warning' ? 'bg-[#D97706]' :
                        'bg-[#DC2626]'
                      }`} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Analyze Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <PrimaryButton onClick={() => history.push('/analyze')}>
            Analyze New Website
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
