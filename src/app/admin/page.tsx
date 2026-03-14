"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";
import { getProjects, createProject, updateProject, deleteProject, getEvolutionLogs, createEvolutionLog, updateEvolutionLog, deleteEvolutionLog } from "@/lib/db";
import type { Project, EvolutionLog } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import {
  Plus, Trash2, Save, ArrowLeft, LogOut, FolderOpen, GitCommit,
  Zap, BookOpen, Activity, GraduationCap, Radio, Search, X, Image, Eye, Edit3, LayoutGrid, Network
} from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { HandDrawnTag } from "@/components/HandDrawn";
import { initialNodes as capabilityNodes, initialEdges as capabilityEdges, nodeTypes as capabilityNodeTypes } from "@/components/CapabilityFlowCanvas";
import { initialNodes as campaignsNodes, initialEdges as campaignsEdges, nodeTypes as campaignsNodeTypes, edgeTypes as campaignsEdgeTypes } from "@/components/CampaignFlowCanvas";
import CampaignFlowCanvas from "@/components/CampaignFlowCanvas";
import CapabilityFlowCanvas from "@/components/CapabilityFlowCanvas";
import SandboxEditor from "@/components/SandboxEditor";

// Project icons
const iconOptions = [
  { value: "Zap", label: "Zap", icon: Zap },
  { value: "BookOpen", label: "BookOpen", icon: BookOpen },
  { value: "Activity", label: "Activity", icon: Activity },
  { value: "GraduationCap", label: "GraduationCap", icon: GraduationCap },
  { value: "Radio", label: "Radio", icon: Radio },
];

const colSpanOptions = [
  { value: "col-span-1", label: "1列" },
  { value: "col-span-1 lg:col-span-2", label: "2列" },
  { value: "col-span-1 lg:col-span-3", label: "3列" },
];

const logTypeOptions = [
  { value: "milestone", label: "里程碑", color: "text-yellow-400" },
  { value: "insight", label: "思考", color: "text-purple-400" },
  { value: "achievement", label: "成就", color: "text-green-400" },
  { value: "learn", label: "学习", color: "text-blue-400" },
  { value: "project", label: "项目", color: "text-orange-400" },
];

// 空数据生成函数
const emptyProject = (): Omit<Project, 'id' | 'created_at' | 'updated_at'> => ({
  title: "",
  subtitle: "",
  tags: [],
  metrics: "",
  icon: "Zap",
  col_span: "col-span-1 lg:col-span-2",
  sections: {
    problem: { title: "业务痛点", content: "" },
    traditional: { title: "传统方案", content: "" },
    ai: { title: "AI 重构", content: "" },
    impact: { title: "商业价值", content: "" },
  },
  markdown_content: "",
});

const emptyLog = (): Omit<EvolutionLog, 'id' | 'created_at' | 'updated_at'> => ({
  date: new Date().toISOString().split('T')[0],
  title: "",
  tags: [],
  markdown_content: "",
  type: "milestone",
});

