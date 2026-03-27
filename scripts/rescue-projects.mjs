import fs from 'fs';
import path from 'path';

const BACKUP_FILE = 'backups/supabase/projects.json';
const OUTPUT_DIR = '/Volumes/NeverlolDisk/NeverlolDB/0.Obsidian_Brain/05_网页发布WebPublish/projects';

async function migrate() {
  console.log('📦 Starting Project-to-Markdown Migration...');

  if (!fs.existsSync(BACKUP_FILE)) {
    console.error('❌ Backup file not found!');
    return;
  }

  const projects = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'));
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const p of projects) {
    // Generate valid frontmatter
    const frontmatter = [
      '---',
      `id: ${p.id}`,
      `title: "${p.title.replace(/"/g, '\\"')}"`,
      `date: "${p.created_at || new Date().toISOString()}"`,
      `metric: "${(p.metrics || '').replace(/"/g, '\\"')}"`,
      `tags: ${JSON.stringify(p.tags || [])}`,
      `icon: "${p.icon || 'Zap'}"`,
      '---',
      '',
      p.markdown_content || ''
    ].join('\n');

    const fileName = `${p.id}.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), frontmatter);
    console.log(`✅ Converted: ${fileName}`);
  }

  console.log('\n✨ Migration Complete! Now run nl-publish to sync to web.');
}

migrate().catch(console.error);
