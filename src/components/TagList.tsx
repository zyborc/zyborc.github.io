interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="tag-list" aria-label="Tags">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
