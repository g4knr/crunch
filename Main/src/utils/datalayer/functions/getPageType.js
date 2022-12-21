import { getPageURL } from './getPageURL';

/**
 * returns the type of page
 * @param {element} body
 */

export const getPageType = () => {
  let url = getPageURL();
  if (url.includes('/knowledge')) return 'Knowledge';
  if (url.includes('/member-stories')) return 'Member Stories';
  if (document.querySelector('form[data-product]')) return 'Product';
  return 'Other';
};
