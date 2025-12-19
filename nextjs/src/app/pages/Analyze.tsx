import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, BarChart3, Zap, Link as LinkIcon, FileText, Globe } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { MetricCard } from '../components/MetricCard';

export function Analyze() {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.url || '');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResults(null);

    // Simulate analysis
    setTimeout(() => {
      setResults({
        status: 'Online',
        da: 65,
        backlinks: 12453,
        seoScore: 87,
        speed: 92,
        summary: 'Good'
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Website Analyzer</h1>
          <p className="text-xl text-[#6B7280]">Get instant insights into any website's performance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="url"
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              className="w-full px-8 py-6 text-lg rounded-[24px] border-2 border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors bg-white shadow-[0_8px_32px_rgba(31,38,135,0.1)]"
            />
            <PrimaryButton
              onClick={handleAnalyze}
              disabled={!url || analyzing}
              className="absolute right-2 top-2 px-8 py-4"
            >
              {analyzing ? 'Analyzing...' : 'Analyze'}
            </PrimaryButton>
          </div>
        </motion.div>

        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="p-12 rounded-[24px] bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] mb-6">
                <Globe className="w-12 h-12 text-white animate-spin" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Analyzing Your Website</h3>
              <p className="text-[#6B7280]">This may take a few seconds...</p>
              <div className="mt-6 w-48 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {results && !analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <MetricCard
                title="Site Status"
                value={results.status}
                icon={<Activity className="w-6 h-6" />}
                delay={0}
              />
              <MetricCard
                title="Domain Authority"
                value={results.da}
                icon={<Globe className="w-6 h-6" />}
                score={results.da}
                delay={0.1}
              />
              <MetricCard
                title="Backlinks"
                value={results.backlinks.toLocaleString()}
                icon={<LinkIcon className="w-6 h-6" />}
                delay={0.2}
              />
              <MetricCard
                title="SEO Score"
                value={`${results.seoScore}/100`}
                icon={<BarChart3 className="w-6 h-6" />}
                score={results.seoScore}
                trend="up"
                delay={0.3}
              />
              <MetricCard
                title="Speed Score"
                value={`${results.speed}/100`}
                icon={<Zap className="w-6 h-6" />}
                score={results.speed}
                trend="up"
                delay={0.4}
              />
              <MetricCard
                title="Overall"
                value={results.summary}
                icon={<FileText className="w-6 h-6" />}
                score={85}
                delay={0.5}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <PrimaryButton onClick={() => navigate('/results', { state: { url, results } })}>
                View Detailed Report
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
