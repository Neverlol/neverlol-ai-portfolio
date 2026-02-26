// Projects 表的类型定义 (Problem-Traditional-AI-Impact 四段论)
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  metrics: string;
  icon: string;
  col_span: string;
  sections: {
    problem: { title: string; content: string };
    traditional: { title: string; content: string };
    ai: { title: string; content: string };
    impact: { title: string; content: string };
  };
  // Markdown 文章内容
  markdown_content?: string;
  created_at: string;
  updated_at: string;
}

// Evolution Logs 表的类型定义
export interface EvolutionLog {
  id: string;
  date: string;
  title: string;
  tags: string[];
  type: 'milestone' | 'insight' | 'achievement' | 'learn' | 'project';
  // Markdown 文章内容
  markdown_content?: string;
  created_at: string;
  updated_at: string;
}

// Comments 表的类型定义
export interface Comment {
  id: string;
  article_type: 'project' | 'log';
  article_id: string;
  author_name: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

// 从 Supabase 获取的数据类型 (包含 supabase 自动添加的字段)
export type ProjectRow = Project
export type EvolutionLogRow = EvolutionLog
export type CommentRow = Comment
