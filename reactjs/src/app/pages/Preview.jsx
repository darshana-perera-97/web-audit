import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, X, Mail, User, Building, Phone, Globe } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { API_ENDPOINTS } from '../../config/api';

export function Preview() {
  const history = useHistory();
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.url || '');
  const [previewUrl, setPreviewUrl] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    if (url) {
      const normalized = normalizeUrl(url);
      setPreviewUrl(normalized);
      setIsLoading(true);
      setLoadingProgress(0);
      
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      return () => clearInterval(progressInterval);
    } else {
      // If no URL, redirect back
      history.push('/analyze');
    }
  }, [url, history]);
  
  const handleViewAuditReport = () => {
    setShowFormModal(true);
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadingProgress(100);
  };

  const normalizeUrl = (inputUrl) => {
    if (!inputUrl) return '';
    let normalized = inputUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    
    try {
      // Send contact details to company email for follow-ups
      await fetch(API_ENDPOINTS.SEND_CONTACT_NOTIFICATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || '',
          phone: formData.phone || '',
          websiteUrl: previewUrl,
        }),
      });
    } catch (error) {
      console.error('Error sending contact notification to company:', error);
      // Continue even if company notification fails
    } finally {
      setSendingEmail(false);
      setShowFormModal(false);
      
      // Navigate to analytics page with URL and form data
      // Email with report link will be sent automatically when analysis completes
      history.push({
        pathname: '/analytics',
        state: { 
          url: previewUrl,
          formData: formData
        }
      });
    }
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
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold text-[#1A1F36] mb-2">Website Preview</h1>
          <p className="text-[#6B7280]">Loading website preview...</p>
        </motion.div>

        {/* Website Preview */}
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#1A1F36]">{previewUrl}</h3>
                <div className="flex items-center gap-4">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#10B981] hover:underline"
                  >
                    Open in new tab <ExternalLink className="w-4 h-4" />
                  </a>
                  <PrimaryButton onClick={handleViewAuditReport} className="px-6 py-2">
                    View Audit Report
                  </PrimaryButton>
                </div>
              </div>
              
              {/* Loading Bar */}
              {isLoading && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#1A1F36]">Loading Website Preview</span>
                    <span className="text-sm font-semibold text-[#10B981]">{loadingProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                    />
                  </div>
                </div>
              )}
              
              {/* Preview Container */}
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50" style={{ height: '600px' }}>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="text-center">
                      <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] mb-4">
                        <Globe className="w-12 h-12 text-white animate-spin" />
                      </div>
                      <p className="text-[#6B7280] font-medium">Loading website preview...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  title="Website Preview"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </motion.div>
        )}

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

                {sendingEmail && (
                  <div className="mt-4 p-3 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg">
                    <p className="text-sm text-[#10B981] text-center">Sending email notification...</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    disabled={sendingEmail}
                    className="flex-1 px-6 py-3 rounded-[12px] border-2 border-gray-200 text-[#1A1F36] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <PrimaryButton type="submit" className="flex-1" disabled={sendingEmail}>
                    {sendingEmail ? 'Processing...' : 'Start Analysis'}
                  </PrimaryButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
