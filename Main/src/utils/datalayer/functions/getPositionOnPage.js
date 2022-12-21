/**
 * returns the position of the element on the page
 * e.g. body, fab, nav, header, footer, etc
 * @param {element} element
 */

export const getPositionOnPage = (element) => {
  let position = 'body';
  if (element.closest('.fab__wrapper')) {
    position = 'fab';
  } else if (element.closest('.nav__wrapper')) {
    position = 'nav';
  } else if (element.closest('header')) {
    position = 'header';
  } else if (element.closest('footer')) {
    position = 'footer';
  } else if (
    document.querySelector('main') &&
    document.querySelector('main').firstElementChild.contains(element)
  ) {
    position = 'header';
  }

  return position;
};
