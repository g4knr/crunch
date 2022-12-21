import {
  getPageType,
  getFunnelStage,
  getProductName,
  getAuthor,
  getPublishedDate,
} from './functions';
import { pushToDataLayer } from './pushToDataLayer';

export const pageLoad = () => {
  const event = {
    event: 'page_load',
    pageType: getPageType(),
    funnelStage: getFunnelStage(),
    productName: getProductName(),
    author: getAuthor(),
    publishedDate: getPublishedDate(),
  };

  pushToDataLayer(event);
};
