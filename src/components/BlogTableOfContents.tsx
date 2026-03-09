import type { BlogHeading } from '../lib/blogHeadings';

type BlogTableOfContentsProps = {
  headings: BlogHeading[];
  activeId: string;
  onSelect: (id: string) => void;
};

const BlogTableOfContents = ({ headings, activeId, onSelect }: BlogTableOfContentsProps) => {
  const displayHeadings = headings.filter((heading) => heading.level === 2);

  if (displayHeadings.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-2">
        {displayHeadings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <button
                type="button"
                className={`block w-full text-left text-sm py-1 border-l-2 pl-4 transition-all ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                }`}
                onClick={() => onSelect(heading.id)}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="leading-snug">{heading.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BlogTableOfContents;
