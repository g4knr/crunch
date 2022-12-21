/**
 * returns whether the link is a child of a card
 * @param {element} link
 */

export const isCardClick = (link) => {
  let card = link.closest('.card');
  let isCard = card ? true : false;
  return isCard;
};
