const fs = require('fs');

const { execSync } = require('child_process');

try {
  // We already saw the exact map where it exists:
  // .next/dev/static/chunks/my-ai-portfolio_src_components_31457713._.js.map
  let content = fs.readFileSync('.next/dev/static/chunks/my-ai-portfolio_src_components_31457713._.js.map', 'utf8');
  let lines = content.split('\n');
  let firstMatch = lines.find(l => l.includes('CampaignFlowCanvas.tsx'));
  if (firstMatch) {
     let json = JSON.parse(firstMatch);
     let sourceCode = json.map.sourcesContent[0];
     fs.writeFileSync('src/components/CampaignFlowCanvas.tsx', sourceCode);
     console.log('SUCCESS');
  } else {
     console.log('FAIL');
  }
} catch(e) {
  console.log(e);
}
