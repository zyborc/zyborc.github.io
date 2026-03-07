import type { BlogPost } from '../types/content';

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const countReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const normalizeDate = (value: unknown) => {
  if (typeof value !== 'string') {
    return new Date().toISOString().slice(0, 10);
  }

  return value;
};

const parseScalar = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue === 'true') {
    return true;
  }

  if (trimmedValue === 'false') {
    return false;
  }

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
};

const parseArray = (value: string) => {
  const arrayBody = value.trim().replace(/^\[/, '').replace(/\]$/, '');
  if (!arrayBody) {
    return [];
  }

  return arrayBody
    .split(',')
    .map((entry) => parseScalar(entry))
    .filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
};

const parseFrontmatter = (source: string) => {
  if (!source.startsWith('---')) {
    return {
      data: {},
      content: source.trim(),
    };
  }

  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return {
      data: {},
      content: source.trim(),
    };
  }

  const [, frontmatterBlock, content] = match;
  const data: Record<string, unknown> = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    data[key] = rawValue.startsWith('[') ? parseArray(rawValue) : parseScalar(rawValue);
  }

  return {
    data,
    content: content.trim(),
  };
};

export const getAllPosts = (): BlogPost[] => {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'post';
      const source = typeof raw === 'string' ? raw : '';
      const parsed = parseFrontmatter(source);
      const data = parsed.data as Partial<BlogPost>;

      return {
        slug,
        title: data.title ?? slug,
        date: normalizeDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags : [],
        summary: data.summary ?? '',
        coverImage: data.coverImage,
        draft: data.draft ?? false,
        content: parsed.content.trim(),
        readingTimeMinutes: countReadingTime(parsed.content),
      };
    })
    .filter((post) => !post.draft)
    .sort((left, right) => right.date.localeCompare(left.date));
};

export const getPostBySlug = (slug: string) => getAllPosts().find((post) => post.slug === slug);
