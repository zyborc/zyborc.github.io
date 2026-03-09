interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <span key={tag} className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
