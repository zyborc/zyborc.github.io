import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/content';
import TagList from './TagList';

interface BlogCardProps {
  post: BlogPost;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="card">
      <p className="card__meta">
        <span>{formatDate(post.date)}</span>
        <span>{post.readingTimeMinutes} min read</span>
      </p>
      <h3 className="card__title">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.summary}</p>
      <TagList tags={post.tags} />
    </article>
  );
};

export default BlogCard;
