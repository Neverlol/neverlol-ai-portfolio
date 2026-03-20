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

  // Wait longer for animations to load
  await new Promise(r => setTimeout(r, 5000));

  // Try scrolling to trigger lazy-loaded content
  console.log('Scrolling to trigger lazy content...');
  const scrollPositions = [500, 1000, 1500, 2000, 2500];

  for (const pos of scrollPositions) {
    await page.evaluate((p) => window.scrollTo(0, p), pos);
    await new Promise(r => setTimeout(r, 1000));

    // Check for any new content appearing
    const newContent = await page.evaluate(() => {
      // Look for elements with specific colors in computed styles
      const allElements = document.querySelectorAll('*');
      const colored = [];

      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const borderColor = style.borderBottomColor;

        // Check for specific colors (blue, green, red)
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'rgb(255, 255, 255)' &&
            (bgColor.includes('59, 130') ||  // blue #3b82f6
             bgColor.includes('16, 185') ||   // green #10b981
             bgColor.includes('239, 68'))) {   // red #ef4444
          colored.push({
            tag: el.tagName,
            className: el.className?.substring(0, 50),
            bgColor: bgColor
          });
        }
      });

      return colored.slice(0, 5);
    });

    if (newContent.length > 0) {
      console.log(`At scroll ${pos}: Found colored elements`);
    }
  }

  // Take final screenshot
  await page.screenshot({ path: '/tmp/vercel-full-scroll.png', fullPage: true });
  console.log('Screenshot saved');

  // Look for any SVG with animation
  const animatedSvg = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg');
    const results = [];

    svgs.forEach((svg, i) => {
      const style = window.getComputedStyle(svg);
      const rect = svg.getBoundingClientRect();

      // Only visible SVGs
      if (rect.width > 100 && rect.height > 50 && style.display !== 'none') {
        const paths = svg.querySelectorAll('path');
        if (paths.length > 0) {
          results.push({
            index: i,
            width: rect.width,
            height: rect.height,
            pathCount: paths.length,
            viewBox: svg.getAttribute('viewBox')
          });
        }
      }
    });

    return results;
  });

  console.log('\n=== Visible SVGs ===');
  console.log(JSON.stringify(animatedSvg, null, 2));

  // Get the canvas content
  const canvasData = await page.evaluate(() => {
    const canvases = document.querySelectorAll('canvas');
    const results = [];

    canvases.forEach((canvas, i) => {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');

      results.push({
        index: i,
        width: canvas.width,
        height: canvas.height,
        clientWidth: rect.width,
        clientHeight: rect.height,
        hasContext: !!ctx
      });
    });

    return results;
  });

  console.log('\n=== Canvas Data ===');
  console.log(JSON.stringify(canvasData, null, 2));

  await browser.close();
})();
