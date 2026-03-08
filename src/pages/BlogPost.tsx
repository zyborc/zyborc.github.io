import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Link, Navigate, useParams } from 'react-router-dom';
import type { Components } from 'react-markdown';
import BlogComments from '../components/BlogComments';
import SEOHead from '../components/SEOHead';
import TagList from '../components/TagList';
import { getPostBySlug } from '../lib/blog';
import { toSiteAssetUrl } from '../lib/site';

const markdownComponents: Components = {
  img: ({ src = '', alt = '' }) => {
    const normalizedSrc = src.startsWith('/') ? toSiteAssetUrl(src) : src;
    return <img className="prose__image" src={normalizedSrc} alt={alt} loading="lazy" />;
  },
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
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="section">
      <SEOHead title={`${post.title} | Alexander Siedler`} description={post.summary} />
      <div className="shell prose-shell">
        <Link className="back-link" to="/blog">
          Back to blog
        </Link>
        <p className="eyebrow">{post.date}</p>
        <h1>{post.title}</h1>
        <p className="post-summary">{post.summary}</p>
        <TagList tags={post.tags} />
        {post.coverImage ? (
          <figure className="post-cover">
            <img src={toSiteAssetUrl(post.coverImage)} alt={post.title} />
          </figure>
        ) : null}
        <div className="prose">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
            {stripLeadingCoverImage(post.content, post.coverImage)}
          </ReactMarkdown>
        </div>
        <BlogComments slug={post.slug} />
      </div>
    </article>
  );
};

export default BlogPost;
