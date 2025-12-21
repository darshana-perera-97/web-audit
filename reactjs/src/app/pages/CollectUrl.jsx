import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';

export function CollectUrl() {
  const history = useHistory();
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      alert('Please enter a website URL');
      return;
    }
    
    // Navigate to preview page with URL
    history.push({ pathname: '/preview', state: { url } });
  };

  const normalizeUrl = (inputUrl) => {
    if (!inputUrl) return '';
    let normalized = inputUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Website Audit Tool</h1>
          <p className="text-xl text-[#6B7280]">Enter the website URL you want to analyze</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <Globe className="w-6 h-6 text-[#6B7280]" />
              </div>
              <input
                type="url"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-16 pr-32 py-6 text-lg rounded-[24px] border-2 border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors bg-white shadow-[0_8px_32px_rgba(31,38,135,0.1)]"
              />
              <PrimaryButton
                type="submit"
                disabled={!url}
                className="absolute right-2 top-2 px-8 py-4"
              >
                Continue <ArrowRight className="w-5 h-5 ml-2 inline" />
              </PrimaryButton>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
