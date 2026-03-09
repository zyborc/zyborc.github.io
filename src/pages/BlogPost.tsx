import { Children, isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import type { Components } from 'react-markdown';
import { Calendar, Clock, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import BlogComments from '../components/BlogComments';
import BlogTableOfContents from '../components/BlogTableOfContents';
import SEOHead from '../components/SEOHead';
import { extractHeadings, normalizeHeadingText } from '../lib/blogHeadings';
import { getPostBySlug } from '../lib/blog';
import { toSiteAssetUrl } from '../lib/site';

const extractNodeText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (!node) {
    return '';
  }

  return Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return extractNodeText(child.props.children);
      }

      return '';
    })
    .join('');
};

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const headerOffset = 96;
  const top = window.scrollY + element.getBoundingClientRect().top - headerOffset;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};

const createMarkdownComponents = (onSelectHeading: (id: string) => void): Components => {
  const createHeading =
    (Tag: 'h2' | 'h3' | 'h4') =>
      ({ children }: { children?: ReactNode }) => {
        const text = extractNodeText(children).trim();
        const id = normalizeHeadingText(text);

        return (
          <Tag id={id}>
            <button className="prose-heading-link" type="button" onClick={() => onSelectHeading(id)}>
              {children}
            </button>
          </Tag>
        );
      };

  return {
    img: ({ src = '', alt = '' }) => {
      const normalizedSrc = src.startsWith('/') ? toSiteAssetUrl(src) : src;
      return <img className="prose__image rounded-xl shadow-lg border border-gray-800 my-8 mx-auto" src={normalizedSrc} alt={alt} loading="lazy" />;
    },
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    h4: createHeading('h4'),
    table: ({ children }) => (
      <div className="prose-table-wrap my-8">
        <table className="prose-table">{children}</table>
      </div>
    ),
    pre: ({ children }) => (
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl relative z-10 my-8">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-950 border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-4 font-mono text-xs text-gray-500">~/code</div>
        </div>
        <div className="p-4 overflow-x-auto font-mono text-sm">
          <pre className="text-gray-300">
            {children}
          </pre>
        </div>
      </div>
    ),
    code: ({ className, children, ...props }) => {
      const isInline = !className;

      return (
        <code className={isInline ? 'px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded font-mono text-sm text-cyan-400' : className} {...props}>
          {children}
        </code>
      );
    },
  };
};

const stripLeadingCoverImage = (content: string, coverImage?: string) => {
  if (!coverImage) {
    return content;
  }

  const escapedCoverImage = coverImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const leadingImagePattern = new RegExp(`^!\\[[^\\]]*\\]\\(${escapedCoverImage}\\)\\s*`, 'm');

  return content.replace(leadingImagePattern, '').trim();
};

const BlogPost = () => {
  const { slug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const post = getPostBySlug(slug);
  const sectionParam = searchParams.get('section') ?? '';
  const scrollRequestRef = useRef<string | null>(null);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const content = stripLeadingCoverImage(post.content, post.coverImage);
  const headings = extractHeadings(content);
  const displayHeadings = useMemo(() => headings.filter((heading) => heading.level === 2), [headings]);
  const [activeSectionId, setActiveSectionId] = useState(displayHeadings[0]?.id ?? '');

  useEffect(() => {
    setActiveSectionId(displayHeadings[0]?.id ?? '');
  }, [displayHeadings]);

  useEffect(() => {
    if (displayHeadings.length === 0 || typeof window === 'undefined') {
      return;
    }

    const headingElements = displayHeadings
      .map((heading) => ({
        id: heading.id,
        element: document.getElementById(heading.id),
      }))
      .filter((entry): entry is { id: string; element: HTMLElement } => Boolean(entry.element));

    if (headingElements.length === 0) {
      return;
    }

    const updateFromScroll = () => {
      let currentId = headingElements[0]?.id ?? '';

      for (const heading of headingElements) {
        if (heading.element.getBoundingClientRect().top <= 140) {
          currentId = heading.id;
        } else {
          break;
        }
      }

      setActiveSectionId(currentId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveSectionId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-110px 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    );

    for (const heading of headingElements) {
      observer.observe(heading.element);
    }

    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, [displayHeadings]);

  useEffect(() => {
    if (!sectionParam || displayHeadings.length === 0) {
      return;
    }

    if (!displayHeadings.some((heading) => heading.id === sectionParam)) {
      return;
    }

    if (scrollRequestRef.current === sectionParam) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollToHeading(sectionParam);
      setActiveSectionId(sectionParam);
      scrollRequestRef.current = sectionParam;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [sectionParam, displayHeadings]);

  const selectSection = (id: string) => {
    scrollRequestRef.current = id;
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('section', id);
      return nextParams;
    });
    scrollToHeading(id);
    setActiveSectionId(id);
  };

  const markdownComponents = useMemo(() => createMarkdownComponents(selectSection), [setSearchParams]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <SEOHead title={`${post.title} | Alexander Siedler`} description={post.summary} />
      
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 mb-8 mt-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm font-mono transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to blog</span>
        </Link>
      </div>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 mb-16 animate-slide-up">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 font-mono border-b border-gray-900 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(post.date))}</span>
          </div>
          <span className="text-gray-800">|</span>
          {post.readingTimeMinutes && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.summary && (
          <p className="text-xl md:text-2xl font-sans text-gray-400 mb-8 max-w-3xl leading-relaxed">{post.summary}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <figure className="mb-8 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/5 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent pointer-events-none" />
             <img className="w-full h-auto object-cover max-h-[500px]" src={toSiteAssetUrl(post.coverImage)} alt={post.title} />
          </figure>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-8 border-t border-gray-900">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm">
            <Bookmark className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Sticky Left */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <div className="font-mono text-xs text-cyan-400 mb-4">// contents</div>
              <BlogTableOfContents headings={headings} activeId={activeSectionId} onSelect={selectSection} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className={`prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:font-sans
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed 
              prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline
              prose-li:text-gray-300 
              prose-strong:text-white
              [&_blockquote]:border-l-cyan-500 [&_blockquote]:bg-gray-900/30 [&_blockquote]:px-6 [&_blockquote]:py-1 [&_blockquote]:rounded-r-lg
            `}>
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {content}
              </ReactMarkdown>
            </div>
            
            <div className="mt-20 pt-12 border-t border-gray-900">
              <BlogComments slug={post.slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

