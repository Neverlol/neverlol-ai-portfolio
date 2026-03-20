const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to vercel.com...');
  await page.goto('https://vercel.com', { waitUntil: 'networkidle2', timeout: 30000 });

  await new Promise(r => setTimeout(r, 5000));

  // Scroll to position where the chart might be
  await page.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r => setTimeout(r, 2000));

  // Get the full SVG at index 76 (the complex one)
  const svgData = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg');
    const targetSvg = svgs[76]; // The complex one with 43 paths

    if (!targetSvg) return { found: false };

    const rect = targetSvg.getBoundingClientRect();
    const paths = targetSvg.querySelectorAll('path');

    const pathData = [];
    paths.forEach((p, i) => {
      const d = p.getAttribute('d');
      const stroke = p.getAttribute('stroke');
      const strokeWidth = p.getAttribute('stroke-width');
      const fill = p.getAttribute('fill');
      const opacity = p.getAttribute('opacity');

      if (d && d.length > 20) {
        pathData.push({
          index: i,
          d: d,
          stroke: stroke,
          strokeWidth: strokeWidth,
          fill: fill,
          opacity: opacity
        });
      }
    });

    return {
      found: true,
      index: 76,
      viewBox: targetSvg.getAttribute('viewBox'),
      width: rect.width,
      height: rect.height,
      paths: pathData
    };
  });

  console.log(JSON.stringify(svgData, null, 2));

  // Take screenshot at this position
  await page.screenshot({ path: '/tmp/vercel-chart-svg76.png' });
  console.log('Screenshot saved');

  await browser.close();
})();
