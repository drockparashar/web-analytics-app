import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComparePage() {
    const navigate = useNavigate();
    const [websites, setWebsites] = useState([
        { id: 1, url: '', label: 'Website 1', isValid: false },
        { id: 2, url: '', label: 'Website 2', isValid: false }
    ]);

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
                                        disabled={!canCompare}
                                        className={`px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-200 ${canCompare
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {canCompare ? (
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section - Placeholder */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg">
                        <div className="p-8 text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Comparison Results</h3>
                            <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-500">Comparison dashboard will be implemented in upcoming steps</p>
                            </div>
                        </div>
                    </div>
                </div>

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