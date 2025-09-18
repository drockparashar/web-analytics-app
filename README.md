# Web Analytics App

## Overview

Web Analytics App is a modern, full-stack web application for analyzing and visualizing website performance metrics. It leverages Puppeteer and Lighthouse to provide deep insights into web page speed, user experience, and technical best practices. The app features a clean UI built with React and Tailwind CSS, and a Node.js/Express backend for robust data collection.

## Features

- **Performance Audits:** Analyze any website's speed and core web vitals using Lighthouse.
- **Key Metrics:** View FCP, LCP, TBT, CLS, TTI, Speed Index, TTFB, and more.
- **Visualizations:** Interactive charts and summaries for easy understanding.
- **Fast Backend:** Optimized for quick Lighthouse runs with minimal response size.
- **Responsive UI:** Built with React and Tailwind CSS for a seamless experience.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Puppeteer, Lighthouse

## Project Structure

```
web-analytics-app/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── PerformanceChart.jsx
│   │   ├── components/ui/
│   │   └── ...
│   ├── public/
│   └── ...
├── server/
│   ├── index.js
│   ├── analyze.js
│   └── ...
├── README.md
├── .gitignore
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/<your-username>/web-analytics-app.git
   cd web-analytics-app
   ```
2. **Install dependencies:**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```
3. **Install Puppeteer Chrome (required for backend):**
   ```sh
   npx puppeteer browsers install chrome
   ```
4. **Start the backend server:**
   ```sh
   npm start
   # or
   nodemon index.js
   ```
5. **Start the frontend (in a new terminal):**
   ```sh
   cd ../client
   npm run dev
   ```

## Usage

1. Open the frontend in your browser (usually at `http://localhost:5173`).
2. Enter a website URL and click "Analyze Performance".
3. View detailed metrics and charts for the analyzed site.

## API

### POST `/analyze`

**Request:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "lighthouseScores": {
    "performance": 0.92
  },
  "metrics": {
    "fcp": 1234.56,
    "lcp": 2345.67,
    "tbt": 89.01,
    "cls": 0.02,
    "tti": 3456.78,
    "speedIndex": 2100.12,
    "ttfb": 45.67
  }
}
```

## Customization & Extensibility

- Add more metrics or categories by modifying `server/analyze.js`.
- Customize UI components in `client/src/components/ui/`.
- Integrate with databases or authentication as needed.

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss major changes before submitting PRs.

## License

MIT
