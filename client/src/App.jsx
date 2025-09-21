
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import PerformanceChart from './PerformanceChart';
import axios from 'axios';

function AnalyzePage() {
  const [url, setUrl] = useState('');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetchData = async () => {
    if (!url) {
      setError('Please enter a website URL.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
      const response = await axios.post(`${backendUrl}/analyze`, { url });
      setPerformanceData(response.data);
    } catch (err) {
      let errorMsg = 'Error fetching performance data.';
      if (err.response && err.response.data && err.response.data.error) {
        errorMsg += ` ${err.response.data.error}`;
      }
      setError(errorMsg);
      console.error('Error fetching performance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-xl font-bold text-gray-900">SpeedX</span>
          </div>

        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Removed hero section for cleaner look */}

        {/* URL Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/90 backdrop-blur-sm shadow-xl border-2 hover:border-blue-200 transition-all duration-300 rounded-lg">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900">Enter Website URL</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  onKeyPress={handleKeyPress}
                  placeholder="https://example.com"
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />

                <button
                  onClick={handleFetchData}
                  disabled={loading || !url.trim()}
                  className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing Performance...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      Analyze Performance
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="border-red-200 bg-red-50/80 backdrop-blur-sm rounded-lg border-2">
              <div className="p-6">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-800">Analysis Error</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
              <div className="p-12 text-center">
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Performance</h3>
                  <p className="text-gray-600">Running comprehensive Lighthouse tests on your website...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {performanceData && !loading && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Performance Analysis Results</h2>
              <p className="text-gray-600">Comprehensive metrics for {url}</p>
            </div>

            {/* Lighthouse Scores */}
            {performanceData.lighthouseScores && (
              <div className="mb-8">
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Lighthouse Scores</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
                      {/* Performance Score */}
                      {performanceData.lighthouseScores.performance !== null && (
                        <div className="bg-yellow-50 rounded-xl p-8 text-center">
                          <div className="text-3xl font-bold mb-2 text-yellow-700">{Math.round(performanceData.lighthouseScores.performance * 100)}</div>
                          <div className="text-lg font-medium text-yellow-700">Performance</div>
                        </div>
                      )}
                      {/* FCP Metric */}
                      {performanceData.metrics?.fcp !== null && (
                        <div className="bg-blue-50 rounded-xl p-8 text-center">
                          <div className="text-3xl font-bold mb-2 text-blue-700">{performanceData.metrics.fcp > 1000 ? `${(performanceData.metrics.fcp / 1000).toFixed(1)}s` : `${Math.round(performanceData.metrics.fcp)}ms`}</div>
                          <div className="text-lg font-medium text-blue-700">FCP</div>
                        </div>
                      )}
                      {/* TTI Metric */}
                      {performanceData.metrics?.tti !== null && (
                        <div className="bg-purple-50 rounded-xl p-8 text-center">
                          <div className="text-3xl font-bold mb-2 text-purple-700">{performanceData.metrics.tti > 1000 ? `${(performanceData.metrics.tti / 1000).toFixed(1)}s` : `${Math.round(performanceData.metrics.tti)}ms`}</div>
                          <div className="text-lg font-medium text-purple-700">TTI</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            {performanceData.metrics && (
              <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Core Web Vitals & Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(performanceData.metrics).map(([key, value]) => {
                      if (value === null) return null;
                      // Tooltip descriptions for each metric
                      const metricDescriptions = {
                        fcp: 'First Contentful Paint: Time until the first text or image is painted.',
                        lcp: 'Largest Contentful Paint: Time until the largest content element is visible.',
                        tbt: 'Total Blocking Time: Time the main thread was blocked and unable to respond to input.',
                        cls: 'Cumulative Layout Shift: Measures visual stability and unexpected layout shifts.',
                        tti: 'Time to Interactive: Time until the page is fully interactive.',
                        speedIndex: 'Speed Index: How quickly the contents of a page are visibly populated.',
                        pageLoadTime: 'Page Load Time: Time when the page is fully loaded and interactive.',
                        ttfb: 'Time to First Byte: Time until the browser receives the first byte from the server.'
                      };
                      const label = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/-/g, ' ')
                        .trim();
                      return (
                        <div key={key} className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 relative cursor-pointer">
                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 bg-gray-900 text-white text-sm rounded-lg px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-all duration-200 whitespace-normal text-center flex flex-col items-center">
                            <span className="relative">
                              {metricDescriptions[key] || label}
                              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></span>
                            </span>
                          </span>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-700 capitalize">
                              {label}
                            </h4>
                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <title>{metricDescriptions[key] || label}</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {typeof value === 'number'
                              ? value > 1000
                                ? `${(value / 1000).toFixed(1)}s`
                                : `${Math.round(value)}ms`
                              : value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Back to Home */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {/* Footer removed for cleaner look */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        {/* Future: <Route path="/compare" element={<ComparePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
