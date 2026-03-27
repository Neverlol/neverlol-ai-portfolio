import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

const OBSIDIAN_PATH = '/Volumes/NeverlolDisk/NeverlolDB/0.Obsidian_Brain/05_网页发布WebPublish'
const SYNC_SCRIPT = 'scripts/publish-nl.mjs'

console.log(`👀 Watching for changes in: ${OBSIDIAN_PATH}`)
console.log(`🚀 Automated sync is active. Edit your Obsidian files to see updates live.`)

let debounceTimer = null

function runSync() {
  console.log('\n📄 Change detected, syncing...')
  const sync = spawn('node', [SYNC_SCRIPT], { stdio: 'inherit' })
  sync.on('close', (code) => {
    if (code === 0) {
      console.log('✨ Sync successful! Refresh your browser to see changes.')
    } else {
      console.error('❌ Sync failed with code:', code)
    }
  })
}

// Watch recursively (macOS supports this in fs.watch)
fs.watch(OBSIDIAN_PATH, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.md')) {
    // Debounce to prevent multiple triggers from one save
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      runSync()
    }, 500) // 500ms delay
  }
})
