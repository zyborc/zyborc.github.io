export type BlogHeading = {
  id: string;
  level: 2 | 3 | 4;
  text: string;
};

type Slugger = {
  next: (value: string) => string;
};

export const normalizeHeadingText = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section';

export const createHeadingSlugger = (): Slugger => {
  const counts = new Map<string, number>();

  return {
    next: (value: string) => {
      const base = normalizeHeadingText(value);
      const currentCount = counts.get(base) ?? 0;
      counts.set(base, currentCount + 1);

      if (currentCount === 0) {
        return base;
      }

      return `${base}-${currentCount + 1}`;
    },
  };
};

export const extractHeadings = (content: string): BlogHeading[] => {
  const headings: BlogHeading[] = [];
  const lines = content.split(/\r?\n/);
  let isInsideCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      isInsideCodeBlock = !isInsideCodeBlock;
      continue;
    }

    if (isInsideCodeBlock) {
      continue;
    }

    const match = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
    if (!match) {
      continue;
    }

    const [, hashes, rawText] = match;
    const level = hashes.length as 2 | 3 | 4;
    const text = rawText.trim();

    headings.push({
      id: normalizeHeadingText(text),
      level,
      text,
    });
  }

  return headings;
};
