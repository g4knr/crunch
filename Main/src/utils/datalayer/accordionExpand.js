import { getPageURL, getProductName, getAccordionTitle } from './functions';
import { pushToDataLayer } from './pushToDataLayer';

/**
 * Function to trigger the relevant dataLayer event on accordion expand
 * @param {Accordion Header} link - link element that is the accordion header
 */

export const accordionExpand = (link) => {
  if (!link.classList.contains('accordion__header')) return;
  const event = {
    event: 'accordion_expand',
    pageURL: getPageURL(),
    productName: getProductName(),
    accordionTitle: getAccordionTitle(link),
  };

  pushToDataLayer(event);
};
