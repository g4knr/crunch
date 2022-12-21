import {
  getPageURL,
  getCardCategory,
  getCardTitle,
  getCardLinkClicked,
  getCardPosition,
  getClickURL,
  getListType,
  isKnowledgeClick,
  getArticleCardFromLink,
} from './functions';
import { pushToDataLayer } from './pushToDataLayer';

export const knowledgeLinkClick = (link) => {
  // change to knowledge link clicked
  if (!isKnowledgeClick(link)) return;
  let knowledgeCard = getArticleCardFromLink(link);
  const event = {
    event: 'knowledge_card_click',
    pageURL: getPageURL(),
    cardCategory: getCardCategory(knowledgeCard),
    cardTitle: getCardTitle(knowledgeCard),
    cardLinkClicked: getCardLinkClicked(link),
    cardPosition: getCardPosition(knowledgeCard),
    clickURL: getClickURL(link),
    listType: getListType(),
  };

  pushToDataLayer(event);
};
