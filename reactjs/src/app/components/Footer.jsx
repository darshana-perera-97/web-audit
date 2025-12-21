import { Link } from 'react-router-dom';
import { Activity, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API Documentation', href: '/help' },
      { name: 'Changelog', href: '/help' }
    ],
    company: [
      { name: 'About Us', href: '/help' },
      { name: 'Blog', href: '/help' },
      { name: 'Careers', href: '/help' },
      { name: 'Contact', href: '/help' }
    ],
    resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/help' },
      { name: 'Community', href: '/help' },
      { name: 'Status', href: '/help' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/help' },
      { name: 'Terms of Service', href: '/help' },
      { name: 'Cookie Policy', href: '/help' },
      { name: 'GDPR', href: '/help' }
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1A1F36] to-[#0F1629] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669]">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-semibold">SitePulse</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Get instant insights into your website's performance, SEO health, speed score, and backlinks. Make data-driven decisions to grow your online presence.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-5 h-5" />
              <a href="mailto:support@sitepulse.com" className="hover:text-[#10B981] transition-colors">
                support@sitepulse.com
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#10B981] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#10B981] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#10B981] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#10B981] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SitePulse. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#10B981] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
