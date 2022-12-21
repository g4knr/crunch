/**
 * returns a description of the current step
 * e.g. Basic Info, Comany Details, Callback Details, etc
 * step class = `callback-form__step`
 * @param {element} currentStep
 */

export const getFormStepContents = (currentStep) => {
  return currentStep.dataset.stepContent;
};
