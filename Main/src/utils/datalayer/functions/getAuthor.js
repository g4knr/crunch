/**
 * returns the author of the current article
 */

export const getAuthor = () => {
  if (!window.crunchMeta) return undefined;
  return window.crunchMeta.author;
};
