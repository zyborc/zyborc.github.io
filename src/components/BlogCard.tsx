import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/content';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const tagArray = post.tags ? post.tags : [];
  const defaultColor = index % 2 === 0 ? "from-emerald-400 to-teal-500" : "from-blue-400 to-cyan-500";
  const hoverTextColor = index % 2 === 0 ? "group-hover:text-emerald-400" : "group-hover:text-cyan-400";
  const textColor = index % 2 === 0 ? "text-emerald-400" : "text-cyan-400";
  
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      <article className="relative border border-gray-900 hover:border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
        {/* Gradient line accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${defaultColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl`} />
        
        {/* Date and read time */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          {post.readingTimeMinutes && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold text-white mb-2 ${hoverTextColor} transition-colors`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.summary && (
          <p className="text-gray-500 mb-6 leading-relaxed">
            {post.summary}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tagArray.map((tag: string, tagIdx: number) => (
            <span
              key={tagIdx}
              className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more indicator */}
        <div className={`flex items-center gap-2 ${textColor} font-mono text-sm group-hover:gap-3 transition-all`}>
          <span>Read article</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
