/**
 * returns the parent card of the given link
 * @param {element} articleLink
 */

export const getArticleCardFromLink = (articleLink) => {
  return articleLink.closest('.card');
};
