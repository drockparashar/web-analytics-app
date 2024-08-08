// PerformanceChart.js
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

const PerformanceChart = ({ data }) => {
  const { pageLoadTime, ttfb, fcp, lcp, tbt, cls, totalRequestSize, numberOfRequests } = data;

  // Line Chart Data for overall metrics
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

  // Bar Chart Data for TBT
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

  // Bar Chart Data for CLS
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

  // Bar Chart Data for Total Request Size
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

  // Bar Chart Data for Number of Requests
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
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Overall Metrics</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Blocking Time</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={tbtChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Total Blocking Time (TBT):</strong> Measures the total amount of time that the main thread was blocked and unable to respond to user input. 
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Cumulative Layout Shift</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={clsChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Cumulative Layout Shift (CLS):</strong> Measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Request Size</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={totalRequestSizeChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Total Request Size:</strong> Represents the total size of all network requests made by the page. 
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Number of Requests</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Bar data={numberOfRequestsChartData} />
          </div>
          <p className="mt-2 text-gray-600">
            <strong>Number of Requests:</strong> Indicates the total number of network requests made by the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
