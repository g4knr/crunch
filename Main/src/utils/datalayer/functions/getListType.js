import { getPageURL } from './getPageURL';

/**
 * returns the type of list the card sits within
 * e.g. Category Page, You may also like, Suggested, etc
 */

export const getListType = () => {
  let url = getPageURL();
  let type;
  if (url.includes('/knowledge-')) {
    if (url.includes('/knowledge-category/')) {
      type = 'Category Page';
    } else {
      type = 'You May Also Like';
    }
  } else if (url.includes('/knowledge' && !url.includes('/knowledge/'))) {
    type = 'Category Page';
  } else {
    type = 'Top Reads';
  }

  return type;
};
