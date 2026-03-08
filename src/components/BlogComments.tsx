import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';
import { giscusConfig, hasCompleteGiscusConfig } from '../data/comments';
import { toSiteAssetUrl } from '../lib/site';

type BlogCommentsProps = {
  slug: string;
};

const getGiscusTheme = () => {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

const getGiscusThemeUrl = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') {
    return giscusConfig.theme.dark;
  }

  return new URL(toSiteAssetUrl(giscusConfig.theme[theme]), window.location.origin).toString();
};

const BlogComments = ({ slug }: BlogCommentsProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getGiscusTheme);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(getGiscusTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!hasCompleteGiscusConfig) {
    return (
      <section className="comments-section" aria-labelledby="comments-heading">
        <div className="comments-card comments-card--setup">
          <h2 id="comments-heading">Comments</h2>
          <p>
            Giscus is wired up, but the GitHub discussion category ID is still missing in
            <code className="prose-inline-code"> src/data/comments.ts</code>.
          </p>
          <p>
            Open{' '}
            <a href={giscusConfig.appUrl} target="_blank" rel="noreferrer">
              giscus.app
            </a>{' '}
            once, choose the <strong>{giscusConfig.category}</strong> category, and paste the generated
            <code className="prose-inline-code"> categoryId</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="comments-section" aria-labelledby="comments-heading">
      <div className="comments-card">
        <h2 id="comments-heading">Comments</h2>
        <Giscus
          key={`${slug}-${theme}`}
          id="comments"
          repo={giscusConfig.repo}
          repoId={giscusConfig.repoId}
          category={giscusConfig.category}
          categoryId={giscusConfig.categoryId}
          mapping="specific"
          term={`blog:${slug}`}
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={getGiscusThemeUrl(theme)}
          lang="de"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default BlogComments;
