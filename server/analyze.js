// analyzePerformance.js
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import { URL } from "url";

const analyzePerformance = async (url) => {
  // Basic URL validation
  try {
    if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
      throw new Error("Invalid URL. Please provide a valid http(s) URL.");
    }
    // Launch Chrome with Puppeteer for Lighthouse
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--remote-debugging-port=9222",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    // Run Lighthouse with desktop emulation and throttling disabled
    const result = await lighthouse(url, {
      port: 9222,
      output: "json",
      onlyCategories: ["performance"],
      emulatedFormFactor: "desktop",
      throttling: {
        rttMs: 0,
        throughputKbps: 0,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
      disableStorageReset: true,
    });
    await browser.close();
    // Extract key scores and metrics with error handling
    const categories = result.lhr.categories;
    const audits = result.lhr.audits;
    if (!categories || !audits) {
      throw new Error(
        "Lighthouse did not return expected categories/audits. The site may block headless Chrome or remote debugging."
      );
    }
    function safeScore(cat, key) {
      return cat && cat[key] && typeof cat[key].score === "number"
        ? cat[key].score
        : null;
    }

    return {
      lighthouseScores: {
        performance: safeScore(categories, "performance"),
        accessibility: safeScore(categories, "accessibility"),
        bestPractices: safeScore(categories, "best-practices"),
        seo: safeScore(categories, "seo"),
        pwa: safeScore(categories, "pwa"),
      },
      metrics: {
        fcp: audits["first-contentful-paint"]?.numericValue ?? null,
        lcp: audits["largest-contentful-paint"]?.numericValue ?? null,
        tbt: audits["total-blocking-time"]?.numericValue ?? null,
        cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
        tti: audits["interactive"]?.numericValue ?? null,
        speedIndex: audits["speed-index"]?.numericValue ?? null,
        domContentLoaded: audits["dom-content-loaded"]?.numericValue ?? null,
        pageLoadTime: audits["interactive"]?.numericValue ?? null,
        ttfb: audits["server-response-time"]?.numericValue ?? null,
      },
    };
  } catch (err) {
    throw new Error("Performance analysis failed: " + err.message);
  }
};

export default analyzePerformance;
