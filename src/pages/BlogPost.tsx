import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import TagList from '../components/TagList';
import { getPostBySlug } from '../lib/blog';

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
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
