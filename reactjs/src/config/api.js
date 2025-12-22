// Backend API Configuration
// When hosted on the same server, use relative paths
// For development, you can use absolute URL: 'http://localhost:5500'
const API_BASE_URL = 'https://smartclass.nexgenai.asia/';
// const API_BASE_URL = 'http://localhost:5500';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  ANALYZE: `${API_BASE_URL}/api/analyze`,
  ANALYZE_CONTENT: `${API_BASE_URL}/api/analyze-content`,
  EXTRACT_LINKS: `${API_BASE_URL}/api/extract-links`,
  CHECK_BROKEN_LINKS: `${API_BASE_URL}/api/check-broken-links`,
  REPORTS: `${API_BASE_URL}/api/reports`,
  GET_REPORT: (reportId) => `${API_BASE_URL}/api/reports/${reportId}`,
};

export default API_ENDPOINTS;
