import { useEffect, useRef } from 'react';
import type { BlogHeading } from '../lib/blogHeadings';

type BlogTableOfContentsProps = {
  headings: BlogHeading[];
  activeId: string;
  onSelect: (id: string) => void;
};

const BlogTableOfContents = ({ headings, activeId, onSelect }: BlogTableOfContentsProps) => {
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const displayHeadings = headings.filter((heading) => heading.level === 2);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  if (displayHeadings.length < 2) {
    return null;
  }

  return (
    <aside className="article-sidebar" aria-labelledby="article-sidebar-heading">
      <div className="article-sidebar__card">
        <p id="article-sidebar-heading" className="article-sidebar__eyebrow">
          On this page
        </p>
        <nav aria-label="Table of contents">
          <ol className="article-toc">
            {displayHeadings.map((heading, index) => (
              <li
                key={heading.id}
                ref={activeId === heading.id ? activeItemRef : null}
                className={`article-toc__item ${activeId === heading.id ? 'article-toc__item--active' : ''
                  }`}
              >
                <button
                  type="button"
                  className="article-toc__button"
                  onClick={() => onSelect(heading.id)}
                  aria-current={activeId === heading.id ? 'location' : undefined}
                >
                  <span className="article-toc__index">{String(index + 1).padStart(2, '0')}</span>
                  {heading.text}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
};

export default BlogTableOfContents;
