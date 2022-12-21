/**
 * returns the accordion title
 * @param {element} accordion
 */

export const getAccordionTitle = (accordion) => {
  return accordion.firstElementChild.textContent;
};
