/**
 * returns the type of form
 * e.g. Callback, Crunch Free, SignUp
 * @param {element} form
 */

export const getFormType = (form) => {
  let formType;
  if (form.closest('.modal__wrapper')) {
    formType = 'Popup';
  } else {
    formType = 'In Page';
  }
  return formType;
};
