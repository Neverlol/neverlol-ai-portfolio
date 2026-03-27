import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, addDoc, getDoc, doc, setDoc, deleteDoc, orderBy } from 'firebase/firestore'
import type { Project, EvolutionLog, Comment, SandboxConfig } from '@/lib/database.types'

// ==================== 迁移设置 ====================
// 使用本地生成的 JSON 作为内容来源 (由 nl-publish 同步)
import projectsBackup from '../data/projects.json'
import logsBackup from '../data/evolution_logs.json'

// ==================== Projects 操作 (已切换至本地/Obsidian流) ====================

export async function getProjects(): Promise<Project[]> {
  // 转换 col_span 和 sections 为正确的格式
  return (projectsBackup || []).map((row: any) => ({
    ...row,
    col_span: row.col_span || 'col-span-1 lg:col-span-2',
    sections: typeof row.sections === 'string' ? JSON.parse(row.sections) : row.sections,
  })) as Project[]
}

export async function getProjectById(id: string): Promise<Project | null> {
  const project = projectsBackup.find(p => p.id === id)
  if (!project) return null
  
  return {
    ...project,
    col_span: (project as any).col_span || 'col-span-1 lg:col-span-2',
    sections: typeof (project as any).sections === 'string' ? JSON.parse((project as any).sections) : (project as any).sections,
  } as Project
}

// 管理端操作暂不迁移，未来通过 nl-publish 指令自动处理
export async function createProject(project: any) { return null }
export async function updateProject(id: string, project: any) { return null }
export async function deleteProject(id: string) { return false }

// ==================== Evolution Logs 操作 (已切换至本地/Obsidian流) ====================

export async function getEvolutionLogs(): Promise<EvolutionLog[]> {
  return (logsBackup || []) as EvolutionLog[]
}

export async function getEvolutionLogById(id: string): Promise<EvolutionLog | null> {
  const log = logsBackup.find(l => l.id === id)
  return (log || null) as EvolutionLog | null
}

export async function createEvolutionLog(log: any) { return null }
export async function updateEvolutionLog(id: string, log: any) { return null }
export async function deleteEvolutionLog(id: string) { return false }

// ==================== Comments 操作 (已切换至 Firebase) ====================

export async function getComments(articleType: 'project' | 'log', articleId: string): Promise<Comment[]> {
  try {
    const q = query(
      collection(db, 'comments'),
      where('article_type', '==', articleType),
      where('article_id', '==', articleId),
      orderBy('created_at', 'asc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Comment[]
  } catch (error) {
    console.error('Error fetching comments from Firebase:', error)
    return []
  }
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment | null> {
  try {
    const docRef = await addDoc(collection(db, 'comments'), {
      ...comment,
      author_name: comment.author_name || '匿名访客',
      created_at: new Date().toISOString(),
    })
    return { id: docRef.id, ...comment } as Comment
  } catch (error) {
    console.error('Error creating comment in Firebase:', error)
    return null
  }
}

export async function deleteComment(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'comments', id))
    return true
  } catch (error) {
    console.error('Error deleting comment in Firebase:', error)
    return false
  }
}

// ==================== Consulting Leads (已切换至 Firebase) ====================

export interface ConsultingLead {
  id?: string;
  contact_info: string;
  bottleneck_type: string;
  business_desc?: string;
  status?: string;
  created_at?: string;
}

export async function submitConsultingLead(lead: Omit<ConsultingLead, 'id' | 'created_at' | 'status'>): Promise<boolean> {
  try {
    await addDoc(collection(db, 'consulting_leads'), {
      ...lead,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
    return true
  } catch (error) {
    console.error('Error submitting consulting lead to Firebase:', error)
    return false
  }
}

// ==================== Sandbox Configs 操作 (已切换至 Firebase) ====================

export async function getSandboxConfig(id: string): Promise<SandboxConfig | null> {
  try {
    const docRef = doc(db, 'sandbox_configs', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id,
        ...data,
        nodes_json: typeof data.nodes_json === 'string' ? JSON.parse(data.nodes_json) : data.nodes_json,
        edges_json: typeof data.edges_json === 'string' ? JSON.parse(data.edges_json) : data.edges_json,
      } as SandboxConfig
    }
    return null
  } catch (error) {
    console.error('Error fetching sandbox config from Firebase:', error)
    return null
  }
}

export async function saveSandboxConfig(id: string, config: { name: string; nodes_json: unknown[]; edges_json: unknown[] }): Promise<SandboxConfig | null> {
  try {
    const data = {
      name: config.name,
      nodes_json: config.nodes_json,
      edges_json: config.edges_json,
      updated_at: new Date().toISOString()
    }
    await setDoc(doc(db, 'sandbox_configs', id), data, { merge: true })
    return { id, ...data } as SandboxConfig
  } catch (error) {
    console.error('Error saving sandbox config to Firebase:', error)
    return null
  }
}
