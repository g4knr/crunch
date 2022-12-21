/**
 * returns the index of the current step starting at 1
 * step class = `callback-form__step`
 * @param {element} currentStep
 */

export const getFormStepNumber = (currentStep) => {
  let form = currentStep.closest('form');
  let formSteps = form.querySelectorAll('.callback-form__step');
  let index = Array.from(formSteps).indexOf(currentStep) + 1;
  return index;
};
