import fs from 'fs'
import path from 'path'

const BACKUP_FILE = 'backups/supabase/evolution_logs.json'
const OUTPUT_DIR = '/Volumes/NeverlolDisk/NeverlolDB/0.Obsidian_Brain/05_网页发布WebPublish/logs'

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\u4e00-\u9fa5a-z0-9-]/g, '') // Remove non-word chars (keep Chinese)
    .replace(/--+/g, '-')    // Replace multiple - with single -
}

async function migrate() {
  console.log('📦 Starting Log-to-Markdown Migration...')
  
  if (!fs.existsSync(BACKUP_FILE)) {
    console.error('❌ Backup file not found.')
    return
  }

  ensureDir(OUTPUT_DIR)
  const logs = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'))

  logs.forEach(log => {
    const slug = slugify(log.title || log.id)
    const fileName = `${log.date}-${slug}.md`
    const filePath = path.join(OUTPUT_DIR, fileName)

    const safeTitle = (log.title || '').replace(/"/g, '\\"')
    const frontmatter = [
      '---',
      `title: "${safeTitle}"`,
      `date: "${log.date}"`,
      `id: "${log.id}"`,
      `type: "${log.type}"`,
      `tags: [${(log.tags || []).join(', ')}]`,
      '---',
      '',
      log.markdown_content || ''
    ].join('\n')

    fs.writeFileSync(filePath, frontmatter)
    console.log(`✅ Converted: ${fileName}`)
  })

  console.log('\n✨ Migration Complete! Now run nl-publish to sync to web.')
}

migrate().catch(console.error)
