"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface MarkdownRendererProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Extract YouTube video ID
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const watchMatch = url.match(/watch\?v=([^&\s?]+)/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^&\s?]+)/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];
  const embedMatch = url.match(/embed\/([^&\s?]+)/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  return null;
}

function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function YouTubeEmbed({ url }: { url: string }) {
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    return <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">{url}</a>;
  }
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden my-6 border border-white/10 shadow-lg bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// Flatten function to extract text from React nodes
function flattenText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join('');
  if (node && typeof node === 'object' && 'props' in node && node.props) {
    return flattenText((node as any).props.children);
  }
  return '';
}

// Custom styles for rehype-highlight
const codeStyles = `
.hljs {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}
.hljs code {
  background: transparent !important;
}
/* Custom scrollbar for code blocks */
.code-block-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.code-block-wrapper::-webkit-scrollbar-track {
  background: transparent;
}
.code-block-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
.code-block-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
`;

// Code Block Component - refined styling
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);

  // Extract language from className
  const languageMatch = className?.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1].toUpperCase() : '';

  // Flatten all React nodes to get clean text
  const codeText = flattenText(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{codeStyles}</style>
      <div className="code-block-wrapper relative group my-6">
        {/* Copy button - top right */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 z-10 border border-white/5"
          title="复制代码"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-gray-400" />
          )}
        </button>

        {/* Single layer container - Nightwatch style */}
        <div className="nightwatch-code">
          {/* Language tag - top left, minimal */}
          {language && (
            <div className="px-4 py-1.5 text-[10px] text-gray-500 uppercase tracking-widest bg-white/5 border-b border-white/5 font-medium">
              {language}
            </div>
          )}

          {/* Code content */}
          <pre
            className={className}
            style={{
              background: 'transparent',
              padding: '1.25rem',
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: '1.6',
              overflow: 'auto',
              maxHeight: '400px'
            }}
          >
            <code
              className={className}
              style={{
                background: 'transparent',
                fontFamily: '"SF Mono", "Fira Code", "Monaco", monospace'
              }}
            >
              {codeText}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}

function TableOfContents({ headings, activeId }: { headings: Heading[]; activeId: string }) {
  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 w-48 z-40">
      <div className="bg-[#161b22]/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-h-[60vh] overflow-y-auto">
        <div className="text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-3">目录</div>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block text-sm transition-all duration-200 truncate ${heading.level === 3 ? "pl-3" : ""} ${
                activeId === heading.id
                  ? "text-[#245fff] font-medium translate-x-1"
                  : "text-[#6e7681] hover:text-white hover:translate-x-1"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    if (!content) return;
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extracted: Heading[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      extracted.push({ id, text, level });
    }
    setHeadings(extracted);
    setActiveHeading(extracted[0]?.id || "");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    const timer = setTimeout(() => {
      extracted.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      });
    }, 150);

    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [content]);

  // Custom components
  const components = {
    code(props: any) {
      const { className, children, node, ...rest } = props;
      const isInline = !className;

      if (isInline) {
        return (
          <code className="bg-black/40 px-1.5 py-0.5 rounded text-[#FACC15]" {...rest}>
            {flattenText(children)}
          </code>
        );
      }

      return <CodeBlock className={className}>{children}</CodeBlock>;
    },

    h2(props: any) {
      const { children, ...rest } = props;
      return <h2 id={slugify(String(children))} {...rest}>{children}</h2>;
    },
    h3(props: any) {
      const { children, ...rest } = props;
      return <h3 id={slugify(String(children))} {...rest}>{children}</h3>;
    },

    a(props: any) {
      const { href, children, ...rest } = props;
      if (href && isYouTubeUrl(href)) {
        const childText = String(children).toLowerCase().trim();
        if (childText === 'youtube') {
          return <YouTubeEmbed url={href} />;
        }
      }
      return <a href={href} {...rest} className="text-[#58a6ff] hover:underline">{children}</a>;
    },

    p(props: any) {
      const { node, children, ...rest } = props;
      return <div className="mb-4 leading-relaxed text-[#c9d1d9] my-5" {...rest}>{children}</div>;
    },
  };

  return (
    <>
      <div
        className="prose prose-invert prose-blue max-w-none
        prose-headings:text-white prose-headings:font-semibold
        prose-p:text-[#c9d1d9] prose-p:leading-relaxed
        prose-a:text-[#58a6ff] prose-a:no-underline hover:prose-a:underline
        prose-code:text-[#FACC15] prose-code:bg-black/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0 prose-pre:m-0
        prose-blockquote:border-l-[#245fff] prose-blockquote:bg-[#245fff]/5 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-[#a3a3a3]
        prose-li:text-[#c9d1d9] prose-li:marker:text-[#245fff]
        prose-img:rounded-xl prose-img:border prose-img:border-white/10
        prose-strong:text-white prose-hr:border-white/10"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
