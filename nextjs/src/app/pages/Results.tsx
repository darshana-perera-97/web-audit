import { motion } from 'motion/react';
import { Download, Share2, Activity, BarChart3, Zap, LinkIcon } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Results() {
  const data = [
    { name: 'Mon', seo: 75, speed: 82 },
    { name: 'Tue', seo: 78, speed: 85 },
    { name: 'Wed', seo: 82, speed: 88 },
    { name: 'Thu', seo: 85, speed: 90 },
    { name: 'Fri', seo: 87, speed: 92 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-8"
        >
          <div>
            <h1 className="text-5xl font-semibold text-[#1A1F36] mb-2">Analysis Report</h1>
            <p className="text-xl text-[#6B7280]">example.com</p>
          </div>
          <div className="flex gap-4">
            <SecondaryButton className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </SecondaryButton>
            <PrimaryButton className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </PrimaryButton>
          </div>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-[24px] bg-gradient-to-br from-[#10B981] to-[#059669] text-white mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">AI Summary</h2>
          <p className="text-lg opacity-90">
            Your website shows excellent performance with a strong SEO score of 87/100 and fast loading times. 
            Consider optimizing images and implementing lazy loading to further improve speed scores. 
            Your backlink profile is healthy with 12,453 quality links from reputable sources.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 p-1 bg-white border border-gray-200 rounded-[16px] inline-flex">
              <TabsTrigger value="overview" className="px-6 py-3 rounded-[12px]">Overview</TabsTrigger>
              <TabsTrigger value="seo" className="px-6 py-3 rounded-[12px]">SEO Analysis</TabsTrigger>
              <TabsTrigger value="speed" className="px-6 py-3 rounded-[12px]">Speed Metrics</TabsTrigger>
              <TabsTrigger value="backlinks" className="px-6 py-3 rounded-[12px]">Backlinks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">Performance Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="seo" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="speed" stroke="#1A1F36" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="seo">
              <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">SEO Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Meta Tags', score: 95 },
                    { label: 'Content Quality', score: 88 },
                    { label: 'Mobile Friendliness', score: 92 },
                    { label: 'Page Structure', score: 85 }
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#1A1F36]">{item.label}</span>
                        <span className="text-[#10B981] font-semibold">{item.score}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="speed">
              <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">Speed Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'FCP', value: 1.2, max: 3 },
                    { name: 'LCP', value: 2.1, max: 4 },
                    { name: 'TTI', value: 2.8, max: 5 },
                    { name: 'TBT', value: 150, max: 600 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="backlinks">
              <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">Top Backlinks</h3>
                <div className="space-y-4">
                  {[
                    { url: 'techcrunch.com', da: 95, links: 234 },
                    { url: 'forbes.com', da: 93, links: 187 },
                    { url: 'medium.com', da: 88, links: 156 },
                    { url: 'reddit.com', da: 91, links: 143 }
                  ].map((link) => (
                    <div key={link.url} className="flex items-center justify-between p-4 rounded-[16px] bg-gray-50">
                      <div>
                        <p className="font-semibold text-[#1A1F36]">{link.url}</p>
                        <p className="text-sm text-[#6B7280]">DA: {link.da}</p>
                      </div>
                      <span className="text-[#10B981] font-semibold">{link.links} links</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
