import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const PerformanceChart = ({ data, scores }) => {
  // Helper to format bytes to KB/MB
  const formatBytes = (bytes) => {
    if (bytes === null || bytes === undefined) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Helper to format numbers (e.g., requests)
  const formatNumber = (num) => num !== null && num !== undefined ? num : 'N/A';
  // Defensive: fallback to empty object if data is undefined
  // Helper to format ms to seconds with 2 decimals
  const formatSeconds = (ms) => ms !== null && ms !== undefined ? `${(ms / 1000).toFixed(2)} s` : 'N/A';

  const {
    pageLoadTime = null,
    ttfb = null,
    fcp = null,
    lcp = null,
    tbt = null,
    cls = null,
    totalRequestSize = null,
    numberOfRequests = null,
    speedIndex = null,
    tti = null,
    domContentLoaded = null
  } = data || {};

  // Scores section
  const renderScores = () => (
    <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-4">
      {Object.entries(scores || {}).map(([key, value]) => (
        <div key={key} className="bg-gray-100 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-500 font-semibold mb-1">{key}</div>
          <div className="text-xl font-bold text-gray-800">{value !== null ? value : 'N/A'}</div>
        </div>
      ))}
    </div>
  );

  const lineChartData = {
    labels: ['Page Load Time', 'TTFB', 'FCP', 'LCP'],
    datasets: [
      {
        label: 'Metrics (ms)',
        data: [pageLoadTime, ttfb, fcp, lcp],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const tbtChartData = {
    labels: ['Total Blocking Time'],
    datasets: [
      {
        label: 'TBT (ms)',
        data: [tbt],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const clsChartData = {
    labels: ['Cumulative Layout Shift'],
    datasets: [
      {
        label: 'CLS',
        data: [cls],
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
      },
    ],
  };

  const totalRequestSizeChartData = {
    labels: ['Total Request Size'],
    datasets: [
      {
        label: 'Request Size (Bytes)',
        data: [totalRequestSize],
        backgroundColor: 'rgba(255,206,86,0.2)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
      },
    ],
  };

  const numberOfRequestsChartData = {
    labels: ['Number of Requests'],
    datasets: [
      {
        label: 'Requests',
        data: [numberOfRequests],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Metrics</h2>
      {/* Lighthouse Scores */}
      {scores && renderScores()}

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Overall Metrics</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Request Size</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={totalRequestSizeChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Total Request Size:</strong> {formatBytes(totalRequestSize)}. Represents the total size of all network requests made by the page.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Number of Requests</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={numberOfRequestsChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Number of Requests:</strong> {formatNumber(numberOfRequests)}. Indicates the total number of network requests made by the page.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Blocking Time</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={tbtChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Total Blocking Time (TBT):</strong> {formatSeconds(tbt)}. Measures the total amount of time that the main thread was blocked and unable to respond to user input.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Cumulative Layout Shift</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={clsChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Cumulative Layout Shift (CLS):</strong> {cls !== null && cls !== undefined ? cls.toFixed(2) : 'N/A'}. Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.
          </p>
        </div>

        {/* Additional Metrics */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Speed Index</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSeconds(speedIndex)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Speed Index:</strong> Shows how quickly the contents of a page are visibly populated.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Time to Interactive (TTI)</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSeconds(tti)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>TTI:</strong> The time it takes for the page to become fully interactive.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">DOM Content Loaded</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSeconds(domContentLoaded)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>DOM Content Loaded:</strong> Time when the DOM is fully loaded and parsed.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Page Load Time</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSeconds(pageLoadTime)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Page Load Time:</strong> Time when the page is fully loaded and interactive.
          </p>
        </div>
      </div>
    </div>
  );
};

// Accept scores as a prop
export default function Wrapper(props) {
  // If called as <PerformanceChart data={...} scores={...} />
  return <PerformanceChart {...props} />;
}
