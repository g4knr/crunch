import {
  getPageURL,
  getClickURL,
  getClickText,
  getPositionOnPage,
  getCTATactic,
} from './functions';
import { pushToDataLayer } from './pushToDataLayer';

export const ctaClicks = (link) => {
  const event = {
    event: 'cta_click',
    pageURL: getPageURL(),
    clickURL: getClickURL(link),
    clickText: getClickText(link),
    positionOnPage: getPositionOnPage(link),
    ctaTactic: getCTATactic(link),
  };

  pushToDataLayer(event);
};
