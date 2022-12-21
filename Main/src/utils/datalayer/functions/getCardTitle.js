/**
 * returns the title of the article associated with the link
 * @param {element} articleLink
 */

export const getCardTitle = (card) => {
  let title = card.querySelector('.card__h');
  return title.textContent;
};
