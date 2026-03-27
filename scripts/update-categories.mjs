import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = '/Volumes/NeverlolDisk/NeverlolDB/0.Obsidian_Brain/05_网页发布WebPublish/projects/';

const MAPPING = {
  'attribution': ['bi-diagnoser.md', 'tableau-bi.md', 'fake-leads-audit.md'],
  'sales-enablement': ['dynamic-rfm.md', 'unicorn-upsell.md'],
  'activation': ['coaching-agent.md', 'high-pressure-elimination.md', 'rookie-ramp-up.md', 'rag-copilot.md'],
  'lead-scoring': ['sales-broadcaster.md', 't90-churn-prevention.md', 'apollo-handover-crisis.md']
};

for (const [category, files] of Object.entries(MAPPING)) {
  for (const file of files) {
    const filePath = path.join(PROJECTS_DIR, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      if (content.startsWith('---')) {
        // Find end of YAML
        const endOfYaml = content.indexOf('---', 3);
        if (endOfYaml !== -1) {
          let yamlPart = content.substring(0, endOfYaml);
          if (!yamlPart.includes('category:')) {
            const newYamlPart = yamlPart.trim() + `\ncategory: "${category}"\n`;
            content = newYamlPart + '---' + content.substring(endOfYaml + 3);
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file} with category: ${category}`);
          }
        }
      }
    }
  }
}
