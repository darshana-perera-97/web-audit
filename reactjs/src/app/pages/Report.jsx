import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, FileText, Globe, CheckCircle, ExternalLink, ChevronLeft, ChevronRight, BarChart3, Sparkles, MessageSquare, TrendingUp, AlertCircle, Link2, AlertTriangle, Loader2, Shield } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { MetricCard } from '../components/MetricCard';
import { API_ENDPOINTS } from '../../config/api';

export function Report() {
  const history = useHistory();
  const { reportId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (reportId) {
      fetchReport();
    } else {
      setError('Report ID is missing');
      setLoading(false);
    }
  }, [reportId]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const fetchReport = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_REPORT(reportId));
      const result = await response.json();
      
      if (result.success && result.data) {
        setReportData(result.data);
      } else {
        setError('Report not found');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      setError('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-[#10B981] animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">Loading report...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-md"
        >
          <AlertCircle className="w-16 h-16 text-[#DC2626] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#1A1F36] mb-2">Report Not Found</h2>
          <p className="text-[#6B7280] mb-6">{error || 'The report you are looking for does not exist.'}</p>
          <PrimaryButton onClick={() => history.push('/')}>
            Go to Home
          </PrimaryButton>
        </motion.div>
      </div>
    );
  }

  const { websiteUrl, overview, performanceMetrics, seoAnalytics, customerReview, linkList, brokenLinks, auditDate } = reportData;
  const results = performanceMetrics || {};

  // Calculate Domain Authority (same logic as Analytics page)
  const calculateDomainAuthority = () => {
    if (seoAnalytics && seoAnalytics.domainAuthority !== undefined) {
      return seoAnalytics.domainAuthority;
    }
    // Fallback calculation if not in saved data
    let daScore = 0;
    if (linkList && linkList.externalLinks) {
      const externalLinks = linkList.externalLinks;
      const linkScore = Math.min(40, Math.log10(externalLinks + 1) * 10);
      daScore += linkScore;
    }
    if (linkList && linkList.internalLinks) {
      const internalLinks = linkList.internalLinks;
      const internalScore = Math.min(15, (internalLinks / 50) * 15);
      daScore += internalScore;
    }
    if (results.seo !== undefined) {
      daScore += (results.seo / 100) * 20;
    }
    if (results.performance !== undefined) {
      daScore += (results.performance / 100) * 15;
    }
    if (results.bestPractices !== undefined) {
      daScore += (results.bestPractices / 100) * 10;
    }
    return Math.min(100, Math.max(0, Math.round(daScore)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-semibold text-[#1A1F36] mb-2">Website Audit Report</h1>
          <p className="text-xl text-[#6B7280]">{websiteUrl}</p>
          {auditDate && (
            <p className="text-sm text-[#6B7280] mt-1">
              Generated on {new Date(auditDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Navigation Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <div key={page} className="flex items-center">
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg scale-110'
                        : currentPage > page
                        ? 'bg-[#10B981] text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                  {page < 6 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all ${
                        currentPage > page ? 'bg-[#10B981]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-[#6B7280]">
                {currentPage === 1 && 'Overview & Preview'}
                {currentPage === 2 && 'Performance Metrics'}
                {currentPage === 3 && 'SEO Analytics'}
                {currentPage === 4 && 'Customer Review'}
                {currentPage === 5 && 'Link List'}
                {currentPage === 6 && 'Broken Links'}
              </p>
            </div>
          </div>

          {/* Page 1: Overview & Preview */}
          {currentPage === 1 && overview && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <MetricCard
                  title="Site Status"
                  value={overview.siteStatus || 'Online'}
                  icon={<Globe className="w-6 h-6" />}
                  delay={0}
                />
                
                {overview.previewUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-[#1A1F36]">Website Preview</h3>
                      <a
                        href={overview.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#10B981] hover:underline"
                      >
                        Open in new tab <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50" style={{ height: '500px' }}>
                      <iframe
                        src={overview.previewUrl}
                        className="w-full h-full"
                        title="Website Preview"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Page 2: Performance Metrics */}
          {currentPage === 2 && performanceMetrics && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Performance Metrics</h3>
                <p className="text-[#6B7280]">Detailed performance analysis of your website</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                  title="Performance"
                  value={`${performanceMetrics.performance}/100`}
                  icon={<Activity className="w-6 h-6" />}
                  score={performanceMetrics.performance}
                  delay={0}
                />
                <MetricCard
                  title="Accessibility"
                  value={`${performanceMetrics.accessibility}/100`}
                  icon={<CheckCircle className="w-6 h-6" />}
                  score={performanceMetrics.accessibility}
                  delay={0.1}
                />
                <MetricCard
                  title="Best Practices"
                  value={`${performanceMetrics.bestPractices}/100`}
                  icon={<FileText className="w-6 h-6" />}
                  score={performanceMetrics.bestPractices}
                  delay={0.2}
                />
                {performanceMetrics.seo !== undefined && (
                  <MetricCard
                    title="SEO"
                    value={`${performanceMetrics.seo}/100`}
                    icon={<Globe className="w-6 h-6" />}
                    score={performanceMetrics.seo}
                    delay={0.3}
                  />
                )}
              </div>
              {performanceMetrics.summary && (
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Summary</h4>
                  <p className="text-[#6B7280]">{performanceMetrics.summary}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Page 3: SEO Analytics */}
          {currentPage === 3 && seoAnalytics && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">SEO Analytics</h3>
                <p className="text-[#6B7280]">Comprehensive SEO analysis and recommendations</p>
              </div>

              {/* Domain Authority - Hidden for now */}
              {seoAnalytics.overallSEOScore !== undefined && (
                <div className="p-8 rounded-[24px] bg-gradient-to-br from-[#10B981] to-[#059669] text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-semibold mb-2">Overall SEO Score</h4>
                      <p className="text-white/90">Based on SEO Health Check metrics</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold">{seoAnalytics.overallSEOScore}</div>
                      <div className="text-white/80">out of 100</div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${seoAnalytics.overallSEOScore}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Domain Authority Card - Hidden for now */}
              {/* <div className="p-8 rounded-[24px] bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      Domain Authority
                    </h4>
                    <p className="text-white/90">Based on link profile & site quality</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold">{calculateDomainAuthority()}</div>
                    <div className="text-white/80">out of 100</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${calculateDomainAuthority()}%` }}
                  />
                </div>
                {linkList && (
                  <p className="mt-4 text-white/90 text-sm">
                    {linkList.externalLinks || 0} backlinks • {linkList.internalLinks || 0} internal links
                  </p>
                )}
              </div> */}

              {seoAnalytics.healthCheck && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(seoAnalytics.healthCheck).map(([key, value]) => (
                    <div key={key} className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                      <h4 className="text-lg font-semibold text-[#1A1F36] mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className={`text-2xl font-bold ${
                        value === 'Good' || value === 'Secure' || value === 'Fast'
                          ? 'text-[#10B981]'
                          : value === 'Fair' || value === 'Moderate'
                          ? 'text-[#D97706]'
                          : 'text-[#DC2626]'
                      }`}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Page 4: Customer Review */}
          {currentPage === 4 && customerReview && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Content Analysis</h3>
                <p className="text-[#6B7280]">AI-powered content review and insights</p>
              </div>

              <div className="space-y-6">
                {customerReview.summary && (
                  <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Summary</h4>
                    <p className="text-[#6B7280]">{customerReview.summary}</p>
                  </div>
                )}

                {customerReview.siteTitle && (
                  <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Site Title</h4>
                    <p className="text-[#6B7280]">{customerReview.siteTitle}</p>
                  </div>
                )}

                {customerReview.websitePurpose && (
                  <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Website Purpose</h4>
                    <p className="text-[#6B7280]">{customerReview.websitePurpose}</p>
                  </div>
                )}

                {customerReview.seoTags && customerReview.seoTags.length > 0 && (
                  <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">SEO Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {customerReview.seoTags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Page 5: Link List */}
          {currentPage === 5 && linkList && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Link Analysis</h3>
                <p className="text-[#6B7280]">All links found on your website</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Total Links</h4>
                  <p className="text-3xl font-bold text-[#10B981]">{linkList.totalLinks || 0}</p>
                </div>
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Internal Links</h4>
                  <p className="text-3xl font-bold text-[#10B981]">{linkList.internalLinks || 0}</p>
                </div>
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">External Links</h4>
                  <p className="text-3xl font-bold text-[#10B981]">{linkList.externalLinks || 0}</p>
                </div>
              </div>

              {linkList.links && linkList.links.length > 0 && (
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-4">All Links</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {linkList.links.map((link, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#10B981] hover:underline flex-1 truncate"
                          >
                            {link.text || link.url}
                          </a>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            link.isExternal 
                              ? 'bg-orange-50 text-orange-700' 
                              : 'bg-[#10B981]/10 text-[#10B981]'
                          }`}>
                            {link.isExternal ? 'External' : 'Internal'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Page 6: Broken Links */}
          {currentPage === 6 && brokenLinks && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Broken Links Analysis</h3>
                <p className="text-[#6B7280]">Links that need attention</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Total Checked</h4>
                  <p className="text-3xl font-bold text-[#10B981]">{brokenLinks.totalChecked || 0}</p>
                </div>
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Broken Links</h4>
                  <p className="text-3xl font-bold text-[#DC2626]">{brokenLinks.brokenCount || 0}</p>
                </div>
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-2">Working Links</h4>
                  <p className="text-3xl font-bold text-[#10B981]">{brokenLinks.workingLinks || 0}</p>
                </div>
              </div>

              {brokenLinks.brokenLinks && brokenLinks.brokenLinks.length > 0 ? (
                <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-semibold text-[#1A1F36] mb-4">Broken Links List</h4>
                  <div className="space-y-3">
                    {brokenLinks.brokenLinks.map((link, index) => (
                      <div key={index} className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#DC2626] hover:underline flex-1 truncate"
                          >
                            {link.text || link.url}
                          </a>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#DC2626] text-white">
                            Status: {link.status || 'Unknown'}
                          </span>
                        </div>
                        {link.statusText && (
                          <p className="text-sm text-[#6B7280]">{link.statusText}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                  <div className="inline-block p-4 rounded-full bg-[#10B981]/10 mb-4">
                    <CheckCircle className="w-16 h-16 text-[#10B981]" />
                  </div>
                  <h4 className="text-2xl font-semibold text-[#1A1F36] mb-2">No Broken Links Found!</h4>
                  <p className="text-[#6B7280]">All checked links are working properly.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <SecondaryButton
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </SecondaryButton>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === page ? 'bg-[#10B981] w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {currentPage < 6 ? (
              <PrimaryButton
                onClick={() => setCurrentPage(Math.min(6, currentPage + 1))}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </PrimaryButton>
            ) : (
              <PrimaryButton
                onClick={() => history.push('/')}
                className="flex items-center gap-2"
              >
                Back to Home
              </PrimaryButton>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
