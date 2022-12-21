/**
 * returns the category of the article associated with the link
 * @param {element} articleLink
 */

export const getCardCategory = (card) => {
  let tag = card.querySelector('.tag');
  return tag.textContent;
};
