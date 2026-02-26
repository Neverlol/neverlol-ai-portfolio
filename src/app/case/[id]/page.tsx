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
      {/* Glassmorphism Navigation */}
      <ArticleNav />
      <ArticleNavMobile />

      {/* Header */}
      <div className="border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/#portfolio")} className="flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回作品集
          </button>
          {user && (
            <button onClick={() => router.push("/admin")} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">
              管理后台
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* WeChat Public Account Style Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 pb-6 border-b border-white/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#245fff] to-[#8b5cf6] flex items-center justify-center text-white font-semibold text-lg">
              N
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