type Tab = "projects" | "logs" | "campaigns" | "capability";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();

  // 数据状态
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [logs, setLogs] = useState<EvolutionLog[]>([]);
  const [loading, setLoading] = useState(true);

  // 编辑状态
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingLog, setEditingLog] = useState<Partial<EvolutionLog> | null>(null);
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  // 加载数据
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
      return;
    }

    if (user) {
      loadData();
    }
  }, [user, authLoading, router]);

  const loadData = async () => {
    setLoading(true);
    const [projectsData, logsData] = await Promise.all([
      getProjects(),
      getEvolutionLogs(),
    ]);
    setProjects(projectsData);
    setLogs(logsData);
    setLoading(false);
  };

  const showSavedMessage = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 2000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // ========== Project 操作 ==========
  const handleAddProject = () => setEditingProject(emptyProject());
  const handleEditProject = (project: Project) => setEditingProject({ ...project });

  const handleDeleteProject = async (id: string) => {
    if (!confirm("确定要删除这个案例吗？")) return;
    const success = await deleteProject(id);
    if (success) {
      setProjects(projects.filter((p) => p.id !== id));
      showSavedMessage("删除成功！");
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    setSaving(true);

    if (editingProject.id) {
      // 更新
      const updated = await updateProject(editingProject.id, editingProject);
      if (updated) {
        setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
        showSavedMessage("更新成功！");
      }
    } else {
      // 创建
      const created = await createProject(editingProject as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
      if (created) {
        setProjects([created, ...projects]);
        showSavedMessage("创建成功！");
      }
    }

    setSaving(false);
    setEditingProject(null);
  };

  const addTagToProject = () => {
    if (!editingProject || !newTag.trim()) return;
    setEditingProject({
      ...editingProject,
      tags: [...(editingProject.tags || []), newTag.trim()],
    });
    setNewTag("");
  };

  const removeTagFromProject = (tag: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      tags: editingProject.tags?.filter((t) => t !== tag) || [],
    });
  };

  // ========== Log 操作 ==========
  const handleAddLog = () => setEditingLog(emptyLog());
  const handleEditLog = (log: EvolutionLog) => setEditingLog({ ...log });

  const handleDeleteLog = async (id: string) => {
    if (!confirm("确定要删除这条日志吗？")) return;
    const success = await deleteEvolutionLog(id);
    if (success) {
      setLogs(logs.filter((l) => l.id !== id));
      showSavedMessage("删除成功！");
    }
  };

  const handleSaveLog = async () => {
    if (!editingLog) return;
    setSaving(true);

    if (editingLog.id) {
      // 更新
      const updated = await updateEvolutionLog(editingLog.id, editingLog);
      if (updated) {
        setLogs(logs.map((l) => (l.id === updated.id ? updated : l)));
        showSavedMessage("更新成功！");
      }
    } else {
      // 创建
      const created = await createEvolutionLog(editingLog as Omit<EvolutionLog, 'id' | 'created_at' | 'updated_at'>);
      if (created) {
        setLogs([created, ...logs]);
        showSavedMessage("创建成功！");
      }
    }

    setSaving(false);
    setEditingLog(null);
  };

  const addTagToLog = () => {
    if (!editingLog || !newTag.trim()) return;
    setEditingLog({
      ...editingLog,
      tags: [...(editingLog.tags || []), newTag.trim()],
    });
    setNewTag("");
  };

  const removeTagFromLog = (tag: string) => {
    if (!editingLog) return;
    setEditingLog({
      ...editingLog,
      tags: editingLog.tags?.filter((t) => t !== tag) || [],
    });
  };

  // 加载状态
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="animate-pulse text-[#a3a3a3]">加载中...</div>
      </div>
    );
  }

  // 未登录
  if (!user) {
    return null;
  }

  // ========== 项目编辑表单 ==========
  if (editingProject) {
    const isNew = !editingProject.id;
    const currentIcon = iconOptions.find((i) => i.value === editingProject.icon) || iconOptions[0];

    return (
      <div className="min-h-screen bg-[#0D1117] overflow-x-hidden">
        <div className="w-full max-w-none px-4 lg:px-6 pb-20">
          <button onClick={() => setEditingProject(null)} className="fixed top-6 left-6 z-40 flex items-center gap-2 text-[#a3a3a3] hover:text-white bg-[#161b22]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <ArrowLeft className="w-4 h-4" /> 返回列表
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0D1117]">
            <h2 className="text-xl font-semibold text-white mb-6">{isNew ? "新增案例" : "编辑案例"}</h2>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">标题</label>
                <input
                  type="text"
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                  placeholder="Dynamic RFM 2.0 Agent"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">副标题</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                  placeholder="从 RFM 到动态意向识别"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a3a3a3] mb-2">图标</label>
                  <select
                    value={editingProject.icon || "Zap"}
                    onChange={(e) => setEditingProject({ ...editingProject, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#a3a3a3] mb-2">列宽</label>
                  <select
                    value={editingProject.col_span || "col-span-1 lg:col-span-2"}
                    onChange={(e) => setEditingProject({ ...editingProject, col_span: e.target.value })}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                  >
                    {colSpanOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">量化指标</label>
                <input
                  type="text"
                  value={editingProject.metrics || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, metrics: e.target.value })}
                  className="w-full px- bg-black/304 py-2 border border-white/10 rounded-lg text-white"
                  placeholder="T+0 分层 | 识别速度 ↑30x"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">标签</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editingProject.tags || []).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/10 rounded-md text-sm text-white flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTagFromProject(tag)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTagToProject())}
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                    placeholder="添加标签..."
                  />
                  <button onClick={addTagToProject} className="px-4 py-2 bg-[#245fff] text-white rounded-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">四段论内容</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["problem", "traditional", "ai", "impact"] as const).map((section) => (
                  <div key={section} className="space-y-2">
                    <label className="block text-sm text-[#a3a3a3]">
                      {section === "problem" ? "业务痛点" : section === "traditional" ? "传统方案" : section === "ai" ? "AI 重构" : "商业价值"}
                    </label>
                    <textarea
                      value={editingProject.sections?.[section]?.content || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          sections: {
                            problem: { title: "业务痛点", content: editingProject.sections?.problem?.content || "" },
                            traditional: { title: "传统方案", content: editingProject.sections?.traditional?.content || "" },
                            ai: { title: "AI 重构", content: editingProject.sections?.ai?.content || "" },
                            impact: { title: "商业价值", content: editingProject.sections?.impact?.content || "" },
                            [section]: {
                              title: section === "problem" ? "业务痛点" : section === "traditional" ? "传统方案" : section === "ai" ? "AI 重构" : "商业价值",
                              content: e.target.value,
                            },
                          } as Project["sections"],
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white resize-none"
                      placeholder="输入内容..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Split View Markdown Editor - Full Width */}
            <div className="space-y-0 mt-6 -mx-6">
              {/* Sticky Toolbar */}
              <div className="sticky top-0 z-30 bg-[#161b22]/95 backdrop-blur-sm border-b border-white/10 px-6 py-3 flex items-center gap-2">
                <span className="text-xs font-medium text-[#8b949e] mr-2">工具:</span>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-project') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = textarea.value;
                    const selected = text.substring(start, end);
                    const newText = text.substring(0, start) + `**${selected || '粗体文本'}**` + text.substring(end);
                    setEditingProject({ ...editingProject, markdown_content: newText });
                    setTimeout(() => {
                      textarea.focus();
                      textarea.setSelectionRange(start + 2, start + 2 + (selected || '粗体文本').length);
                    }, 0);
                  }}
                  className="px-3 py-1.5 bg-[#1e1e1e] text-white rounded hover:bg-[#2d2d2d] text-sm flex items-center gap-1.5"
                  title="加粗"
                >
                  <span className="font-bold">B</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-project') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = textarea.value;
                    const selected = text.substring(start, end);
                    const newText = text.substring(0, start) + `[${selected || '链接文本'}](url)` + text.substring(end);
                    setEditingProject({ ...editingProject, markdown_content: newText });
                    setTimeout(() => {
                      textarea.focus();
                      textarea.setSelectionRange(start + 1, start + 1 + (selected || '链接文本').length);
                    }, 0);
                  }}
                  className="px-3 py-1.5 bg-[#1e1e1e] text-white rounded hover:bg-[#2d2d2d] text-sm flex items-center gap-1.5"
                  title="链接"
                >
                  <span className="underline">链接</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-project') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const text = textarea.value;
                    const newText = text.substring(0, start) + `\n![图片描述](图片URL)\n` + text.substring(start);
                    setEditingProject({ ...editingProject, markdown_content: newText });
                  }}
                  className="px-3 py-1.5 bg-[#1e3a5f] text-[#58a6ff] rounded hover:bg-[#1e3a5f]/80 text-sm flex items-center gap-1.5"
                  title="图片"
                >
                  <Image className="w-4 h-4" /> 图片
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-project') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const text = textarea.value;
                    const newText = text.substring(0, start) + `\n[youtube](https://www.youtube.com/watch?v=视频ID)\n` + text.substring(start);
                    setEditingProject({ ...editingProject, markdown_content: newText });
                  }}
                  className="px-3 py-1.5 bg-[#2d1f1f] text-red-400 rounded hover:bg-[#2d1f1f]/80 text-sm flex items-center gap-1.5"
                  title="YouTube视频"
                >
                  ▶ YouTube
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-project') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const text = textarea.value;
                    const newText = text.substring(0, start) + `\n\`\`\`python\n# 代码\n\`\`\`\n` + text.substring(start);
                    setEditingProject({ ...editingProject, markdown_content: newText });
                  }}
                  className="px-3 py-1.5 bg-[#1e1e1e] text-white rounded hover:bg-[#2d2d2d] text-sm flex items-center gap-1.5"
                  title="代码块"
                >
                  &lt;/&gt;
                </button>
                <div className="flex-1" />
                <span className="text-xs text-[#6e7681]">支持 Tab 缩进</span>
              </div>

              {/* Split View - Full Width 50/50 */}
              <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-320px)] lg:h-[calc(100vh-280px)] min-h-[500px]">
                {/* Editor Panel */}
                <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0D1117] h-1/2 lg:h-full">
                  <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-white/10">
                    <span className="text-xs font-medium text-[#8b949e] flex items-center gap-2">
                      <Edit3 className="w-3 h-3" /> 编辑区
                    </span>
                  </div>
                  <textarea
                    id="markdown-editor-project"
                    value={editingProject.markdown_content || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, markdown_content: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const target = e.target as HTMLTextAreaElement;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const value = target.value;
                        target.value = value.substring(0, start) + '  ' + value.substring(end);
                        target.selectionStart = target.selectionEnd = start + 2;
                        setEditingProject({ ...editingProject, markdown_content: target.value });
                      }
                    }}
                    className="flex-1 w-full px-6 py-4 bg-transparent text-white resize-none font-mono text-sm leading-relaxed focus:outline-none overflow-y-auto"
                    placeholder="# 标题&#10;&#10;正文内容...&#10;&#10;```python&#10;代码块&#10;```&#10;&#10;| 表格 | 示例 |&#10;|------|------|&#10;| 内容 | 数据 |&#10;&#10;[youtube](https://www.youtube.com/watch?v=xxx)"
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  />
                </div>

                {/* Preview Panel */}
                <div className="w-full lg:w-1/2 flex flex-col bg-[#0D1117] h-1/2 lg:h-full">
                  <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-white/10">
                    <span className="text-xs font-medium text-[#8b949e] flex items-center gap-2">
                      <Eye className="w-3 h-3" /> 实时预览
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-none">
                      <MarkdownRenderer content={editingProject.markdown_content || "*暂无内容*"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setEditingProject(null)}
                className="px-6 py-2 border border-white/10 text-[#a3a3a3] rounded-lg hover:text-white"
              >
                取消
              </button>
              <button
                onClick={handleSaveProject}
                disabled={saving}
                className="px-6 py-2 bg-[#245fff] text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                保存
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ========== 日志编辑表单 ==========
  if (editingLog) {
    const isNew = !editingLog.id;

    return (
      <div className="min-h-screen bg-[#0D1117] overflow-x-hidden">
        <div className="w-full max-w-none px-4 lg:px-6 pb-20">
          <button onClick={() => setEditingLog(null)} className="fixed top-6 left-6 z-40 flex items-center gap-2 text-[#a3a3a3] hover:text-white bg-[#161b22]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <ArrowLeft className="w-4 h-4" /> 返回列表
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0D1117]">
            <h2 className="text-xl font-semibold text-white mb-6">{isNew ? "新增日志" : "编辑日志"}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">日期</label>
                <input
                  type="date"
                  value={editingLog.date || ""}
                  onChange={(e) => setEditingLog({ ...editingLog, date: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">标题</label>
                <input
                  type="text"
                  value={editingLog.title || ""}
                  onChange={(e) => setEditingLog({ ...editingLog, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                  placeholder="重构 RFM 逻辑为多智能体协作"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">类型</label>
                <select
                  value={editingLog.type || "milestone"}
                  onChange={(e) => setEditingLog({ ...editingLog, type: e.target.value as EvolutionLog['type'] })}
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                >
                  {logTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">标签</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editingLog.tags || []).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/10 rounded-md text-sm text-white flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTagFromLog(tag)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTagToLog())}
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
                    placeholder="添加标签..."
                  />
                  <button onClick={addTagToLog} className="px-4 py-2 bg-[#245fff] text-white rounded-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Split View Markdown Editor - Full Width */}
            <div className="space-y-0 mt-6 -mx-6">
              {/* Sticky Toolbar */}
              <div className="sticky top-0 z-30 bg-[#161b22]/95 backdrop-blur-sm border-b border-white/10 px-6 py-3 flex items-center gap-2">
                <span className="text-xs font-medium text-[#8b949e] mr-2">工具:</span>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-log') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = textarea.value;
                    const selected = text.substring(start, end);
                    const newText = text.substring(0, start) + `**${selected || '粗体文本'}**` + text.substring(end);
                    setEditingLog({ ...editingLog, markdown_content: newText });
                    setTimeout(() => {
                      textarea.focus();
                      textarea.setSelectionRange(start + 2, start + 2 + (selected || '粗体文本').length);
                    }, 0);
                  }}
                  className="px-3 py-1.5 bg-[#1e1e1e] text-white rounded hover:bg-[#2d2d2d] text-sm flex items-center gap-1.5"
                  title="加粗"
                >
                  <span className="font-bold">B</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-log') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const text = textarea.value;
                    const selected = text.substring(start, end);
                    const newText = text.substring(0, start) + `[${selected || '链接文本'}](url)` + text.substring(end);
                    setEditingLog({ ...editingLog, markdown_content: newText });
                    setTimeout(() => {
                      textarea.focus();
                      textarea.setSelectionRange(start + 1, start + 1 + (selected || '链接文本').length);
                    }, 0);
                  }}
                  className="px-3 py-1.5 bg-[#1e1e1e] text-white rounded hover:bg-[#2d2d2d] text-sm flex items-center gap-1.5"
                  title="链接"
                >
                  <span className="underline">链接</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-log') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const text = textarea.value;
                    const newText = text.substring(0, start) + `\n![图片描述](图片URL)\n` + text.substring(start);
                    setEditingLog({ ...editingLog, markdown_content: newText });
                  }}
                  className="px-3 py-1.5 bg-[#1e3a5f] text-[#58a6ff] rounded hover:bg-[#1e3a5f]/80 text-sm flex items-center gap-1.5"
                  title="图片"
                >
                  <Image className="w-4 h-4" /> 图片
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-log') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const text = textarea.value;
                    const newText = text.substring(0, start) + `\n[youtube](https://www.youtube.com/watch?v=视频ID)\n` + text.substring(start);
                    setEditingLog({ ...editingLog, markdown_content: newText });
                  }}
                  className="px-3 py-1.5 bg-[#2d1f1f] text-red-400 rounded hover:bg-[#2d1f1f]/80 text-sm flex items-center gap-1.5"
                  title="YouTube视频"
                >
                  ▶ YouTube
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const textarea = document.getElementById('markdown-editor-log') as HTMLTextAreaElement;
                    if (!textarea) return;
                    const start = textarea.selectionStart;
                    const text = textarea.value;
                    const newText = text.substring(0, start) + `\n\`\`\`python\n# 代码\n\`\`\`\n` + text.substring(start);
                    setEditingLog({ ...editingLog, markdown_content: newText });
                  }}
                  className="px-3 py-1.5 bg-[#1e1e1e] text-white rounded hover:bg-[#2d2d2d] text-sm flex items-center gap-1.5"
                  title="代码块"
                >
                  &lt;/&gt;
                </button>
                <div className="flex-1" />
                <span className="text-xs text-[#6e7681]">支持 Tab 缩进</span>
              </div>

              {/* Split View - Full Width 50/50 */}
              <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-420px)] lg:h-[calc(100vh-380px)] min-h-[500px]">
                {/* Editor Panel */}
                <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0D1117] h-1/2 lg:h-full">
                  <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-white/10">
                    <span className="text-xs font-medium text-[#8b949e] flex items-center gap-2">
                      <Edit3 className="w-3 h-3" /> 编辑区
                    </span>
                  </div>
                  <textarea
                    id="markdown-editor-log"
                    value={editingLog.markdown_content || ""}
                    onChange={(e) => setEditingLog({ ...editingLog, markdown_content: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const target = e.target as HTMLTextAreaElement;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const value = target.value;
                        target.value = value.substring(0, start) + '  ' + value.substring(end);
                        target.selectionStart = target.selectionEnd = start + 2;
                        setEditingLog({ ...editingLog, markdown_content: target.value });
                      }
                    }}
                    className="flex-1 w-full px-6 py-4 bg-transparent text-white resize-none font-mono text-sm leading-relaxed focus:outline-none overflow-y-auto"
                    placeholder="# 标题&#10;&#10;正文内容...&#10;&#10;```python&#10;代码块&#10;```&#10;&#10;| 表格 | 示例 |&#10;|------|------|&#10;| 内容 | 数据 |&#10;&#10;[youtube](https://www.youtube.com/watch?v=xxx)"
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  />
                </div>

                {/* Preview Panel */}
                <div className="w-full lg:w-1/2 flex flex-col bg-[#0D1117] h-1/2 lg:h-full">
                  <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-white/10">
                    <span className="text-xs font-medium text-[#8b949e] flex items-center gap-2">
                      <Eye className="w-3 h-3" /> 实时预览
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-none">
                      <MarkdownRenderer content={editingLog.markdown_content || "*暂无内容*"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setEditingLog(null)}
                className="px-6 py-2 border border-white/10 text-[#a3a3a3] rounded-lg hover:text-white"
              >
                取消
              </button>
              <button
                onClick={handleSaveLog}
                disabled={saving}
                className="px-6 py-2 bg-[#245fff] text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                保存
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ========== 主后台界面 ==========
  return (
    <div className="min-h-screen bg-[#171717] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white">管理后台</h1>
            <p className="text-[#a3a3a3] text-sm mt-1">管理作品集与进化日志</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a3a3a3]">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 border border-white/10 text-[#a3a3a3] rounded-lg hover:text-white flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {savedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm"
            >
              {savedMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "projects"
                ? "text-white border-[#245fff]"
                : "text-[#a3a3a3] border-transparent hover:text-white"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            案例管理 ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "logs"
                ? "text-white border-[#245fff]"
                : "text-[#a3a3a3] border-transparent hover:text-white"
            }`}
          >
            <GitCommit className="w-4 h-4" />
            进化日志 ({logs.length})
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "campaigns"
                ? "text-white border-[#245fff]"
                : "text-[#a3a3a3] border-transparent hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Campaigns 沙盘
          </button>
          <button
            onClick={() => setActiveTab("capability")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "capability"
                ? "text-white border-[#245fff]"
                : "text-[#a3a3a3] border-transparent hover:text-white"
            }`}
          >
            <Network className="w-4 h-4" />
            Capability 沙盘
          </button>
        </div>

        {/* Content */}
        {activeTab === "projects" ? (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-[#245fff] text-white rounded-lg flex items-center gap-2 hover:bg-[#1a4fd4] transition-colors"
              >
                <Plus className="w-4 h-4" />
                新增案例
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="dashboard-card"
                >
                  <h3 className="text-white font-medium mb-1">{project.title}</h3>
                  <p className="text-[#a3a3a3] text-sm mb-3">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(project.tags || []).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-[#a3a3a3]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <HandDrawnTag variant="green" icon="target" className="text-[10px]">KPI</HandDrawnTag>
                    <span className="text-xs text-green-400">{project.metrics}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="flex-1 px-3 py-1.5 bg-[#245fff]/10 border border-[#245fff]/20 text-[#245fff] rounded-lg text-sm hover:bg-[#245fff]/20 transition-colors"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {projects.length === 0 && (
              <div className="text-center py-12 text-[#a3a3a3]">暂无案例，点击「新增案例」添加</div>
            )}
          </>
        ) : activeTab === "logs" ? (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleAddLog}
                className="px-4 py-2 bg-[#245fff] text-white rounded-lg flex items-center gap-2 hover:bg-[#1a4fd4] transition-colors"
              >
                <Plus className="w-4 h-4" />
                新增日志
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logs.map((log) => {
                const typeConfig = logTypeOptions.find((t) => t.value === log.type) || logTypeOptions[0];
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <HandDrawnTag
                        variant={log.type === 'project' ? 'blue' : log.type === 'learn' ? 'yellow' : 'purple'}
                        icon={log.type === 'project' ? 'zap' : log.type === 'learn' ? 'bulb' : 'pen'}
                        className="text-[10px]"
                      >
                        {typeConfig.label}
                      </HandDrawnTag>
                      <span className="text-xs text-[#a3a3a3]">{log.date}</span>
                    </div>
                    <h3 className="text-white font-medium mb-3">{log.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(log.tags || []).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-[#a3a3a3]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditLog(log)}
                        className="flex-1 px-3 py-1.5 bg-[#245fff]/10 border border-[#245fff]/20 text-[#245fff] rounded-lg text-sm hover:bg-[#245fff]/20 transition-colors"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {logs.length === 0 && (
              <div className="text-center py-12 text-[#a3a3a3]">暂无日志，点击「新增日志」添加</div>
            )}
          </>
        ) : activeTab === "campaigns" ? (
          <>
            <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <LayoutGrid className="w-4 h-4 inline mr-2" />
                在此编辑 Campaigns 业务全景蓝图沙盘。支持拖拽节点、编辑内容、添加连线、保存配置等功能。
              </p>
            </div>
            <div className="h-[calc(100vh-300px)] min-h-[600px] border border-white/10 rounded-xl overflow-hidden">
              <SandboxEditor
                configId="campaigns"
                name="Campaigns 业务全景图"
                initialNodes={campaignsNodes}
                initialEdges={campaignsEdges}
                nodeTypes={campaignsNodeTypes}
                edgeTypes={campaignsEdgeTypes}
              />
            </div>
          </>
        ) : activeTab === "capability" ? (
          <>
            <div className="mb-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-purple-400 text-sm">
                <Network className="w-4 h-4 inline mr-2" />
                在此编辑 Capability 能力引擎沙盘。支持拖拽节点、编辑内容、添加连线、保存配置等功能。
              </p>
            </div>
            <div className="h-[calc(100vh-300px)] min-h-[600px] border border-white/10 rounded-xl overflow-hidden">
              <SandboxEditor
                configId="capability"
                name="Capability 能力引擎"
                initialNodes={capabilityNodes}
                initialEdges={capabilityEdges}
                nodeTypes={capabilityNodeTypes}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
