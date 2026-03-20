const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to vercel.com/enterprise...');
  await page.goto('https://vercel.com/enterprise', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for page to fully load
  await new Promise(r => setTimeout(r, 3000));

  // Scroll to find the chart area (around position 800-1200)
  console.log('Scrolling to chart area...');
  await page.evaluate(() => {
    window.scrollTo(0, 900);
  });
  await new Promise(r => setTimeout(r, 2000));

  // Get all canvas info
  const canvasInfo = await page.evaluate(() => {
    const canvases = document.querySelectorAll('canvas');
    const results = [];
    canvases.forEach((canvas, i) => {
      const rect = canvas.getBoundingClientRect();
      results.push({
        index: i,
        width: canvas.width,
        height: canvas.height,
        clientRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
      });
    });
    return results;
  });

  console.log('\n=== Canvas Info ===');
  console.log(JSON.stringify(canvasInfo, null, 2));

  // Take screenshot at this position
  await page.screenshot({ path: '/tmp/vercel-chart.png' });
  console.log('\nScreenshot saved to /tmp/vercel-chart.png');

  // Try to find animated elements by looking at data or props
  const animatedElements = await page.evaluate(() => {
    // Look for elements with animation-related attributes or styles
    const animated = document.querySelectorAll('[style*="animation"], [data-animated]');
    const results = [];
    animated.forEach((el, i) => {
      results.push({
        tag: el.tagName,
        className: el.className,
        style: el.getAttribute('style')?.substring(0, 200),
        animation: window.getComputedStyle(el).animation
      });
    });
    return results;
  });

  console.log('\n=== Animated Elements ===');
  console.log(JSON.stringify(animatedElements, null, 2));

  // Extract all SVGs with large paths (likely charts)
  const allSvgs = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg');
    const results = [];

    svgs.forEach((svg, i) => {
      const paths = svg.querySelectorAll('path');
      const totalPathLength = Array.from(paths).reduce((sum, p) => sum + (p.getAttribute('d')?.length || 0), 0);

      if (totalPathLength > 500) { // Likely a chart or complex graphic
        const rect = svg.getBoundingClientRect();
        results.push({
          svgIndex: i,
          width: svg.getAttribute('width'),
          height: svg.getAttribute('height'),
          viewBox: svg.getAttribute('viewBox'),
          totalPathLength,
          clientRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          paths: Array.from(paths).map((p, j) => ({
            index: j,
            d: p.getAttribute('d')?.substring(0, 300),
            stroke: p.getAttribute('stroke'),
            strokeWidth: p.getAttribute('stroke-width')
          }))
        });
      }
    });

    return results;
  });

  console.log('\n=== Complex SVGs ===');
  console.log(JSON.stringify(allSvgs, null, 2));

  await browser.close();
})();
