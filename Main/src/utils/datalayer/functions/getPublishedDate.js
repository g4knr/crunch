/**
 * retuns the published date of the current article
 */

export const getPublishedDate = () => {
  if (!window.crunchMeta) return undefined;
  return window.crunchMeta.publishedDate;
};
