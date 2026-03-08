export const giscusConfig = {
  repo: 'zyborc/zyborc.github.io',
  repoId: 'R_kgDORg__Nw',
  category: 'General',
  categoryId: 'DIC_kwDORg__N84C37mv',
  appUrl: 'https://giscus.app',
  theme: {
    light: '/giscus/light.css',
    dark: '/giscus/dark.css',
  },
} as const;

export const hasCompleteGiscusConfig = Boolean(
  giscusConfig.repo &&
    giscusConfig.repoId &&
    giscusConfig.category &&
    giscusConfig.categoryId,
);
