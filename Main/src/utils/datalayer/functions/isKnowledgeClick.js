/**
 * returns whether the link is going to a knowledge article
 * @param {element} link
 */

export const isKnowledgeClick = (link) => {
  let linkPath = link.pathname;
  let knowledgePath = '/knowledge-';
  let isKnowledge;

  if (link.href.substr(link.href.length - 1) === '#') {
    isKnowledge = false;
  } else if (linkPath.includes(knowledgePath) && !linkPath.includes(`${knowledgePath}category/`)) {
    isKnowledge = true;
  }
  return isKnowledge;
};
