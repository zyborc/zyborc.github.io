export const siteBaseUrl = import.meta.env.BASE_URL;

export const toSiteAssetUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${siteBaseUrl}${normalizedPath}`;
};
