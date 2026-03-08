import { Children, isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import type { Components } from 'react-markdown';
import BlogComments from '../components/BlogComments';
import BlogTableOfContents from '../components/BlogTableOfContents';
import SEOHead from '../components/SEOHead';
import TagList from '../components/TagList';
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
      return <img className="prose__image" src={normalizedSrc} alt={alt} loading="lazy" />;
    },
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    h4: createHeading('h4'),
    table: ({ children }) => (
      <div className="prose-table-wrap">
        <table className="prose-table">{children}</table>
      </div>
    ),
    pre: ({ children }) => <pre className="prose-code-block">{children}</pre>,
    code: ({ className, children, ...props }) => {
      const isInline = !className;

      return (
        <code className={isInline ? 'prose-inline-code' : className} {...props}>
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
    <article className="section">
      <SEOHead title={`${post.title} | Alexander Siedler`} description={post.summary} />
      <div className="shell article-shell">
        <div className="article-layout">
          <div className="prose-shell article-main">
            <Link className="back-link" to="/blog">
              Back to blog
            </Link>
            <p className="eyebrow">{post.date}</p>
            <h1>{post.title}</h1>
            <p className="post-summary">{post.summary}</p>
            <div className="article-meta">
              <span>{post.readingTimeMinutes} min read</span>
              <span aria-hidden="true">•</span>
              <span>{headings.length} sections</span>
            </div>
            <TagList tags={post.tags} />
            {post.coverImage ? (
              <figure className="post-cover">
                <img src={toSiteAssetUrl(post.coverImage)} alt={post.title} />
              </figure>
            ) : null}
            <div className="prose">
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {content}
              </ReactMarkdown>
            </div>
            <BlogComments slug={post.slug} />
          </div>
          <BlogTableOfContents headings={headings} activeId={activeSectionId} onSelect={selectSection} />
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
