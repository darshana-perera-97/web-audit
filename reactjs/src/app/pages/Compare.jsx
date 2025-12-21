import { motion } from 'motion/react';
import { PrimaryButton } from '../components/PrimaryButton';
import { useState } from 'react';

export function Compare() {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Compare Websites</h1>
          <p className="text-xl text-[#6B7280]">Side-by-side comparison of two websites</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-2">Website 1</label>
            <input
              type="url"
              placeholder="Enter first website URL"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              className="w-full px-6 py-4 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-2">Website 2</label>
            <input
              type="url"
              placeholder="Enter second website URL"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              className="w-full px-6 py-4 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <PrimaryButton>Compare Now</PrimaryButton>
        </div>

        {/* Placeholder for comparison results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-semibold text-[#1A1F36] mb-4">Website 1 Metrics</h3>
            <p className="text-[#6B7280]">Enter URLs above to compare</p>
          </div>
          <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-semibold text-[#1A1F36] mb-4">Website 2 Metrics</h3>
            <p className="text-[#6B7280]">Enter URLs above to compare</p>
          </div>
        </div>
      </div>
    </div>
  );
}
