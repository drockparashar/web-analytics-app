import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-xl font-bold text-gray-900">SpeedX</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </a>
                        <Button variant="outline" size="sm">
                            Contact
                        </Button>
                        <Button size="sm">Sign Up</Button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Performance Insights
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Analyze and Compare Website Performance
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Discover comprehensive performance metrics for your websites. Get detailed insights with Lighthouse analysis
                        and compare multiple sites effortlessly.
                    </p>

                    {/* Main Action Cards */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                        <Card
                            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm"
                            onClick={() => navigate('/analyze')}
                        >
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyze</h3>
                                <p className="text-gray-600">
                                    Get detailed performance metrics for a single website using Lighthouse analysis
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden cursor-not-allowed border-2 border-gray-200 bg-gray-50/80 backdrop-blur-sm">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-500 mb-2">Compare</h3>
                                <p className="text-gray-400">Compare performance metrics across multiple websites</p>
                                <div className="absolute top-4 right-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Coming Soon
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-gray-700">Performance Score</h4>
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-sm">95</span>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">Excellent</div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-gray-700">Load Time</h4>
                                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">1.2s</div>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-gray-700">Core Web Vitals</h4>
                                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">Passed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How our platform makes analysis easy</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Simple three-step process to get comprehensive website performance insights
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Website URL</h3>
                        <p className="text-gray-600">
                            Simply paste the URL of the website you want to analyze and we'll handle the rest
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Lighthouse Analysis</h3>
                        <p className="text-gray-600">
                            Our system runs comprehensive Lighthouse tests to gather performance metrics
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Get Detailed Results</h3>
                        <p className="text-gray-600">
                            View comprehensive metrics including performance scores, load times, and optimization tips
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to optimize your website?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Start analyzing your website performance today and discover optimization opportunities
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-gray-100"
                        onClick={() => navigate('/analyze')}
                    >
                        Start Analysis
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t py-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-bold text-gray-900">SpeedX</span>
                    </div>
                    <p className="text-gray-600">© 2025 Your Name. Built with performance in mind.</p>
                </div>
            </footer>
        </div>
    );
}
