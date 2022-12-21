import {
  getFormType,
  getFormName,
  getPageURL,
  getProductName,
  getTotalFormSteps,
} from './functions';
import { pushToDataLayer } from './pushToDataLayer';

export const formSubmit = (form) => {
  const event = {
    event: 'form_submit',
    formType: getFormType(form),
    formName: getFormName(form),
    pageURL: getPageURL(),
    productName: getProductName(form),
    formStepNumber: getTotalFormSteps(form),
  };

  pushToDataLayer(event);
};
