/**
 * returns the index of the link's parent card, starting at 1
 * @param {element} articleLink
 */

export const getCardPosition = (card) => {
  let item = card.parentElement;
  let list = item.parentElement;
  return Array.from(list.children).indexOf(item) + 1;
};
