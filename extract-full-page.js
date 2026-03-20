const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Try the homepage and scroll through entire page
  console.log('Loading vercel.com...');
  await page.goto('https://vercel.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));

  // Full page scroll to find all visible content
  console.log('Full page scan...');

  const allVisibleContent = await page.evaluate(() => {
    const results = [];
    const positions = [0, 300, 600, 900, 1200, 1500, 1800, 2100, 2400];

    for (const pos of positions) {
      window.scrollTo(0, pos);
      // Force reflow
      const dummy = document.body.offsetHeight;

      const elements = document.querySelectorAll('*');
      const colored = [];

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 50 && rect.height > 20) {
          const style = window.getComputedStyle(el);
          const bg = style.backgroundColor;
          // Look for cyan/blue/green/red colors
          if (bg.includes('59, 130') || bg.includes('16, 185') || bg.includes('239, 68') ||
              bg.includes('34, 211') || bg.includes('6, 182') || bg.includes('52, 211')) {
            colored.push({
              y: Math.round(rect.top),
              tag: el.tagName,
              className: el.className?.substring(0, 40),
              bg: bg
            });
          }
        }
      });

      if (colored.length > 0) {
        results.push({ scrollY: pos, elements: colored.slice(0, 3) });
      }
    }

    return results;
  });

  console.log(JSON.stringify(allVisibleContent, null, 2));

  // Look for any elements containing the specific labels
  const labels = await page.evaluate(() => {
    const results = [];
    const keywords = ['Requests', 'Edge', 'Serverless', 'ISR', 'Success', 'Errors'];

    keywords.forEach(keyword => {
      const els = Array.from(document.querySelectorAll('*')).filter(el =>
        el.textContent && el.textContent.includes(keyword)
      );

      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          results.push({
            keyword,
            y: Math.round(rect.top),
            text: el.textContent.substring(0, 50)
          });
        }
      });
    });

    return results;
  });

  console.log('\n=== Labels Found ===');
  console.log(JSON.stringify(labels, null, 2));

  await page.screenshot({ path: '/tmp/vercel-full-scan.png', fullPage: true });
  console.log('Screenshot saved');

  await browser.close();
})();
