import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, FileText, Globe, CheckCircle, ExternalLink, X, Mail, User, Building, Phone } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { MetricCard } from '../components/MetricCard';

export function Analyze() {
  const history = useHistory();
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.url || '');
  const [analyzing, setAnalyzing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [results, setResults] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const normalizeUrl = (inputUrl) => {
    if (!inputUrl) return '';
    let normalized = inputUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  };

  const handleStartClick = () => {
    if (!url) {
      alert('Please enter a website URL');
      return;
    }
    setShowFormModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowFormModal(false);
    
    // Show preview immediately
    const normalizedUrl = normalizeUrl(url);
    setPreviewUrl(normalizedUrl);
    setShowPreview(true);
    
    // Start analysis after a brief delay
    setTimeout(() => {
      startAnalysis();
    }, 500);
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setResults(null);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate analysis
    setTimeout(() => {
      setResults({
        status: 'Online',
        accessibility: 85,
        performance: 78,
        bestPractices: 92,
        seo: 88,
        summary: 'Good'
      });
      setAnalyzing(false);
      setProgress(100);
      clearInterval(progressInterval);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Website Audit Tool</h1>
          <p className="text-xl text-[#6B7280]">Analyze any website's performance, accessibility, and best practices</p>
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
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartClick()}
              className="w-full px-8 py-6 text-lg rounded-[24px] border-2 border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors bg-white shadow-[0_8px_32px_rgba(31,38,135,0.1)]"
            />
            <PrimaryButton
              onClick={handleStartClick}
              disabled={!url || analyzing}
              className="absolute right-2 top-2 px-8 py-4"
            >
              Start Audit
            </PrimaryButton>
          </div>
        </motion.div>

        {/* User Data Collection Modal */}
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFormModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#1A1F36]">Enter Your Details</h2>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1F36] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1F36] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1F36] mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="text"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1F36] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-[12px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="flex-1 px-6 py-3 rounded-[12px] border-2 border-gray-200 text-[#1A1F36] hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <PrimaryButton type="submit" className="flex-1">
                    Continue
                  </PrimaryButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Website Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#1A1F36]">Website Preview</h3>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#10B981] hover:underline"
                >
                  Open in new tab <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              {/* Progress Bar */}
              {analyzing && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#1A1F36]">Analysis Progress</span>
                    <span className="text-sm font-semibold text-[#10B981]">{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                    />
                  </div>
                </div>
              )}
              
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200" style={{ height: '600px' }}>
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  title="Website Preview"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Audit Results */}
        {results && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-[#1A1F36] mb-2">Audit Results</h2>
              <p className="text-[#6B7280]">Comprehensive analysis of {url}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Site Status"
                value={results.status}
                icon={<Globe className="w-6 h-6" />}
                delay={0}
              />
              <MetricCard
                title="Performance"
                value={`${results.performance}/100`}
                icon={<Activity className="w-6 h-6" />}
                score={results.performance}
                delay={0.1}
              />
              <MetricCard
                title="Accessibility"
                value={`${results.accessibility}/100`}
                icon={<CheckCircle className="w-6 h-6" />}
                score={results.accessibility}
                delay={0.2}
              />
              <MetricCard
                title="Best Practices"
                value={`${results.bestPractices}/100`}
                icon={<FileText className="w-6 h-6" />}
                score={results.bestPractices}
                delay={0.3}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <PrimaryButton onClick={() => history.push({ pathname: '/results', state: { url, results } })}>
                View Detailed Report
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
