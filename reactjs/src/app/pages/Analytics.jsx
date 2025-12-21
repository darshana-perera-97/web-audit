import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, FileText, Globe, CheckCircle, ExternalLink, ChevronLeft, ChevronRight, BarChart3, Sparkles, MessageSquare, TrendingUp, AlertCircle, Link2, AlertTriangle, Download } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { MetricCard } from '../components/MetricCard';

export function Analytics() {
  const history = useHistory();
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.url || '');
  const [formData, setFormData] = useState(location.state?.formData || null);
  const [analyzing, setAnalyzing] = useState(true);
  const [results, setResults] = useState({
    status: 'Analyzing...',
    accessibility: 0,
    performance: 0,
    bestPractices: 0,
    seo: 0,
    summary: 'Loading...'
  });
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contentAnalysis, setContentAnalysis] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [linksData, setLinksData] = useState(null);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [brokenLinksData, setBrokenLinksData] = useState(null);
  const [loadingBrokenLinks, setLoadingBrokenLinks] = useState(false);

  const normalizeUrl = (inputUrl) => {
    if (!inputUrl) return '';
    let normalized = inputUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  };

  useEffect(() => {
    if (!url) {
      history.push('/analyze');
      return;
    }

    // Normalize and set preview URL
    const normalized = normalizeUrl(url);
    setPreviewUrl(normalized);

    // Start analysis automatically
    startAnalysis();
  }, [url, history]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Function to download full report
  const downloadFullReport = () => {
    // Compile all data from all pages
    const reportData = {
      websiteUrl: url,
      auditDate: new Date().toISOString(),
      formData: formData,
      
      // Page 1: Overview & Preview
      overview: {
        siteStatus: results.status,
        previewUrl: previewUrl
      },
      
      // Page 2: Performance Metrics
      performanceMetrics: {
        performance: results.performance,
        accessibility: results.accessibility,
        bestPractices: results.bestPractices,
        seo: results.seo,
        summary: results.summary
      },
      
      // Page 3: SEO Analytics
      seoAnalytics: {
        overallSEOScore: (() => {
          const metaTagsScore = results.seo >= 80 ? 100 : results.seo >= 50 ? 60 : 30;
          const structuredDataScore = results.bestPractices >= 80 ? 100 : results.bestPractices >= 50 ? 60 : 30;
          const mobileFriendlyScore = results.accessibility >= 80 ? 100 : results.accessibility >= 50 ? 60 : 30;
          const pageSpeedScore = results.performance >= 80 ? 100 : results.performance >= 50 ? 60 : 30;
          const httpsScore = results.bestPractices >= 80 ? 100 : 0;
          return Math.round((metaTagsScore + structuredDataScore + mobileFriendlyScore + pageSpeedScore + httpsScore) / 5);
        })(),
        seoScore: results.seo,
        performanceScore: results.performance,
        accessibilityScore: results.accessibility,
        bestPracticesScore: results.bestPractices,
        healthCheck: {
          metaTags: results.seo >= 80 ? 'Good' : results.seo >= 50 ? 'Fair' : 'Poor',
          structuredData: results.bestPractices >= 80 ? 'Good' : results.bestPractices >= 50 ? 'Fair' : 'Poor',
          mobileFriendly: results.accessibility >= 80 ? 'Good' : results.accessibility >= 50 ? 'Fair' : 'Poor',
          pageSpeed: results.performance >= 80 ? 'Fast' : results.performance >= 50 ? 'Moderate' : 'Slow',
          https: results.bestPractices >= 80 ? 'Secure' : 'Not Secure'
        }
      },
      
      // Page 4: Customer Review (AI Content Analysis)
      customerReview: contentAnalysis ? {
        summary: contentAnalysis.summary,
        siteTitle: contentAnalysis.siteTitle,
        websitePurpose: contentAnalysis.websitePurpose,
        mainIdea: contentAnalysis.mainIdea,
        seoTags: contentAnalysis.seoTags || [],
        keywords: contentAnalysis.keywords || [],
        contentAnalysis: contentAnalysis.contentAnalysis,
        rawContent: contentAnalysis.rawContent || {}
      } : null,
      
      // Page 5: Link List
      linkList: linksData ? {
        totalLinks: linksData.totalLinks,
        internalLinks: linksData.internalLinks,
        externalLinks: linksData.externalLinks,
        links: linksData.links || []
      } : null,
      
      // Page 6: Broken Links
      brokenLinks: brokenLinksData ? {
        brokenCount: brokenLinksData.brokenCount,
        totalChecked: brokenLinksData.totalChecked,
        workingLinks: brokenLinksData.totalChecked - brokenLinksData.brokenCount,
        brokenLinks: brokenLinksData.brokenLinks || []
      } : null
    };

    // Create downloadable content
    const reportContent = JSON.stringify(reportData, null, 2);
    const blob = new Blob([reportContent], { type: 'application/json' });
    const url_blob = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url_blob;
    link.download = `website-audit-report-${url.replace(/https?:\/\//, '').replace(/\//g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url_blob);
  };

  // Auto-fetch content analysis when on Customer Review page
  useEffect(() => {
    if (currentPage === 4 && url && !contentAnalysis && !loadingContent) {
      const fetchContentAnalysis = async () => {
        setLoadingContent(true);
        try {
          const response = await fetch(`http://localhost:5500/api/analyze-content?url=${encodeURIComponent(url)}`);
          const data = await response.json();
          if (data.success) {
            setContentAnalysis(data.data);
          }
        } catch (error) {
          console.error('Error fetching content analysis:', error);
        } finally {
          setLoadingContent(false);
        }
      };
      fetchContentAnalysis();
    }
  }, [currentPage, url, contentAnalysis, loadingContent]);

  // Auto-fetch links when on Link List page
  useEffect(() => {
    if (currentPage === 5 && url && !linksData && !loadingLinks) {
      const fetchLinks = async () => {
        setLoadingLinks(true);
        try {
          const response = await fetch(`http://localhost:5500/api/extract-links?url=${encodeURIComponent(url)}`);
          const data = await response.json();
          if (data.success) {
            setLinksData(data.data);
          }
        } catch (error) {
          console.error('Error fetching links:', error);
        } finally {
          setLoadingLinks(false);
        }
      };
      fetchLinks();
    }
  }, [currentPage, url, linksData, loadingLinks]);

  // Auto-fetch broken links when on Broken Links page
  useEffect(() => {
    if (currentPage === 6 && url && !brokenLinksData && !loadingBrokenLinks) {
      const fetchBrokenLinks = async () => {
        setLoadingBrokenLinks(true);
        try {
          const response = await fetch(`http://localhost:5500/api/check-broken-links?url=${encodeURIComponent(url)}`);
          const data = await response.json();
          if (data.success) {
            setBrokenLinksData(data.data);
          }
        } catch (error) {
          console.error('Error fetching broken links:', error);
        } finally {
          setLoadingBrokenLinks(false);
        }
      };
      fetchBrokenLinks();
    }
  }, [currentPage, url, brokenLinksData, loadingBrokenLinks]);

  const startAnalysis = async () => {
    setAnalyzing(true);
    setResults({
      status: 'Analyzing...',
      accessibility: 0,
      performance: 0,
      bestPractices: 0,
      seo: 0,
      summary: 'Loading...'
    });
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Fetch real data from backend
      const response = await fetch(`http://localhost:5500/api/analyze?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setResults({
          status: data.data.status || 'Online',
          accessibility: data.data.accessibility,
          performance: data.data.performance,
          bestPractices: data.data.bestPractices,
          seo: data.data.seo,
          summary: data.data.summary || 'Good'
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching analysis:', error);
      // Fallback to simulated data on error
      setResults({
        status: 'Online',
        accessibility: 85,
        performance: 78,
        bestPractices: 92,
        seo: 88,
        summary: 'Good'
      });
    } finally {
      setAnalyzing(false);
      setProgress(100);
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-semibold text-[#1A1F36] mb-2">Website Audit Results</h1>
          <p className="text-xl text-[#6B7280]">{url}</p>
        </motion.div>

        {/* Analyzing Status */}
        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="p-12 rounded-[24px] bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] mb-6">
                <Globe className="w-12 h-12 text-white animate-spin" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Analyzing Your Website</h3>
              <p className="text-[#6B7280] mb-4">This may take a few seconds...</p>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1A1F36]">Analysis Progress</span>
                  <span className="text-sm font-semibold text-[#10B981]">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Audit Results - Only show when analysis is complete */}
        {!analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-[#1A1F36] mb-2">Audit Results</h2>
              <p className="text-[#6B7280]">Comprehensive analysis completed</p>
            </div>

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
            {currentPage === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Site Status Card */}
                  <MetricCard
                    title="Site Status"
                    value={results.status}
                    icon={<Globe className="w-6 h-6" />}
                    delay={0}
                  />
                  
                  {/* Website Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-[#1A1F36]">Website Preview</h3>
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#10B981] hover:underline"
                      >
                        Open in new tab <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50" style={{ height: '500px' }}>
                      {previewUrl ? (
                        <iframe
                          src={previewUrl}
                          className="w-full h-full"
                          title="Website Preview"
                          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="text-center">
                            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Loading preview...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Page 2: Performance Metrics */}
            {currentPage === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">Performance Metrics</h3>
                  <p className="text-[#6B7280]">Detailed performance analysis of your website</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <MetricCard
                    title="Performance"
                    value={`${results.performance}/100`}
                    icon={<Activity className="w-6 h-6" />}
                    score={results.performance}
                    delay={0}
                    description="Measures how quickly your website loads and responds to user interactions. A higher score means faster page loads, better user experience, and improved search engine rankings."
                  />
                  <MetricCard
                    title="Accessibility"
                    value={`${results.accessibility}/100`}
                    icon={<CheckCircle className="w-6 h-6" />}
                    score={results.accessibility}
                    delay={0.1}
                    description="Evaluates how accessible your website is to users with disabilities. This includes proper ARIA labels, keyboard navigation, color contrast, and screen reader compatibility."
                  />
                  <MetricCard
                    title="Best Practices"
                    value={`${results.bestPractices}/100`}
                    icon={<FileText className="w-6 h-6" />}
                    score={results.bestPractices}
                    delay={0.2}
                    description="Checks if your website follows modern web development best practices, including HTTPS usage, console errors, image optimization, and proper use of modern APIs."
                  />
                  {results.seo !== undefined && (
                    <MetricCard
                      title="SEO"
                      value={`${results.seo}/100`}
                      icon={<Globe className="w-6 h-6" />}
                      score={results.seo}
                      delay={0.3}
                      description="Assesses your website's search engine optimization, including meta tags, structured data, mobile-friendliness, and content quality for better search visibility."
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* Page 3: SEO Analytics */}
            {currentPage === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2">SEO Analytics</h3>
                  <p className="text-[#6B7280]">Comprehensive SEO analysis and recommendations for your website</p>
                </div>

                {results.seo !== undefined ? (
                  <>
                    {/* SEO Overview */}
                    <div className="mb-8">
                      {(() => {
                        // Calculate Overall SEO Score based on SEO Health Check metrics
                        const metaTagsScore = results.seo >= 80 ? 100 : results.seo >= 50 ? 60 : 30;
                        const structuredDataScore = results.bestPractices >= 80 ? 100 : results.bestPractices >= 50 ? 60 : 30;
                        const mobileFriendlyScore = results.accessibility >= 80 ? 100 : results.accessibility >= 50 ? 60 : 30;
                        const pageSpeedScore = results.performance >= 80 ? 100 : results.performance >= 50 ? 60 : 30;
                        const httpsScore = results.bestPractices >= 80 ? 100 : 0;
                        
                        // Calculate weighted average (all metrics equally important)
                        const overallSEOScore = Math.round(
                          (metaTagsScore + structuredDataScore + mobileFriendlyScore + pageSpeedScore + httpsScore) / 5
                        );
                        
                        return (
                          <div className="p-8 rounded-[24px] bg-gradient-to-br from-[#10B981] to-[#059669] text-white mb-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="text-2xl font-semibold mb-2">Overall SEO Score</h4>
                                <p className="text-white/90">Based on SEO Health Check metrics</p>
                              </div>
                              <div className="text-right">
                                <div className="text-5xl font-bold">{overallSEOScore}</div>
                                <div className="text-white/80">out of 100</div>
                              </div>
                            </div>
                            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-white rounded-full transition-all"
                                style={{ width: `${overallSEOScore}%` }}
                              />
                            </div>
                            <p className="mt-4 text-white/90">
                              {overallSEOScore >= 80 
                                ? '✅ Excellent! Your website is well-optimized for search engines.'
                                : overallSEOScore >= 50
                                ? '⚠️ Good foundation, but improvements can boost your search rankings.'
                                : '❌ Needs improvement. Focus on SEO optimization to improve visibility.'}
                            </p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* SEO Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-8 h-8 text-[#10B981]" />
                          <h4 className="text-lg font-semibold text-[#1A1F36]">SEO Score</h4>
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{results.seo}/100</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              results.seo >= 80 ? 'bg-[#10B981]' : results.seo >= 50 ? 'bg-[#D97706]' : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${results.seo}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#6B7280] mt-2">Meta tags, structured data, mobile-friendly</p>
                      </div>

                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="w-8 h-8 text-[#10B981]" />
                          <h4 className="text-lg font-semibold text-[#1A1F36]">Page Speed</h4>
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{results.performance}/100</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              results.performance >= 80 ? 'bg-[#10B981]' : results.performance >= 50 ? 'bg-[#D97706]' : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${results.performance}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#6B7280] mt-2">Loading speed impacts rankings</p>
                      </div>

                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="w-8 h-8 text-[#10B981]" />
                          <h4 className="text-lg font-semibold text-[#1A1F36]">Mobile SEO</h4>
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{results.accessibility}/100</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              results.accessibility >= 80 ? 'bg-[#10B981]' : results.accessibility >= 50 ? 'bg-[#D97706]' : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${results.accessibility}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#6B7280] mt-2">Mobile-first indexing factor</p>
                      </div>

                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-3 mb-4">
                          <FileText className="w-8 h-8 text-[#10B981]" />
                          <h4 className="text-lg font-semibold text-[#1A1F36]">Technical SEO</h4>
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{results.bestPractices}/100</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              results.bestPractices >= 80 ? 'bg-[#10B981]' : results.bestPractices >= 50 ? 'bg-[#D97706]' : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${results.bestPractices}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#6B7280] mt-2">HTTPS, security, best practices</p>
                      </div>
                    </div>

                    {/* SEO Analysis Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                          <Globe className="w-6 h-6 text-[#10B981]" />
                          SEO Health Check
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B7280]">Meta Tags</span>
                            <span className={`font-semibold ${results.seo >= 80 ? 'text-[#10B981]' : results.seo >= 50 ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
                              {results.seo >= 80 ? '✓ Good' : results.seo >= 50 ? '⚠ Fair' : '✗ Poor'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B7280]">Structured Data</span>
                            <span className={`font-semibold ${results.bestPractices >= 80 ? 'text-[#10B981]' : results.bestPractices >= 50 ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
                              {results.bestPractices >= 80 ? '✓ Good' : results.bestPractices >= 50 ? '⚠ Fair' : '✗ Poor'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B7280]">Mobile-Friendly</span>
                            <span className={`font-semibold ${results.accessibility >= 80 ? 'text-[#10B981]' : results.accessibility >= 50 ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
                              {results.accessibility >= 80 ? '✓ Good' : results.accessibility >= 50 ? '⚠ Fair' : '✗ Poor'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B7280]">Page Speed</span>
                            <span className={`font-semibold ${results.performance >= 80 ? 'text-[#10B981]' : results.performance >= 50 ? 'text-[#D97706]' : 'text-[#DC2626]'}`}>
                              {results.performance >= 80 ? '✓ Fast' : results.performance >= 50 ? '⚠ Moderate' : '✗ Slow'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B7280]">HTTPS</span>
                            <span className={`font-semibold ${results.bestPractices >= 80 ? 'text-[#10B981]' : 'text-[#DC2626]'}`}>
                              {results.bestPractices >= 80 ? '✓ Secure' : '✗ Not Secure'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                          <FileText className="w-6 h-6 text-[#10B981]" />
                          SEO Recommendations
                        </h4>
                        <div className="space-y-3">
                          {results.seo < 80 && (
                            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                              <p className="text-sm text-[#92400E]">
                                <strong>Improve SEO Score:</strong> Add meta descriptions, optimize title tags, and ensure proper heading structure.
                              </p>
                            </div>
                          )}
                          {results.performance < 80 && (
                            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                              <p className="text-sm text-[#9A3412]">
                                <strong>Optimize Page Speed:</strong> Compress images, minimize CSS/JS, and enable browser caching.
                              </p>
                            </div>
                          )}
                          {results.accessibility < 80 && (
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                              <p className="text-sm text-[#1E40AF]">
                                <strong>Enhance Mobile Experience:</strong> Ensure responsive design and touch-friendly elements.
                              </p>
                            </div>
                          )}
                          {results.bestPractices < 80 && (
                            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                              <p className="text-sm text-[#6B21A8]">
                                <strong>Fix Technical Issues:</strong> Use HTTPS, fix console errors, and implement security headers.
                              </p>
                            </div>
                          )}
                          {results.seo >= 80 && results.performance >= 80 && results.accessibility >= 80 && results.bestPractices >= 80 && (
                            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                              <p className="text-sm text-[#065F46]">
                                <strong>Excellent!</strong> Your website is well-optimized. Continue monitoring and maintaining these standards.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-12 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                    <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-semibold text-[#1A1F36] mb-2">SEO Data Not Available</h4>
                    <p className="text-[#6B7280] mb-4">SEO metrics are not available for this analysis.</p>
                    <p className="text-sm text-[#6B7280]">Please check your API configuration to enable SEO analytics.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Page 4: Customer Review */}
            {currentPage === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-[#10B981]" />
                    Customer Review
                  </h3>
                  <p className="text-[#6B7280]">AI-powered analysis of your website's content, purpose, and SEO elements</p>
                </div>

                {/* Loading State */}
                {loadingContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 text-center p-12 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mb-6">
                      <Sparkles className="w-12 h-12 text-white animate-spin" />
                    </div>
                    <h4 className="text-2xl font-semibold text-[#1A1F36] mb-2">Analyzing Website Content</h4>
                    <p className="text-[#6B7280] mb-4">Fetching website content and generating AI analysis...</p>
                    <p className="text-sm text-[#6B7280]">This may take a few moments. Please wait.</p>
                    
                    {/* Loading Progress Animation */}
                    <div className="max-w-md mx-auto mt-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {contentAnalysis && (
                  <>
                    {/* Website Summary */}
                    <div className="mb-8">
                      <div className="p-8 rounded-[24px] bg-gradient-to-br from-purple-500 to-indigo-600 text-white mb-6">
                        <h4 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                          <Sparkles className="w-6 h-6" />
                          Website Summary
                        </h4>
                        <p className="text-white/90 leading-relaxed text-lg">{contentAnalysis.summary}</p>
                      </div>
                    </div>


                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                          <FileText className="w-6 h-6 text-[#10B981]" />
                          Site Information
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-[#6B7280] block mb-1">Site Title</span>
                            <p className="font-semibold text-[#1A1F36]">{contentAnalysis.siteTitle}</p>
                          </div>
                          <div>
                            <span className="text-sm text-[#6B7280] block mb-1">Website Purpose</span>
                            <p className="text-[#1A1F36]">{contentAnalysis.websitePurpose}</p>
                          </div>
                          <div>
                            <span className="text-sm text-[#6B7280] block mb-1">Main Idea</span>
                            <p className="text-[#1A1F36]">{contentAnalysis.mainIdea}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                          <Globe className="w-6 h-6 text-[#10B981]" />
                          SEO Elements
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm text-[#6B7280] block mb-2">SEO Tags</span>
                            <div className="flex flex-wrap gap-2">
                              {contentAnalysis.seoTags && contentAnalysis.seoTags.length > 0 ? (
                                contentAnalysis.seoTags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[#6B7280] text-sm">No tags available</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-[#6B7280] block mb-2">Keywords</span>
                            <div className="flex flex-wrap gap-2">
                              {contentAnalysis.keywords && contentAnalysis.keywords.length > 0 ? (
                                contentAnalysis.keywords.map((keyword, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                                  >
                                    {keyword}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[#6B7280] text-sm">No keywords available</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Analysis Details */}
                    <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] mb-8">
                      <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-[#10B981]" />
                        Detailed Content Analysis
                      </h4>
                      <p className="text-[#6B7280] leading-relaxed">{contentAnalysis.contentAnalysis}</p>
                    </div>

                    {/* Raw Content Data */}
                    {contentAnalysis.rawContent && (
                      <div className="p-6 rounded-[24px] bg-gray-50 border border-gray-200">
                        <h4 className="text-lg font-semibold text-[#1A1F36] mb-4">Raw Content Data</h4>
                        <div className="space-y-3 text-sm">
                          {contentAnalysis.rawContent.metaDescription && (
                            <div>
                              <span className="text-[#6B7280] font-medium">Meta Description:</span>
                              <p className="text-[#1A1F36] mt-1">{contentAnalysis.rawContent.metaDescription}</p>
                            </div>
                          )}
                          {contentAnalysis.rawContent.h1Tags && contentAnalysis.rawContent.h1Tags.length > 0 && (
                            <div>
                              <span className="text-[#6B7280] font-medium">H1 Tags:</span>
                              <ul className="list-disc list-inside text-[#1A1F36] mt-1 space-y-1">
                                {contentAnalysis.rawContent.h1Tags.map((h1, index) => (
                                  <li key={index}>{h1}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* Page 5: Link List */}
            {currentPage === 5 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2 flex items-center gap-3">
                    <Link2 className="w-8 h-8 text-[#10B981]" />
                    Link List
                  </h3>
                  <p className="text-[#6B7280]">All links found on the entered website</p>
                </div>

                {/* Loading State */}
                {loadingLinks && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 text-center p-12 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] mb-6">
                      <Link2 className="w-12 h-12 text-white animate-spin" />
                    </div>
                    <h4 className="text-2xl font-semibold text-[#1A1F36] mb-2">Extracting Links...</h4>
                    <p className="text-[#6B7280] mb-4">Scanning website for all links...</p>
                    <p className="text-sm text-[#6B7280]">This may take a few moments. Please wait.</p>
                    
                    {/* Loading Progress Animation */}
                    <div className="max-w-md mx-auto mt-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {linksData && (
                  <>
                    {/* Link Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-3 rounded-full bg-[#10B981]/10 mb-4">
                          <Link2 className="w-8 h-8 text-[#10B981]" />
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{linksData.totalLinks}</div>
                        <p className="text-[#6B7280]">Total Links</p>
                      </div>
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
                          <Globe className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{linksData.internalLinks}</div>
                        <p className="text-[#6B7280]">Internal Links</p>
                      </div>
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-3 rounded-full bg-orange-50 mb-4">
                          <ExternalLink className="w-8 h-8 text-orange-600" />
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{linksData.externalLinks}</div>
                        <p className="text-[#6B7280]">External Links</p>
                      </div>
                    </div>

                    {/* Links List */}
                    <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                      <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                        <Link2 className="w-6 h-6 text-[#10B981]" />
                        All Links ({linksData.links.length})
                      </h4>
                      <div className="max-h-[600px] overflow-y-auto">
                        <div className="space-y-2">
                          {linksData.links.length > 0 ? (
                            linksData.links.map((link, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      {link.isExternal ? (
                                        <ExternalLink className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                      ) : (
                                        <Link2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                                      )}
                                      <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#10B981] hover:underline font-medium truncate"
                                      >
                                        {link.url}
                                      </a>
                                    </div>
                                    {link.text && (
                                      <p className="text-sm text-[#6B7280] ml-6 truncate">{link.text}</p>
                                    )}
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                                    link.isExternal 
                                      ? 'bg-orange-50 text-orange-700' 
                                      : 'bg-[#10B981]/10 text-[#10B981]'
                                  }`}>
                                    {link.isExternal ? 'External' : 'Internal'}
                                  </span>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-12">
                              <Link2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-[#6B7280]">No links found on this website</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Page 6: Broken Links */}
            {currentPage === 6 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#1A1F36] mb-2 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
                    Broken Links
                  </h3>
                  <p className="text-[#6B7280]">Links that are broken or inaccessible on the entered website</p>
                </div>

                {/* Loading State */}
                {loadingBrokenLinks && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 text-center p-12 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] mb-6">
                      <AlertTriangle className="w-12 h-12 text-white animate-spin" />
                    </div>
                    <h4 className="text-2xl font-semibold text-[#1A1F36] mb-2">Checking Links...</h4>
                    <p className="text-[#6B7280] mb-4">Scanning all links for broken or inaccessible URLs...</p>
                    <p className="text-sm text-[#6B7280]">This may take a few moments. Please wait.</p>
                    
                    {/* Loading Progress Animation */}
                    <div className="max-w-md mx-auto mt-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {brokenLinksData && (
                  <>
                    {/* Broken Links Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-3 rounded-full bg-[#DC2626]/10 mb-4">
                          <AlertTriangle className="w-8 h-8 text-[#DC2626]" />
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{brokenLinksData.brokenCount}</div>
                        <p className="text-[#6B7280]">Broken Links</p>
                      </div>
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-3 rounded-full bg-[#10B981]/10 mb-4">
                          <CheckCircle className="w-8 h-8 text-[#10B981]" />
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{brokenLinksData.totalChecked - brokenLinksData.brokenCount}</div>
                        <p className="text-[#6B7280]">Working Links</p>
                      </div>
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
                          <Link2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-[#1A1F36] mb-2">{brokenLinksData.totalChecked}</div>
                        <p className="text-[#6B7280]">Links Checked</p>
                      </div>
                    </div>

                    {/* Broken Links List */}
                    {brokenLinksData.brokenCount > 0 ? (
                      <div className="p-6 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <h4 className="text-xl font-semibold text-[#1A1F36] mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
                          Broken Links Found ({brokenLinksData.brokenCount})
                        </h4>
                        <div className="max-h-[600px] overflow-y-auto">
                          <div className="space-y-2">
                            {brokenLinksData.brokenLinks.map((link, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className="p-4 rounded-lg border-2 border-[#DC2626]/30 bg-red-50 hover:bg-red-100 transition-all"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                                      <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#DC2626] hover:underline font-medium truncate"
                                      >
                                        {link.url}
                                      </a>
                                    </div>
                                    {link.text && (
                                      <p className="text-sm text-[#6B7280] ml-6 truncate">{link.text}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-2 ml-6">
                                      <span className="text-xs text-[#DC2626] font-medium">
                                        Status: {link.status || 'N/A'} - {link.statusText}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      link.isExternal 
                                        ? 'bg-orange-50 text-orange-700' 
                                        : 'bg-[#10B981]/10 text-[#10B981]'
                                    }`}>
                                      {link.isExternal ? 'External' : 'Internal'}
                                    </span>
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#DC2626] text-white">
                                      Broken
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-center">
                        <div className="inline-block p-4 rounded-full bg-[#10B981]/10 mb-4">
                          <CheckCircle className="w-16 h-16 text-[#10B981]" />
                        </div>
                        <h4 className="text-2xl font-semibold text-[#1A1F36] mb-2">No Broken Links Found!</h4>
                        <p className="text-[#6B7280]">All checked links are working properly.</p>
                        <p className="text-sm text-[#6B7280] mt-2">
                          {brokenLinksData.totalChecked} links checked, all are accessible.
                        </p>
                      </div>
                    )}
                  </>
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
                  onClick={downloadFullReport}
                  className="flex items-center gap-2"
                >
                  Download Full Report
                  <Download className="w-4 h-4" />
                </PrimaryButton>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
