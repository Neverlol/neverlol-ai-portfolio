import { createClient } from '@/lib/supabase'
import type { Project, EvolutionLog, Comment, SandboxConfig } from '@/lib/database.types'

// 创建 Supabase 客户端单例
let supabase: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!supabase) {
    supabase = createClient()
  }
  return supabase
}

// ==================== Projects 操作 ====================

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  // 转换 col_span 和 sections 为正确的格式
  return (data || []).map((row: Record<string, unknown>) => ({
    ...row,
    col_span: (row.col_span as string) || 'col-span-1 lg:col-span-2',
    sections: typeof row.sections === 'string' ? JSON.parse(row.sections as string) : row.sections,
  })) as Project[]
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return {
    ...data,
    col_span: data.col_span || 'col-span-1 lg:col-span-2',
    sections: typeof data.sections === 'string' ? JSON.parse(data.sections) : data.sections,
  } as Project
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      id: crypto.randomUUID(),
      title: project.title,
      subtitle: project.subtitle,
      tags: project.tags,
      metrics: project.metrics,
      icon: project.icon,
      col_span: project.col_span,
      sections: project.sections,
      markdown_content: project.markdown_content || '',
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
  }

  return data as Project
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .update({
      title: project.title,
      subtitle: project.subtitle,
      tags: project.tags,
      metrics: project.metrics,
      icon: project.icon,
      col_span: project.col_span,
      sections: project.sections,
      markdown_content: project.markdown_content,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    return null
  }

  return data as Project
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return false
  }

  return true
}

// ==================== Evolution Logs 操作 ====================

export async function getEvolutionLogs(): Promise<EvolutionLog[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('evolution_logs')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching evolution logs:', error)
    return []
  }

  return (data || []) as EvolutionLog[]
}

export async function createEvolutionLog(log: Omit<EvolutionLog, 'id' | 'created_at' | 'updated_at'>): Promise<EvolutionLog | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('evolution_logs')
    .insert([{
      id: crypto.randomUUID(),
      date: log.date,
      title: log.title,
      tags: log.tags,
      type: log.type,
      markdown_content: log.markdown_content || '',
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating evolution log:', error)
    return null
  }

  return data as EvolutionLog
}

export async function updateEvolutionLog(id: string, log: Partial<EvolutionLog>): Promise<EvolutionLog | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('evolution_logs')
    .update({
      date: log.date,
      title: log.title,
      tags: log.tags,
      type: log.type,
      markdown_content: log.markdown_content,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating evolution log:', error)
    return null
  }

  return data as EvolutionLog
}

export async function deleteEvolutionLog(id: string): Promise<boolean> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('evolution_logs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting evolution log:', error)
    return false
  }

  return true
}

// ==================== 获取单条日志 ====================

export async function getEvolutionLogById(id: string): Promise<EvolutionLog | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('evolution_logs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching evolution log:', error)
    return null
  }

  return data as EvolutionLog
}

// ==================== Comments 操作 ====================

export async function getComments(articleType: 'project' | 'log', articleId: string): Promise<Comment[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_type', articleType)
    .eq('article_id', articleId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return (data || []) as Comment[]
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('comments')
    .insert([{
      id: crypto.randomUUID(),
      article_type: comment.article_type,
      article_id: comment.article_id,
      author_name: comment.author_name || '匿名访客',
      content: comment.content,
      parent_id: comment.parent_id,
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating comment:', error)
    return null
  }

  return data as Comment
}

export async function deleteComment(id: string): Promise<boolean> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting comment:', error)
    return false
  }

  return true
}

// ==================== Consulting Leads (漏斗收口) ====================

export interface ConsultingLead {
  id?: string;
  contact_info: string;
  bottleneck_type: string;
  business_desc?: string;
  status?: string;
  created_at?: string;
}

export async function submitConsultingLead(lead: Omit<ConsultingLead, 'id' | 'created_at' | 'status'>): Promise<boolean> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('consulting_leads')
    .insert([{
      ...lead,
      status: 'pending'
    }])

  if (error) {
    console.error('Error submitting consulting lead:', error)
    return false
  }

  return true
}

// ==================== Sandbox Configs 操作 ====================

export async function getSandboxConfig(id: string): Promise<SandboxConfig | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('sandbox_configs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching sandbox config:', error)
    return null
  }

  return {
    ...data,
    nodes_json: typeof data.nodes_json === 'string' ? JSON.parse(data.nodes_json) : data.nodes_json,
    edges_json: typeof data.edges_json === 'string' ? JSON.parse(data.edges_json) : data.edges_json,
  } as SandboxConfig
}

export async function saveSandboxConfig(id: string, config: { name: string; nodes_json: unknown[]; edges_json: unknown[] }): Promise<SandboxConfig | null> {
  const supabase = getSupabase()

  // 先尝试更新，如果不存在则插入
  const { data: existing } = await supabase
    .from('sandbox_configs')
    .select('id')
    .eq('id', id)
    .single()

  if (existing) {
    // 更新
    const { data, error } = await supabase
      .from('sandbox_configs')
      .update({
        name: config.name,
        nodes_json: config.nodes_json,
        edges_json: config.edges_json,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating sandbox config:', error)
      return null
    }

    return data as SandboxConfig
  } else {
    // 插入
    const { data, error } = await supabase
      .from('sandbox_configs')
      .insert([{
        id,
        name: config.name,
        nodes_json: config.nodes_json,
        edges_json: config.edges_json,
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating sandbox config:', error)
      return null
    }

    return data as SandboxConfig
  }
}
