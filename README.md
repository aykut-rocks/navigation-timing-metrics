# navigation timing metrics
calculates performance KPI's from a webpage using Puppeteer and the navigation timing API

## requirement
- node.js version 7.6.0 or later
- puppeteer version 1.2.0 or later

## configuration
1. be sure to have node.js installed globally
2. clone this repository and run 'npm install' in project folder
3. add your url to the constant in index.js: const url = '{your url}';   // e.g. 'https://github.com/'

## howto
1. run 'node index.js' in project folder
2. a json file with performance KPI's will be saved in navigation-timing-metrics.json
3. the result is something like this:
```
{
  "Total First Byte Time": "126 ms",
  "Latency": "125 ms",
  "DNS/Domain Lookup Time": "4 ms",
  "Server Connect Time": "96 ms",
  "Server Response Time": "11 ms",
  "Page Load Time": "2729 ms",
  "Transfer/Page Download Time": "10 ms",
  "DOM Interactive Time": "1076 ms",
  "DOM Content Load Time": "1088 ms",
  "DOM Processing To Interactive": "944 ms",
  "DOM Interactive To Complete": "1653 ms",
  "Onload": "3 ms"
}
```

## acknowledgment
this tool was heavily influenced by the blog article:  
[Using Navigation Timing APIs to understand your webpage](https://community.akamai.com/community/web-performance/blog/2016/08/25/using-navigation-timing-apis-to-understand-your-webpage)
