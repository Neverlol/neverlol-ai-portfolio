"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, BookOpen, Activity, GraduationCap, Radio, Loader2, MessageCircle, Send, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useParams, useRouter } from "next/navigation";
import { getProjectById, getProjects, getComments, createComment } from "@/lib/db";
import type { Project, Comment } from "@/lib/database.types";
import { useAuth } from "@/lib/useAuth";
import { ArticleNav, ArticleNavMobile } from "@/components/ArticleNav";
import { HandDrawnTag } from "@/components/HandDrawn";
import { Header } from "@/components/Header";

const iconMap: Record<string, React.ElementType> = {
  Zap, BookOpen, Activity, GraduationCap, Radio,
};

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProject();
    }
  }, [params.id]);

  const loadProject = async () => {
    try {
      const [projectData, projectsData, commentsData] = await Promise.all([
        getProjectById(params.id as string),
        getProjects(),
        getComments('project', params.id as string)
      ]);
      setProject(projectData);
      setAllProjects(projectsData);
      setComments(commentsData);
    } catch (error) {
      console.error("Failed to load project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);

    const comment = await createComment({
      article_type: 'project',
      article_id: params.id as string,
      author_name: commentAuthor.trim() || '匿名访客',
      content: newComment.trim(),
      parent_id: null,
    });

    if (comment) {
      setComments([...comments, comment]);
      setNewComment("");
      setShowCommentForm(false);
    }
    setSubmitting(false);
  };

  // 计算上下篇
  const currentIndex = allProjects.findIndex(p => p.id === params.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#245fff] animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#a3a3a3] mb-4">案例不存在</p>
          <button onClick={() => router.push("/")} className="px-4 py-2 bg-[#245fff] text-white rounded-lg">返回首页</button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[project.icon] || Zap;

  return (
    <div className="min-h-screen bg-[#0D1117] pb-20 md:pb-0">
      <Header />

      {/* Glassmorphism Navigation */}
      <ArticleNav />
      <ArticleNavMobile />

      <div className="max-w-4xl mx-auto px-6 py-12 pt-28">
        {/* WeChat Public Account Style Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 pb-6 border-b border-white/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex items-center justify-center w-12 h-12 bg-black border border-white/20 rounded-full overflow-hidden">
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blink {
                  0%, 50% { opacity: 1; }
                  51%, 100% { opacity: 0; }
                }
                .cursor-blink {
                  animation: blink 1s step-end infinite;
                }
              `}} />
              <span className="font-mono font-bold text-xs text-[#0066FF] absolute left-1 top-1/2 -translate-y-1/2">{'>'}</span>
              <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="caseAvatarLeftBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dddddd" />
                  </linearGradient>
                  <linearGradient id="caseAvatarRightBarFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eeeeee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#eeeeee" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="caseAvatarDiagFade" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#eeeeee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#cccccc" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <rect x="28" y="22" width="10" height="56" fill="url(#caseAvatarLeftBarGrad)" />
                <rect x="62" y="22" width="10" height="32" fill="url(#caseAvatarRightBarFade)" />
                <polygon points="28,22 38,22 72,78 62,78" fill="url(#caseAvatarDiagFade)" />
              </svg>
              <span className="cursor-blink absolute right-1.5 top-[55%] -translate-y-1/2">
                <span className="font-mono text-[10px] text-[#0066FF]">_</span>
              </span>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">Neverlol</div>
              <div className="text-[#8b949e] text-sm">
                {new Date(project.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-2">·</span>
                阅读 {Math.floor(Math.random() * 1000) + 100}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#1e3a5f] text-[#58a6ff] rounded-full text-xs">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">{project.title}</h1>
          <p className="text-lg text-[#8b949e] mb-4">{project.subtitle}</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
            <span className="text-green-400 font-medium">{project.metrics}</span>
          </div>
        </motion.div>

        {/* Quick Overview */}
        {project.sections && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12 nightwatch-card p-6">
            <h2 className="text-lg font-medium text-white mb-4">快速概览</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5">
                  <span className="text-xs font-medium text-red-400">业务痛点</span>
                </div>
                <p className="text-sm text-[#a3a3a3]">{project.sections.problem?.content}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/05">
                  <span className="text-xs font-medium text-green-400">商业价值</span>
                </div>
                <p className="text-sm text-green-400">{project.sections.impact?.content}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Markdown Content */}
        {project.markdown_content ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MarkdownRenderer content={project.markdown_content} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Problem */}
            <div className="nightwatch-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <HandDrawnTag variant="yellow" icon="bulb">业务痛点</HandDrawnTag>
              </div>
              <p className="text-[#a3a3a3] leading-relaxed">{project.sections?.problem?.content}</p>
            </div>

            {/* Traditional */}
            <div className="nightwatch-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <HandDrawnTag variant="purple" icon="pen">传统方案</HandDrawnTag>
              </div>
              <p className="text-[#a3a3a3] leading-relaxed">{project.sections?.traditional?.content}</p>
            </div>

            {/* AI Solution */}
            <div className="nightwatch-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <HandDrawnTag variant="blue" icon="zap">AI 重构</HandDrawnTag>
              </div>
              <p className="text-[#a3a3a3] leading-relaxed">{project.sections?.ai?.content}</p>
            </div>

            {/* Impact */}
            <div className="nightwatch-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <HandDrawnTag variant="green" icon="target">商业价值</HandDrawnTag>
              </div>
              <p className="text-green-400 leading-relaxed font-medium">{project.sections?.impact?.content}</p>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 flex justify-between gap-4">
          {prevProject ? (
            <button onClick={() => router.push(`/case/${prevProject.id}`)} className="nav-card nav-card-previous flex-1 text-left group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 上一篇
                </div>
                <span className="nav-tag">{prevProject.tags?.[0] || '案例'}</span>
              </div>
              <div className="text-white font-medium truncate">{prevProject.title}</div>
            </button>
          ) : <div className="flex-1" />}

          {nextProject ? (
            <button onClick={() => router.push(`/case/${nextProject.id}`)} className="nav-card nav-card-next flex-1 text-right group">
              <div className="flex items-center justify-between mb-2">
                <span className="nav-tag">{nextProject.tags?.[0] || '案例'}</span>
                <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
                  下一篇 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="text-white font-medium truncate">{nextProject.title}</div>
            </button>
          ) : <div className="flex-1" />}
        </motion.div>

        {/* Comments Section - Gradient Border Style */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 pt-8 border-t border-white/5">
          {/* Gradient Border Container */}
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#245fff] via-[#8b5cf6] to-[#245fff]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#245fff]/20 via-[#8b5cf6]/20 to-[#245fff]/20 blur-lg -z-10" />
            <div className="bg-[#0D1117] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#8b5cf6]" />
                  留言 ({comments.length})
                </h3>
                <button onClick={() => setShowCommentForm(!showCommentForm)} className="text-sm text-[#8b5cf6] hover:underline">
                  发表评论
                </button>
              </div>

              {/* Comment Form */}
              {showCommentForm && (
                <div className="mb-6 p-4 bg-[#161b22] border border-white/10 rounded-xl">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="你的昵称（可选）"
                    className="w-full px-4 py-2 mb-3 bg-[#0D1117] border border-white/10 rounded-lg text-white placeholder:text-[#8b949e]"
                  />
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="写下你的评论..."
                    rows={3}
                    className="w-full px-4 py-2 mb-3 bg-[#0D1117] border border-white/10 rounded-lg text-white placeholder:text-[#8b949e] resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowCommentForm(false)} className="px-4 py-2 text-[#8b949e] hover:text-white">取消</button>
                    <button onClick={handleSubmitComment} disabled={submitting || !newComment.trim()} className="px-4 py-2 bg-gradient-to-r from-[#245fff] to-[#8b5cf6] text-white rounded-lg disabled:opacity-50 flex items-center gap-2">
                      <Send className="w-4 h-4" /> 提交
                    </button>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-[#161b22] border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-medium">{comment.author_name}</span>
                      <span className="text-[#8b949e] text-sm">·</span>
                      <span className="text-[#8b949e] text-sm">{new Date(comment.created_at).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <p className="text-[#c9d1d9]">{comment.content}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-center text-[#8b949e] py-8">暂无留言，快来发表第一条评论吧！</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
