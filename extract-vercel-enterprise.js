const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Loading vercel.com/enterprise...');
  await page.goto('https://vercel.com/enterprise', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait a lot for all animations
  await new Promise(r => setTimeout(r, 5000));

  // Try multiple scroll positions specifically for this page
  const scrollYPositions = [0, 400, 600, 800, 1000, 1200, 1400];

  for (const scrollY of scrollYPositions) {
    await page.evaluate((pos) => window.scrollTo(0, pos), scrollY);
    await new Promise(r => setTimeout(r, 1500));

    // Get visible SVG paths with colors
    const content = await page.evaluate(() => {
      const svgs = document.querySelectorAll('svg');
      const results = [];

      svgs.forEach((svg, i) => {
        const rect = svg.getBoundingClientRect();
        // Only visible SVGs in viewport
        if (rect.top >= -500 && rect.top <= 1500 && rect.width > 100) {
          const paths = svg.querySelectorAll('path');
          if (paths.length > 0) {
            const pathData = [];
            paths.forEach((p, j) => {
              const d = p.getAttribute('d');
              const stroke = p.getAttribute('stroke');
              if (d && d.length > 30) {
                pathData.push({
                  j,
                  stroke: stroke,
                  d: d.substring(0, 150)
                });
              }
            });
            if (pathData.length > 0) {
              results.push({
                i,
                y: Math.round(rect.top),
                w: Math.round(rect.width),
                h: Math.round(rect.height),
                paths: pathData.slice(0, 5)
              });
            }
          }
        }
      });

      return { scrollY: y, svgs: results };
    });

    console.log(`\n=== Scroll ${y} ===`);
    if (content.svgs.length > 0) {
      console.log(JSON.stringify(content, null, 2));
    }
  }

  await page.screenshot({ path: '/tmp/vercel-enterprise-full.png', fullPage: true });
  console.log('\nScreenshot saved');

  await browser.close();
})();
