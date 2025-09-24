import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComparePage() {
    const navigate = useNavigate();

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

                {/* URL Input Section - Placeholder */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white/90 backdrop-blur-sm shadow-xl border-2 hover:border-purple-200 transition-all duration-300 rounded-lg">
                        <div className="p-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Websites to Compare</h2>
                            <p className="text-gray-600 mb-8">Enter 2-3 website URLs to compare their performance metrics</p>

                            {/* Placeholder for URL inputs - will be implemented in next step */}
                            <div className="space-y-4">
                                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                    <p className="text-gray-500">URL input interface will be implemented in the next step</p>
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