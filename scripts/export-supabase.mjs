import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const tables = [
  'projects',
  'evolution_logs',
  'comments',
  'consulting_leads',
  'sandbox_configs'
]

async function exportTable(table) {
  console.log(`Exporting ${table}...`)
  const { data, error } = await supabase.from(table).select('*')
  
  if (error) {
    console.error(`Error exporting ${table}:`, error.message)
    return
  }
  
  const filePath = path.join('backups', 'supabase', `${table}.json`)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  console.log(`Successfully exported ${table} to ${filePath} (${data.length} records)`)
}

async function main() {
  const backupDir = path.join('backups', 'supabase')
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }
  
  for (const table of tables) {
    await exportTable(table)
  }
  
  console.log('\nBackup complete!')
}

main().catch(console.error)
