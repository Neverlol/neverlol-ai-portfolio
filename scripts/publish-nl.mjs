import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const OBSIDIAN_PATH = '/Volumes/NeverlolDisk/NeverlolDB/0.Obsidian_Brain/05_网页发布WebPublish'
const PROJECT_PATH = process.cwd()
const DATA_CACHE_PATH = path.join(PROJECT_PATH, 'src', 'data')
const PUBLIC_STATIC_PATH = path.join(PROJECT_PATH, 'public', 'static')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function syncContent() {
  console.log('🚀 Starting nl-publish Sync...')
  
  ensureDir(DATA_CACHE_PATH)
  ensureDir(PUBLIC_STATIC_PATH)

  // 1. Sync Projects
  const projectFiles = fs.readdirSync(path.join(OBSIDIAN_PATH, 'projects')).filter(f => f.endsWith('.md'))
    const projects = projectFiles.map(file => {
    const filePath = path.join(OBSIDIAN_PATH, 'projects', file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const parsed = matter(content)
    const body = parsed.content

    // 自动从正文中提取“业务痛点”和“落地效果/商业价值”
    const extractSectionFuzzy = (keywords) => {
      const escapedKeywords = keywords.join('|')
      // 1. 尝试匹配标题
      const headerRegex = new RegExp(`##.*(${escapedKeywords}).*\\n+([\\s\\S]*?)(?=\\n##|$)`, 'i')
      const match = body.match(headerRegex)
      if (match) {
        return match[2].trim().split('\n').filter(l => l.trim() && !l.startsWith('!['))[0]?.replace(/^>\s*/, '').trim() || ""
      }
      // 2. 兜底：尝试在全文前 500 字中寻找包含关键字的句子
      const sentenceRegex = new RegExp(`[^。！？\\n]*(${escapedKeywords})[^。！？\\n]*[。！？]`, 'i')
      const sentenceMatch = body.substring(0, 1000).match(sentenceRegex)
      return sentenceMatch ? sentenceMatch[0].trim().replace(/^>\s*/, '') : ""
    }

    const sections = parsed.data.sections || {
      problem: { title: "业务痛点", content: extractSectionFuzzy(["痛点", "挑战", "困局", "背景"]) },
      impact: { title: "商业价值", content: extractSectionFuzzy(["效果", "成效", "价值", "结果", "战果"]) },
      traditional: { title: "传统方案", content: extractSectionFuzzy(["传统", "现状", "过去"]) },
      ai: { title: "AI 重构", content: extractSectionFuzzy(["方案", "重构", "逻辑", "Agent", "功能"]) }
    }

    return {
      id: path.basename(file, '.md'),
      ...parsed.data,
      created_at: parsed.data.date || new Date().toISOString(), // 兼容日期字段
      subtitle: parsed.data.subtitle || body.trim().split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('>'))[0]?.substring(0, 100) || "",
      sections: sections,
      markdown_content: body,
      updated_at: new Date().toISOString()
    }
  })
  fs.writeFileSync(path.join(DATA_CACHE_PATH, 'projects.json'), JSON.stringify(projects, null, 2))
  console.log(`✅ Synced ${projects.length} projects.`)

  // 2. Sync Logs
  const logFiles = fs.readdirSync(path.join(OBSIDIAN_PATH, 'logs')).filter(f => f.endsWith('.md'))
  const logs = logFiles.map(file => {
    const filePath = path.join(OBSIDIAN_PATH, 'logs', file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const parsed = matter(content)
    return {
      id: path.basename(file, '.md'),
      ...parsed.data,
      date: parsed.data.date || new Date().toISOString(), // 统一使用 date 字段
      markdown_content: parsed.content,
      updated_at: new Date().toISOString()
    }
  })
  fs.writeFileSync(path.join(DATA_CACHE_PATH, 'evolution_logs.json'), JSON.stringify(logs, null, 2))
  console.log(`✅ Synced ${logs.length} evolution logs.`)

  // 3. Sync Attachments (Optional: check for used images in MD and copy them)
  const attachmentsDir = path.join(OBSIDIAN_PATH, 'attachments')
  if (fs.existsSync(attachmentsDir)) {
    const attachments = fs.readdirSync(attachmentsDir)
    attachments.forEach(file => {
      fs.copyFileSync(path.join(attachmentsDir, file), path.join(PUBLIC_STATIC_PATH, file))
    })
    console.log(`✅ Synced ${attachments.length} attachments to public/static/.`)
  }

  console.log('\n✨ Sync Complete! Articles are now updated in the local JSON cache.')
}

syncContent().catch(console.error)
