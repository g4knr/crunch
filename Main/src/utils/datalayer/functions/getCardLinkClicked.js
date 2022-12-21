/**
 * returns a description of the link clicked
 * @param {element} articleLink
 */

export const getCardLinkClicked = (articleLink) => {
  let linkClass = articleLink.classList;
  let linkClicked = linkClass.contains('card__img-wrapper')
    ? 'Image'
    : linkClass.contains('card__h')
    ? 'Title'
    : linkClass.contains('card__arrow')
    ? 'Arrow'
    : 'Undefined';

  return linkClicked;
};
