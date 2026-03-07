import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Link, Navigate, useParams } from 'react-router-dom';
import type { Components } from 'react-markdown';
import SEOHead from '../components/SEOHead';
import TagList from '../components/TagList';
import { getPostBySlug } from '../lib/blog';
import { toSiteAssetUrl } from '../lib/site';

const markdownComponents: Components = {
  img: ({ src = '', alt = '' }) => {
    const normalizedSrc = src.startsWith('/') ? toSiteAssetUrl(src) : src;
    return <img src={normalizedSrc} alt={alt} loading="lazy" />;
  },
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
        <div className="prose">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
