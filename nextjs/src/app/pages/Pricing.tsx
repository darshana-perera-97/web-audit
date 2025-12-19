import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '5 scans per month',
        'Basic SEO analysis',
        'Speed metrics',
        'Email support',
        'History (7 days)'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Lite',
      price: '$29',
      period: 'per month',
      features: [
        '100 scans per month',
        'Advanced SEO analysis',
        'All metrics',
        'Priority support',
        'History (30 days)',
        'Bulk analyze (10 URLs)',
        'Export reports',
        'API access'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'per month',
      features: [
        'Unlimited scans',
        'Complete analysis suite',
        'All premium features',
        '24/7 support',
        'Unlimited history',
        'Bulk analyze (unlimited)',
        'White-label reports',
        'Advanced API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-[#6B7280]">Choose the plan that's right for you</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-[24px] ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#1A1F36] to-[#0F1629] text-white border-2 border-[#10B981] transform scale-105'
                  : 'bg-white border border-gray-200'
              } shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#10B981] text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#1A1F36]'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-5xl font-semibold ${plan.highlighted ? 'text-white' : 'text-[#1A1F36]'}`}>
                  {plan.price}
                </span>
                <span className={`text-lg ${plan.highlighted ? 'text-gray-300' : 'text-[#6B7280]'}`}>
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 ${plan.highlighted ? 'text-[#10B981]' : 'text-[#10B981]'}`} />
                    <span className={plan.highlighted ? 'text-gray-200' : 'text-[#6B7280]'}>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.highlighted ? (
                <PrimaryButton className="w-full">{plan.cta}</PrimaryButton>
              ) : (
                <SecondaryButton className="w-full">{plan.cta}</SecondaryButton>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-[#6B7280] mb-4">All plans include a 14-day money-back guarantee</p>
          <p className="text-sm text-[#6B7280]">Need a custom plan? <a href="#" className="text-[#10B981] hover:underline">Contact us</a></p>
        </motion.div>
      </div>
    </div>
  );
}
