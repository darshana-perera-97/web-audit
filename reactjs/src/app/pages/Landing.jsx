import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, BarChart3, Zap, Link as LinkIcon, Star, ArrowRight, Globe, FileText, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

export function Landing() {
  const history = useHistory();
  const [url, setUrl] = useState('');

  const handleAnalyze = () => {
    if (url) {
      history.push({ pathname: '/analyze', state: { url } });
    } else {
      history.push('/analyze');
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <p className="text-sm text-[#6B7280]">No credit card required. Free forever.</p>
                <div className="flex items-center gap-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 text-sm text-[#10B981]"
                  >
                    <div className="p-1.5 rounded-lg bg-[#10B981]/10">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Secure & Encrypted</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-sm text-[#10B981]"
                  >
                    <div className="p-1.5 rounded-lg bg-[#10B981]/10">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Trusted by 10K+ Users</span>
                  </motion.div>
                </div>
              </div>
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
                className="p-8 rounded-[24px] bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 text-center"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1F36] mb-2">{feature.title}</h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl font-semibold text-[#1A1F36] mb-4">How It Works</h2>
              <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
                Get comprehensive website insights in three simple steps
              </p>
            </div>
            
            <div className="relative max-w-6xl mx-auto">
              {/* Connection Line (Desktop Only) */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#10B981] via-[#10B981]/50 to-[#10B981] transform translate-y-1/2" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                {[
                  {
                    step: '1',
                    icon: <Globe className="w-10 h-10" />,
                    title: 'Enter Website URL',
                    description: 'Simply paste the website URL you want to analyze. Our system supports any website on the internet.',
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    step: '2',
                    icon: <Activity className="w-10 h-10" />,
                    title: 'Automatic Analysis',
                    description: 'Our advanced algorithms analyze SEO, performance, backlinks, and more in just a few seconds.',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    step: '3',
                    icon: <FileText className="w-10 h-10" />,
                    title: 'Get Detailed Report',
                    description: 'Receive a comprehensive report with actionable insights and recommendations to improve your website.',
                    gradient: 'from-[#10B981] to-[#059669]'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                    className="relative"
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{item.step}</span>
                      </div>
                    </div>
                    
                    {/* Card */}
                    <div className="pt-8 pb-8 px-6 rounded-[32px] bg-white border-2 border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-2 h-full group">
                      {/* Icon Container */}
                      <div className="mb-6 flex justify-center">
                        <div className={`p-6 rounded-3xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold text-[#1A1F36] mb-4">{item.title}</h3>
                        <p className="text-[#6B7280] leading-relaxed text-base">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
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
                  <div className="flex gap-1 mb-4 justify-center">
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
              <PrimaryButton onClick={() => history.push('/analyze')}>
                Start Free Analysis
              </PrimaryButton>
              <SecondaryButton onClick={() => history.push('/help')} className="border-white text-white hover:bg-white hover:text-[#1A1F36]">
                Learn More
              </SecondaryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
