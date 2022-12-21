/**
 * returns the product the form relates to
 * e.g. Crunch Free, Bookkeeping
 * @param {element} form
 */

export const getProductName = (form) => {
  if (!form) return document.querySelector('form[data-product]');
  return form.dataset.product;
};
