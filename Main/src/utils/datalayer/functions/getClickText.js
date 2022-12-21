/**
 * returns the text of the link
 * the element must be the bottom-most element in the tree
 * @param {element} link
 */

export const getClickText = (link) => {
  return link.textContent;
};
