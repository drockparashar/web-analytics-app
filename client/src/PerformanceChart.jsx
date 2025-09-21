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
  // Tooltip for N/A values
  const naTooltip = (
    <span title="This metric is not available for this site or could not be measured." style={{ cursor: 'help', textDecoration: 'underline dotted' }}>N/A</span>
  );
  // Helper to format bytes to KB/MB
  const formatBytes = (bytes) => {
    if (bytes === null || bytes === undefined) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Helper to format numbers (e.g., requests)
  const formatNumber = (num) => num !== null && num !== undefined ? Number(num).toFixed(2) : 'N/A';
  // Format with tooltip for N/A
  const formatNumberWithTooltip = (num) => num !== null && num !== undefined ? Number(num).toFixed(2) : naTooltip;
  const formatBytesWithTooltip = (bytes) => {
    if (bytes === null || bytes === undefined) return naTooltip;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  const formatSecondsWithTooltip = (ms) => ms !== null && ms !== undefined ? `${(ms / 1000).toFixed(2)} s` : naTooltip;
  const formatMsWithTooltip = (ms) => ms !== null && ms !== undefined ? `${ms.toFixed(2)} ms` : naTooltip;
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
    <div className="mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Only show performance score if not null */}
      {scores?.performance !== null && (
        <div className={`p-4 rounded-lg text-center ${scores.performance >= 0.9 ? 'bg-green-50' : scores.performance >= 0.5 ? 'bg-yellow-50' : 'bg-red-50'}`}>
          <div className="text-sm text-gray-500 font-semibold mb-1">Performance</div>
          <div className={`text-2xl font-bold ${scores.performance >= 0.9 ? 'text-green-600' : scores.performance >= 0.5 ? 'text-yellow-600' : 'text-red-600'}`}>{scores.performance}</div>
        </div>
      )}
      {/* Show Speed Index */}
      {data?.speedIndex !== null && (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-500 font-semibold mb-1">Speed Index</div>
          <div className="text-xl font-bold text-gray-800">{formatSeconds(data.speedIndex)}</div>
        </div>
      )}
      {/* Show Time to Interactive */}
      {data?.tti !== null && (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-500 font-semibold mb-1">TTI</div>
          <div className="text-xl font-bold text-gray-800">{formatSeconds(data.tti)}</div>
        </div>
      )}
    </div>
  );

  const lineChartData = {
    labels: ['Page Load Time', 'TTFB', 'FCP', 'LCP'],
    datasets: [
      {
        label: 'Metrics (s)',
        data: [pageLoadTime / 1000, ttfb / 1000, fcp / 1000, lcp / 1000],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time (s)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Metric'
        }
      }
    }
  };

  const tbtChartData = {
    labels: ['Total Blocking Time'],
    datasets: [
      {
        label: 'TBT (s)',
        data: [tbt / 1000],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const tbtChartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time (s)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Metric'
        }
      }
    }
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

  const clsChartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Score'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Metric'
        }
      }
    }
  };

  const totalRequestSizeChartData = {
    labels: ['Total Request Size'],
    datasets: [
      {
        label: 'Request Size',
        data: [
          totalRequestSize !== null && totalRequestSize !== undefined
            ? totalRequestSize < 1024 * 1024
              ? Number((totalRequestSize / 1024).toFixed(2))
              : Number((totalRequestSize / (1024 * 1024)).toFixed(2))
            : 0
        ],
        backgroundColor: 'rgba(255,206,86,0.2)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
      },
    ],
  };

  const totalRequestSizeChartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text:
            totalRequestSize !== null && totalRequestSize !== undefined
              ? totalRequestSize < 1024 * 1024
                ? 'Size (KB)'
                : 'Size (MB)'
              : 'Size'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Metric'
        }
      }
    }
  };

  // ...existing code...

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

  const numberOfRequestsChartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Metric'
        }
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Metrics</h2>
      {/* Lighthouse Scores */}
      {scores && renderScores()}

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Overall Metrics</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Replace with TTFB and FCP cards */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Time to First Byte (TTFB)</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSecondsWithTooltip(ttfb)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>TTFB:</strong> The time it takes for the browser to receive the first byte of response from the server.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">First Contentful Paint (FCP)</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSecondsWithTooltip(fcp)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>FCP:</strong> The time when the first text or image is painted on the screen.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Blocking Time</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatMsWithTooltip(tbt)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Total Blocking Time (TBT):</strong> {formatMsWithTooltip(tbt)}. Measures the total amount of time that the main thread was blocked and unable to respond to user input.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Cumulative Layout Shift</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatMsWithTooltip(cls * 1000)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Cumulative Layout Shift (CLS):</strong> {formatMsWithTooltip(cls * 1000)}. Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.
          </p>
        </div>

        {/* Additional Metrics */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Speed Index</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSecondsWithTooltip(speedIndex)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Speed Index:</strong> Shows how quickly the contents of a page are visibly populated.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Time to Interactive (TTI)</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSecondsWithTooltip(tti)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>TTI:</strong> The time it takes for the page to become fully interactive.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">DOM Content Loaded</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSecondsWithTooltip(domContentLoaded)}</span>
          </div>
          <p className="mt-2 text-gray-600">
            <strong>DOM Content Loaded:</strong> Time when the DOM is fully loaded and parsed.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Page Load Time</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold">{formatSecondsWithTooltip(pageLoadTime)}</span>
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
