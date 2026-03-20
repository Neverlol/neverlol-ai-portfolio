const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Try different Vercel pages to find the animated chart
  const urls = [
    'https://vercel.com/home',
    'https://vercel.com',
    'https://vercel.com/enterprise',
    'https://vercel.com/why-vercel'
  ];

  let foundChart = false;

  for (const url of urls) {
    console.log(`\n=== Testing: ${url} ===`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    // Look for the animated traffic chart with 3 lines
    const chartData = await page.evaluate(() => {
      // Look for elements containing traffic-related text
      const allElements = document.querySelectorAll('*');
      const relevantTexts = [];

      allElements.forEach(el => {
        const text = el.textContent || '';
        if (text.includes('Requests') && text.includes('Edge')) {
          relevantTexts.push({
            tag: el.tagName,
            className: el.className,
            text: text.substring(0, 200)
          });
        }
      });

      // Look for canvas or SVG with animated lines
      const canvases = document.querySelectorAll('canvas');
      const svgs = document.querySelectorAll('svg');

      // Look for elements with specific colors (blue, green, red lines)
      const coloredPaths = document.querySelectorAll('path[stroke="#00DC82"], path[stroke="#3B82F6"], path[stroke="#EF4444"], path[stroke="#22D3EE"], path[stroke="#10B981"]');

      return {
        url: window.location.href,
        relevantTexts: relevantTexts.slice(0, 5),
        canvasCount: canvases.length,
        svgCount: svgs.length,
        coloredPathCount: coloredPaths.length
      };
    });

    console.log(JSON.stringify(chartData, null, 2));

    if (chartData.coloredPathCount > 0 || chartData.relevantTexts.length > 0) {
      console.log('>>> FOUND POTENTIAL CHART HERE <<<');
      foundChart = true;

      // Take screenshot
      await page.screenshot({ path: `/tmp/vercel-chart-found-${Date.now()}.png` });

      // Get more detailed SVG data
      const detailedSvg = await page.evaluate(() => {
        const svgs = document.querySelectorAll('svg');
        const results = [];

        svgs.forEach((svg, i) => {
          const paths = svg.querySelectorAll('path[stroke]');
          if (paths.length >= 2) {
            const pathData = [];
            paths.forEach((p, j) => {
              const d = p.getAttribute('d');
              const stroke = p.getAttribute('stroke');
              if (d && d.length > 50) {
                pathData.push({
                  index: j,
                  d: d.substring(0, 500),
                  stroke: stroke,
                  strokeWidth: p.getAttribute('stroke-width')
                });
              }
            });

            if (pathData.length > 0) {
              const rect = svg.getBoundingClientRect();
              results.push({
                svgIndex: i,
                visible: rect.width > 0 && rect.height > 0,
                rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
                paths: pathData
              });
            }
          }
        });

        return results;
      });

      console.log('\n=== Detailed SVG Data ===');
      console.log(JSON.stringify(detailedSvg, null, 2));

      if (foundChart) break;
    }
  }

  // Also try vercel.com/pricing which might have charts
  console.log('\n=== Trying vercel.com/pricing ===');
  await page.goto('https://vercel.com/pricing', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const pricingData = await page.evaluate(() => {
    const coloredPaths = document.querySelectorAll('path[stroke]');
    const results = [];

    coloredPaths.forEach((p, i) => {
      const stroke = p.getAttribute('stroke');
      if (stroke && (stroke.includes('#') || stroke.includes('rgb'))) {
        results.push({
          index: i,
          stroke: stroke,
          d: p.getAttribute('d')?.substring(0, 200)
        });
      }
    });

    return { coloredPaths: results.length, samples: results.slice(0, 10) };
  });

  console.log(JSON.stringify(pricingData, null, 2));
  await page.screenshot({ path: '/tmp/vercel-pricing.png' });

  await browser.close();
})();
