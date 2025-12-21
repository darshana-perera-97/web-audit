import { motion } from 'motion/react';
import { Upload, FileText } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';

export function BulkAnalyze() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Bulk Analyze</h1>
          <p className="text-xl text-[#6B7280]">Upload a CSV file or paste a list of URLs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-12 rounded-[24px] bg-white border-2 border-dashed border-gray-300 hover:border-[#10B981] transition-colors mb-8 text-center cursor-pointer"
        >
          <Upload className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#1A1F36] mb-2">Upload CSV File</h3>
          <p className="text-[#6B7280] mb-4">or drag and drop</p>
          <PrimaryButton>Choose File</PrimaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        >
          <h3 className="text-xl font-semibold text-[#1A1F36] mb-4">Or paste URLs (one per line)</h3>
          <textarea
            rows={10}
            placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
            className="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors resize-none"
          />
          <div className="mt-4 text-right">
            <PrimaryButton>Start Bulk Analysis</PrimaryButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
