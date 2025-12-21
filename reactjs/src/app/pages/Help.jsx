import { motion } from 'motion/react';
import { Search, Book, MessageCircle, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export function Help() {
  const faqs = [
    {
      question: 'How do I analyze a website?',
      answer: 'Simply enter the website URL in the analyze page and click "Analyze Now". Our system will process the website and provide you with comprehensive metrics within seconds.'
    },
    {
      question: 'What metrics are included in the analysis?',
      answer: 'We provide Site Status, Domain Authority, Backlinks count, SEO Score, Speed Score, and an overall summary of your website\'s performance.'
    },
    {
      question: 'Can I export my reports?',
      answer: 'Yes! Pro and Lite users can export reports in PDF, CSV, or JSON formats. Free users get limited export options.'
    },
    {
      question: 'How often should I analyze my website?',
      answer: 'We recommend analyzing your website at least once a week to track performance trends and identify issues early.'
    },
    {
      question: 'What is bulk analysis?',
      answer: 'Bulk analysis allows you to analyze multiple websites at once by uploading a CSV file or pasting a list of URLs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Help Center</h1>
          <p className="text-xl text-[#6B7280]">Find answers and learn how to use SitePulse</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-16 pr-6 py-5 text-lg rounded-[24px] border-2 border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors bg-white shadow-[0_8px_32px_rgba(31,38,135,0.1)]"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Book className="w-6 h-6" />, title: 'Documentation', desc: 'Comprehensive guides' },
            { icon: <FileText className="w-6 h-6" />, title: 'API Docs', desc: 'Developer resources' },
            { icon: <MessageCircle className="w-6 h-6" />, title: 'Support', desc: 'Get in touch' }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_8px_32px_rgba(31,38,135,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white w-fit mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#1A1F36] mb-2">{item.title}</h3>
              <p className="text-[#6B7280]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        >
          <h2 className="text-3xl font-semibold text-[#1A1F36] mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#6B7280]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
