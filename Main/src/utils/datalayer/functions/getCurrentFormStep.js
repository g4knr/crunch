/**
 * Function to return the current form step
 * @param {Form} form
 */

export const getCurrentFormStep = (form) => {
  const formSteps = [...form.querySelectorAll('.callback-form__step')];
  return formSteps.find((step) => {
    return step.style.display !== 'none';
  });
};
