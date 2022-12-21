import {
  getFormType,
  getFormName,
  getPageURL,
  getProductName,
  getFormStepNumber,
  getFormStepContents,
} from './functions';
import { pushToDataLayer } from './pushToDataLayer';

export const formStepLoad = (form, currentStep) => {
  const event = {
    event: 'form_step_load',
    formType: getFormType(form),
    formName: getFormName(form),
    pageURL: getPageURL(),
    productName: getProductName(form),
    formStepNumber: getFormStepNumber(currentStep),
    formStep: getFormStepContents(currentStep),
  };

  pushToDataLayer(event);
};
