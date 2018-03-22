const puppeteer = require('puppeteer');
const fs = require('fs');
const url = '{your url}';

let perfKPIs = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(5000);

    const timingData = await page.evaluate(() => {
        const timing = {};
        for (const key of Object.keys(window.performance.timing.__proto__)) {
            timing[key] = window.performance.timing[key];
        }

        let totalFirstByteTime = timing.responseStart - timing.navigationStart;
        let latency = timing.responseStart - timing.fetchStart;
        let dnsDomainLookupTime = timing.domainLookupEnd - timing.domainLookupStart;
        let serverConnectTime = timing.connectEnd - timing.connectStart;
        let serverResponseTime = timing.responseStart - timing.requestStart;
        let pageLoadTime = timing.loadEventStart - timing.navigationStart;
        let transferPageDownloadTime = timing.responseEnd - timing.responseStart;
        let domInteractiveTime = timing.domInteractive - timing.navigationStart;
        let domContentLoadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        let domProcessingToInteractive = timing.domInteractive - timing.domLoading;
        let domInteractiveToComplete = timing.domComplete - timing.domInteractive;
        let onLoad = timing.loadEventEnd - timing.loadEventStart;

        let timingMetrics = {
            'Total First Byte Time': totalFirstByteTime.toString() + ' ms',
            'Latency': latency.toString() + ' ms',
            'DNS/Domain Lookup Time': dnsDomainLookupTime.toString() + ' ms',
            'Server Connect Time': serverConnectTime.toString() + ' ms',
            'Server Response Time': serverResponseTime.toString() + ' ms',
            'Page Load Time': pageLoadTime.toString() + ' ms',
            'Transfer/Page Download Time': transferPageDownloadTime.toString() + ' ms',
            'DOM Interactive Time': domInteractiveTime.toString() + ' ms',
            'DOM Content Load Time': domContentLoadTime.toString() + ' ms',
            'DOM Processing To Interactive': domProcessingToInteractive.toString() + ' ms',
            'DOM Interactive To Complete': domInteractiveToComplete.toString() + ' ms',
            'Onload': onLoad.toString() + ' ms'
        };

        return timingMetrics;
    });

    await browser.close();
    return timingData;
}

perfKPIs().then((obj) => {

    fs.writeFile('navigation-timing-metrics.json', JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log('The json file was saved successfully!');
      });

});
