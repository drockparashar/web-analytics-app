// analyzePerformance.js
import puppeteer from 'puppeteer';

const analyzePerformance = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    
    const performanceTiming = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.timing)));
    const performanceEntries = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.getEntries())));

    const pageLoadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    const ttfb = performanceTiming.responseStart - performanceTiming.navigationStart;
    const fcpEntry = performanceEntries.find(entry => entry.name === 'first-contentful-paint');
    const lcpEntry = performanceEntries.find(entry => entry.entryType === 'largest-contentful-paint');
    const fcp = fcpEntry ? fcpEntry.startTime : null;
    const lcp = lcpEntry ? lcpEntry.startTime : null;
    const tbt = performanceEntries.reduce((total, entry) => {
        if (entry.entryType === 'longtask') {
            total += entry.duration;
        }
        return total;
    }, 0);
    const cls = performanceEntries.reduce((total, entry) => {
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            total += entry.value;
        }
        return total;
    }, 0);

    await browser.close();

    return {
        pageLoadTime,
        ttfb,
        fcp,
        lcp,
        tbt,
        cls,
        totalRequestSize: performanceEntries.reduce((total, entry) => total + (entry.transferSize || 0), 0),
        numberOfRequests: performanceEntries.length
    };
};

export default analyzePerformance;
