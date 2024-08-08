import React, { useState } from 'react';
import PerformanceChart from './PerformanceChart';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetchData = async () => {
    if (!url) {
      alert('Please enter a website URL.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3002/analyze', { url });
      setPerformanceData(response.data);
    } catch (err) {
      setError('Error fetching performance data.');
      console.error('Error fetching performance data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">SpeedX</h1>
      
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Enter Website URL</h2>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter website URL..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleFetchData}
          className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Analyze Performance
        </button>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        {loading && <p className="text-gray-600">Loading performance data...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {performanceData && <PerformanceChart data={performanceData} />}
      </div>
    </div>
  );
};

export default App;
