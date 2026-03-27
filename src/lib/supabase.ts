import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 迁移说明：目前已全面转向 Firebase，Supabase 仅作为兜底/渐进清理保留。
  // 提供 Mock 字符串防止环境变量缺失时 createBrowserClient 报错导致整站崩溃。
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key'
  )
}
