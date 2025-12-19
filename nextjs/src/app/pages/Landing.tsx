import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, BarChart3, Zap, Link as LinkIcon, Star, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

export function Landing() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const handleAnalyze = () => {
    if (url) {
      navigate('/analyze', { state: { url } });
    }
  };

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Site Status',
      description: 'Real-time uptime monitoring and performance tracking'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'SEO Health',
      description: 'Comprehensive SEO analysis and recommendations'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Speed Score',
      description: 'Lighthouse performance metrics and optimization tips'
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: 'Backlinks',
      description: 'Track your backlink profile and domain authority'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'SEO Manager',
      company: 'TechCorp',
      text: 'SitePulse helped us improve our SEO score by 45% in just 3 months. The insights are invaluable!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      company: 'StartupHub',
      text: 'Best website analyzer we\'ve used. The real-time monitoring saves us hours of work every week.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Marketing Director',
      company: 'GrowthLab',
      text: 'The bulk analysis feature is a game-changer for managing multiple client websites.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-semibold text-[#1A1F36] mb-6">
              Analyze <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">Any Website</span><br />
              In Seconds
            </h1>
            <p className="text-xl text-[#6B7280] mb-12 max-w-2xl mx-auto">
              Get instant insights into your website's performance, SEO health, speed score, and backlinks. Make data-driven decisions to grow your online presence.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="relative">
                <input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="w-full px-8 py-6 text-lg rounded-[24px] border-2 border-gray-200 focus:border-[#10B981] focus:outline-none transition-colors bg-white shadow-[0_8px_32px_rgba(31,38,135,0.1)]"
                />
                <PrimaryButton
                  onClick={handleAnalyze}
                  className="absolute right-2 top-2 px-8 py-4"
                >
                  Analyze Now <ArrowRight className="w-5 h-5 ml-2 inline" />
                </PrimaryButton>
              </div>
              <p className="text-sm text-[#6B7280] mt-4">No credit card required. Free forever.</p>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="p-8 rounded-[24px] bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1F36] mb-2">{feature.title}</h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-semibold text-[#1A1F36] mb-12">Loved by Teams Worldwide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + 0.1 * index }}
                  className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_8px_32px_rgba(31,38,135,0.1)]"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <p className="text-[#6B7280] mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-[#1A1F36]">{testimonial.name}</p>
                    <p className="text-sm text-[#6B7280]">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-12 rounded-[24px] bg-gradient-to-br from-[#1A1F36] to-[#0F1629] text-white"
          >
            <h2 className="text-4xl font-semibold mb-4">Ready to Optimize Your Website?</h2>
            <p className="text-xl text-gray-300 mb-8">Start with our free plan or upgrade for advanced features</p>
            <div className="flex gap-4 justify-center">
              <PrimaryButton onClick={() => navigate('/analyze')}>
                Start Free Trial
              </PrimaryButton>
              <SecondaryButton onClick={() => navigate('/pricing')} className="border-white text-white hover:bg-white hover:text-[#1A1F36]">
                View Pricing
              </SecondaryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
