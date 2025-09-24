import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler
);

export default function ComparePage() {
    const navigate = useNavigate();
    const [websites, setWebsites] = useState([
        { id: 1, url: '', label: 'Website 1', isValid: false },
        { id: 2, url: '', label: 'Website 2', isValid: false }
    ]);

    // Analysis state management
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState([]);
    const [analysisProgress, setAnalysisProgress] = useState({});
    const [analysisErrors, setAnalysisErrors] = useState({});

    // URL validation function
    const isValidUrl = (string) => {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    };

    // Handle URL input changes
    const handleUrlChange = (id, value) => {
        setWebsites(prev => prev.map(site =>
            site.id === id
                ? { ...site, url: value, isValid: isValidUrl(value) }
                : site
        ));
    };

    // Add a new website input (max 3)
    const addWebsite = () => {
        if (websites.length < 3) {
            const newId = Math.max(...websites.map(w => w.id)) + 1;
            setWebsites(prev => [...prev, {
                id: newId,
                url: '',
                label: `Website ${newId}`,
                isValid: false
            }]);
        }
    };

    // Remove a website input (min 2)
    const removeWebsite = (id) => {
        if (websites.length > 2) {
            setWebsites(prev => prev.filter(site => site.id !== id));
        }
    };

    // Check if we can compare (at least 2 valid URLs)
    const canCompare = websites.filter(site => site.isValid).length >= 2;

    // Chart data preparation functions
    const prepareBarChartData = (results, metric) => {
        const validResults = results.filter(r => r.results && !r.error && r.results[metric] !== null);

        if (validResults.length === 0) return null;

        const colors = ['rgba(124, 58, 237, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)'];
        const borderColors = ['rgb(124, 58, 237)', 'rgb(59, 130, 246)', 'rgb(16, 185, 129)'];

        return {
            labels: validResults.map(r => r.label),
            datasets: [
                {
                    label: metric.charAt(0).toUpperCase() + metric.slice(1),
                    data: validResults.map(r => r.results[metric]),
                    backgroundColor: colors.slice(0, validResults.length),
                    borderColor: borderColors.slice(0, validResults.length),
                    borderWidth: 2,
                    borderRadius: 8,
                },
            ],
        };
    };

    const prepareRadarChartData = (results) => {
        const validResults = results.filter(r => r.results && !r.error);

        if (validResults.length === 0) return null;

        const colors = [
            'rgba(124, 58, 237, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(16, 185, 129, 0.6)'
        ];
        const borderColors = [
            'rgb(124, 58, 237)',
            'rgb(59, 130, 246)',
            'rgb(16, 185, 129)'
        ];

        const metrics = ['performance', 'accessibility', 'bestPractices', 'seo'];
        const metricLabels = ['Performance', 'Accessibility', 'Best Practices', 'SEO'];

        return {
            labels: metricLabels,
            datasets: validResults.map((result, index) => ({
                label: result.label,
                data: metrics.map(metric => result.results[metric] || 0),
                backgroundColor: colors[index % colors.length],
                borderColor: borderColors[index % borderColors.length],
                borderWidth: 2,
                pointBackgroundColor: borderColors[index % borderColors.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: borderColors[index % borderColors.length],
            })),
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    // Winner determination functions
    const findWinner = (results, metric) => {
        const validResults = results.filter(r => r.results && !r.error && r.results[metric] !== null);
        if (validResults.length === 0) return null;

        return validResults.reduce((best, current) => {
            if (metric === 'loadTime') {
                // For load time, lower is better
                return parseFloat(current.results[metric]) < parseFloat(best.results[metric]) ? current : best;
            } else {
                // For other metrics, higher is better
                return current.results[metric] > best.results[metric] ? current : best;
            }
        });
    };

    const findOverallWinner = (results) => {
        const validResults = results.filter(r => r.results && !r.error);
        if (validResults.length === 0) return null;

        return validResults.reduce((best, current) => {
            const currentAvg = calculateAverageScore(current.results);
            const bestAvg = calculateAverageScore(best.results);
            return currentAvg > bestAvg ? current : best;
        });
    };

    const calculateAverageScore = (results) => {
        const metrics = ['performance', 'accessibility', 'bestPractices', 'seo'];
        const validScores = metrics.filter(metric => results[metric] !== null).map(metric => results[metric]);
        return validScores.length > 0 ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length : 0;
    };

    const isWinner = (result, metric, results) => {
        const winner = findWinner(results, metric);
        return winner && winner.id === result.id;
    };

    const isOverallWinner = (result, results) => {
        const winner = findOverallWinner(results);
        return winner && winner.id === result.id;
    };

    // Analysis functions
    const analyzeWebsite = async (website) => {
        try {
            setAnalysisProgress(prev => ({ ...prev, [website.id]: 'analyzing' }));
            setAnalysisErrors(prev => ({ ...prev, [website.id]: null }));

            const response = await fetch('https://web-analytics-app-backend.onrender.com/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: website.url }),
            });

            if (!response.ok) {
                throw new Error(`Analysis failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            setAnalysisProgress(prev => ({ ...prev, [website.id]: 'completed' }));
            return {
                ...website,
                results: data,
                analyzedAt: new Date().toISOString()
            };

        } catch (error) {
            console.error(`Error analyzing ${website.url}:`, error);
            setAnalysisProgress(prev => ({ ...prev, [website.id]: 'error' }));
            setAnalysisErrors(prev => ({
                ...prev,
                [website.id]: error.message || 'Analysis failed'
            }));
            return {
                ...website,
                results: null,
                error: error.message || 'Analysis failed',
                analyzedAt: new Date().toISOString()
            };
        }
    };

    const handleCompareAnalysis = async () => {
        const validWebsites = websites.filter(site => site.isValid);

        if (validWebsites.length < 2) {
            return;
        }

        setIsAnalyzing(true);
        setAnalysisResults([]);
        setAnalysisProgress({});
        setAnalysisErrors({});

        try {
            // Initialize progress for all websites
            const initialProgress = {};
            validWebsites.forEach(website => {
                initialProgress[website.id] = 'pending';
            });
            setAnalysisProgress(initialProgress);

            // Analyze all websites in parallel
            const analysisPromises = validWebsites.map(website => analyzeWebsite(website));
            const results = await Promise.all(analysisPromises);

            setAnalysisResults(results);
        } catch (error) {
            console.error('Comparison analysis failed:', error);
        } finally {
            setIsAnalyzing(false);
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
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                        </a>
                        <a href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </a>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
                            Contact
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Sign Up
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Website Performance Comparison
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Compare Website Performance
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Compare up to 3 websites side-by-side and discover which performs best across key metrics.
                    </p>
                </div>

                {/* URL Input Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white/90 backdrop-blur-sm shadow-xl border-2 hover:border-purple-200 transition-all duration-300 rounded-lg">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <h2 className="text-2xl font-bold text-gray-900">Add Websites to Compare</h2>
                                </div>
                                <p className="text-gray-600">Enter 2-3 website URLs to compare their performance metrics</p>
                            </div>

                            {/* URL Input Fields */}
                            <div className="space-y-6">
                                {websites.map((website, index) => (
                                    <div key={website.id} className="relative">
                                        <div className="flex items-center space-x-4">
                                            {/* Website Label */}
                                            <div className="flex-shrink-0 w-24">
                                                <span className="inline-flex items-center px-3 py-2 rounded-lg bg-purple-100 text-purple-800 text-sm font-medium">
                                                    {website.label}
                                                </span>
                                            </div>

                                            {/* URL Input */}
                                            <div className="flex-1 relative">
                                                <input
                                                    type="url"
                                                    value={website.url}
                                                    onChange={(e) => handleUrlChange(website.id, e.target.value)}
                                                    placeholder="https://example.com"
                                                    className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${website.url === ''
                                                        ? 'border-gray-200 focus:border-transparent'
                                                        : website.isValid
                                                            ? 'border-green-200 bg-green-50'
                                                            : 'border-red-200 bg-red-50'
                                                        }`}
                                                />
                                                {/* Validation Icons */}
                                                {website.url !== '' && (
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        {website.isValid ? (
                                                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Remove Button */}
                                            {websites.length > 2 && (
                                                <button
                                                    onClick={() => removeWebsite(website.id)}
                                                    className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                                    title="Remove website"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Add Website Button */}
                                {websites.length < 3 && (
                                    <div className="text-center">
                                        <button
                                            onClick={addWebsite}
                                            className="inline-flex items-center px-4 py-2 border-2 border-dashed border-purple-300 text-purple-600 hover:text-purple-800 hover:border-purple-500 rounded-lg transition-colors duration-200"
                                        >
                                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Website ({websites.length}/3)
                                        </button>
                                    </div>
                                )}

                                {/* Compare Button */}
                                <div className="text-center pt-4">
                                    <button
                                        onClick={handleCompareAnalysis}
                                        disabled={!canCompare || isAnalyzing}
                                        className={`px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-200 ${canCompare && !isAnalyzing
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isAnalyzing ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Analyzing Websites...
                                            </div>
                                        ) : canCompare ? (
                                            <div className="flex items-center">
                                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Compare Performance ({websites.filter(w => w.isValid).length} websites)
                                            </div>
                                        ) : (
                                            'Enter at least 2 valid URLs to compare'
                                        )}
                                    </button>
                                </div>

                                {/* Analysis Progress */}
                                {isAnalyzing && Object.keys(analysisProgress).length > 0 && (
                                    <div className="mt-6 space-y-3">
                                        <h4 className="text-lg font-semibold text-gray-900 text-center">Analysis Progress</h4>
                                        {websites.filter(site => site.isValid).map(website => (
                                            <div key={website.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <span className="font-medium text-gray-900 mr-3">{website.label}:</span>
                                                    <span className="text-sm text-gray-600 truncate max-w-xs">{website.url}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    {analysisProgress[website.id] === 'pending' && (
                                                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">Pending</span>
                                                    )}
                                                    {analysisProgress[website.id] === 'analyzing' && (
                                                        <div className="flex items-center">
                                                            <svg className="animate-spin h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Analyzing...</span>
                                                        </div>
                                                    )}
                                                    {analysisProgress[website.id] === 'completed' && (
                                                        <div className="flex items-center">
                                                            <svg className="h-4 w-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
                                                        </div>
                                                    )}
                                                    {analysisProgress[website.id] === 'error' && (
                                                        <div className="flex items-center">
                                                            <svg className="h-4 w-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">Error</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Analysis Errors */}
                                {Object.keys(analysisErrors).length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-semibold text-red-600 text-center mb-3">Analysis Errors</h4>
                                        <div className="space-y-2">
                                            {Object.entries(analysisErrors).map(([websiteId, error]) => {
                                                const website = websites.find(w => w.id.toString() === websiteId);
                                                if (!error || !website) return null;
                                                return (
                                                    <div key={websiteId} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                                        <div className="flex items-start">
                                                            <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <div>
                                                                <p className="font-medium text-red-800">{website.label} ({website.url})</p>
                                                                <p className="text-sm text-red-600 mt-1">{error}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {analysisResults.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comparison Results</h3>

                                {/* Winner Summary */}
                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-8">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                        <svg className="h-5 w-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        Category Winners
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                        {['performance', 'accessibility', 'bestPractices', 'seo'].map(metric => {
                                            const winner = findWinner(analysisResults, metric);
                                            return winner ? (
                                                <div key={metric} className="flex items-center space-x-2">
                                                    <span className="font-medium text-gray-600">
                                                        {metric === 'bestPractices' ? 'Best Practices' : metric.charAt(0).toUpperCase() + metric.slice(1)}:
                                                    </span>
                                                    <span className="font-bold text-gray-900">{winner.label}</span>
                                                    <span className="text-gray-500">({winner.results[metric]})</span>
                                                </div>
                                            ) : null;
                                        })}
                                        {(() => {
                                            const loadTimeWinner = findWinner(analysisResults, 'loadTime');
                                            return loadTimeWinner ? (
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium text-gray-600">Load Time:</span>
                                                    <span className="font-bold text-gray-900">{loadTimeWinner.label}</span>
                                                    <span className="text-gray-500">({loadTimeWinner.results.loadTime}s)</span>
                                                </div>
                                            ) : null;
                                        })()}
                                    </div>
                                    {(() => {
                                        const overallWinner = findOverallWinner(analysisResults);
                                        return overallWinner ? (
                                            <div className="mt-4 pt-4 border-t border-yellow-200">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                    <span className="text-lg font-bold text-gray-900">
                                                        Overall Winner: {overallWinner.label}
                                                    </span>
                                                    <span className="text-gray-600">
                                                        (Avg: {calculateAverageScore(overallWinner.results).toFixed(1)})
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null;
                                    })()}
                                </div>

                                {/* Results Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {analysisResults.map((result) => (
                                        <div key={result.id} className={`rounded-lg p-6 relative ${isOverallWinner(result, analysisResults)
                                                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg'
                                                : 'bg-gray-50'
                                            }`}>
                                            {/* Overall Winner Badge */}
                                            {isOverallWinner(result, analysisResults) && (
                                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center">
                                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                    Winner
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-lg text-gray-900">{result.label}</h4>
                                                {result.results && !result.error && (
                                                    <div className="flex items-center text-green-600">
                                                        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-sm">Success</span>
                                                    </div>
                                                )}
                                                {result.error && (
                                                    <div className="flex items-center text-red-600">
                                                        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        <span className="text-sm">Failed</span>
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-600 mb-4 truncate" title={result.url}>{result.url}</p>

                                            {result.results && !result.error ? (
                                                <div className="space-y-3">
                                                    {/* Performance Score */}
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center">
                                                            <span className="text-sm text-gray-600">Performance</span>
                                                            {isWinner(result, 'performance', analysisResults) && (
                                                                <div className="ml-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                                                                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                    </svg>
                                                                    Best
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className={`w-12 h-3 rounded-full mr-2 ${result.results.performance >= 90 ? 'bg-green-500' :
                                                                result.results.performance >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                                }`}>
                                                                <div
                                                                    className="h-full bg-white rounded-full"
                                                                    style={{ width: `${100 - result.results.performance}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-medium">{result.results.performance}</span>
                                                        </div>
                                                    </div>

                                                    {/* Other Core Metrics */}
                                                    {['accessibility', 'bestPractices', 'seo'].map(metric => (
                                                        result.results[metric] !== null && (
                                                            <div key={metric} className="flex justify-between items-center">
                                                                <div className="flex items-center">
                                                                    <span className="text-sm text-gray-600 capitalize">
                                                                        {metric === 'bestPractices' ? 'Best Practices' : metric}
                                                                    </span>
                                                                    {isWinner(result, metric, analysisResults) && (
                                                                        <div className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                                                                            <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                            </svg>
                                                                            Best
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className={`w-12 h-3 rounded-full mr-2 ${result.results[metric] >= 90 ? 'bg-green-500' :
                                                                        result.results[metric] >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                                        }`}>
                                                                        <div
                                                                            className="h-full bg-white rounded-full"
                                                                            style={{ width: `${100 - result.results[metric]}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="font-medium">{result.results[metric]}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}

                                                    {/* Load Time */}
                                                    {result.results.loadTime && (
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center">
                                                                <span className="text-sm text-gray-600">Load Time</span>
                                                                {isWinner(result, 'loadTime', analysisResults) && (
                                                                    <div className="ml-2 bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                                                                        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                        </svg>
                                                                        Fastest
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span className="font-medium">{result.results.loadTime}s</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-red-600 text-sm">
                                                    <p className="font-medium">Analysis Failed</p>
                                                    <p className="mt-1">{result.error}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Detailed Comparison Charts */}
                                <div className="border-t pt-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Performance Comparison Charts</h4>

                                    {/* Radar Chart - Overall Performance */}
                                    {prepareRadarChartData(analysisResults) && (
                                        <div className="mb-8">
                                            <div className="bg-gray-50 rounded-lg p-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 text-center">Overall Performance Radar</h5>
                                                <div className="h-80">
                                                    <Radar data={prepareRadarChartData(analysisResults)} options={radarOptions} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Individual Metric Bar Charts */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Performance Score */}
                                        {prepareBarChartData(analysisResults, 'performance') && (
                                            <div className="bg-gray-50 rounded-lg p-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 text-center">Performance Score</h5>
                                                <div className="h-64">
                                                    <Bar data={prepareBarChartData(analysisResults, 'performance')} options={chartOptions} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Accessibility Score */}
                                        {prepareBarChartData(analysisResults, 'accessibility') && (
                                            <div className="bg-gray-50 rounded-lg p-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 text-center">Accessibility Score</h5>
                                                <div className="h-64">
                                                    <Bar data={prepareBarChartData(analysisResults, 'accessibility')} options={chartOptions} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Best Practices Score */}
                                        {prepareBarChartData(analysisResults, 'bestPractices') && (
                                            <div className="bg-gray-50 rounded-lg p-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 text-center">Best Practices Score</h5>
                                                <div className="h-64">
                                                    <Bar data={prepareBarChartData(analysisResults, 'bestPractices')} options={chartOptions} />
                                                </div>
                                            </div>
                                        )}

                                        {/* SEO Score */}
                                        {prepareBarChartData(analysisResults, 'seo') && (
                                            <div className="bg-gray-50 rounded-lg p-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 text-center">SEO Score</h5>
                                                <div className="h-64">
                                                    <Bar data={prepareBarChartData(analysisResults, 'seo')} options={chartOptions} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Load Time Comparison */}
                                    {analysisResults.some(r => r.results && !r.error && r.results.loadTime) && (
                                        <div className="mt-6">
                                            <div className="bg-gray-50 rounded-lg p-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 text-center">Load Time Comparison</h5>
                                                <div className="space-y-4">
                                                    {analysisResults
                                                        .filter(r => r.results && !r.error && r.results.loadTime)
                                                        .map((result, index) => {
                                                            const maxLoadTime = Math.max(...analysisResults
                                                                .filter(r => r.results && !r.error && r.results.loadTime)
                                                                .map(r => parseFloat(r.results.loadTime))
                                                            );
                                                            const loadTime = parseFloat(result.results.loadTime);
                                                            const percentage = (loadTime / maxLoadTime) * 100;
                                                            const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500'];

                                                            return (
                                                                <div key={result.id} className="flex items-center space-x-4">
                                                                    <div className="w-24 text-sm font-medium text-gray-700">
                                                                        {result.label}
                                                                    </div>
                                                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                                                        <div
                                                                            className={`h-6 rounded-full ${colors[index % colors.length]} flex items-center justify-end pr-2`}
                                                                            style={{ width: `${percentage}%` }}
                                                                        >
                                                                            <span className="text-white text-xs font-medium">
                                                                                {result.results.loadTime}s
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Placeholder when no results */}
                {analysisResults.length === 0 && !isAnalyzing && (
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Comparison Results</h3>
                                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <p className="text-gray-500">Add websites above and click "Compare Performance" to see results</p>
                                </div>
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
            </main>
        </div>
    );
}