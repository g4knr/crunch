import { OutputConfig } from '../helpers';
import type { AnnualFigure } from './annualFigures';
import type { Inputs } from './inputs';

export interface Outputs {
  studentLoanTotal: OutputConfig;
  postGraduateTotal: OutputConfig;
  loanTotal: OutputConfig;
}

export const outputs = (form: HTMLFormElement, inputs: Inputs, figures: AnnualFigure) => {
  if (!inputs) return;
  const outputs: Outputs = {
    studentLoanTotal: new OutputConfig('student-loan-total', {
      form,
      value: () => {
        // destructure figures for ease of access
        const { studentLoans } = figures;

        // get input values
        const allIncome = inputs.allIncome.getValueAsNumber();
        const plan = inputs.studentLoanPlan.getValue();

        // if there is no plan, return 0
        if (!plan) return 0;

        // get the relevant threshold
        const planConfig = studentLoans[plan];
        const { threshold, rate } = planConfig;

        // return the calculated value
        return allIncome >= threshold ? (allIncome - threshold) * rate : 0;
      },
      visibleIf: () => !!inputs.isStudent.getValue() && inputs.studentLoanPlan.getValue() !== '',
    }),
    postGraduateTotal: new OutputConfig('post-graduate-total', {
      form,
      value: () => {
        // destructure figures for ease of access
        const { postgraduateLoans } = figures;

        // get input values
        const allIncome = inputs.allIncome.getValueAsNumber();
        const country = inputs.postGraduateLoanCountry.getValue();

        // if there is no country, return 0
        if (!country) return 0;

        // get the relevant threshold
        const countryConfig = postgraduateLoans[country];
        const { threshold, rate } = countryConfig;

        // return the calculated value
        return allIncome >= threshold ? (allIncome - threshold) * rate : 0;
      },
      visibleIf: () =>
        !!inputs.isPostGraduate.getValue() && inputs.postGraduateLoanCountry.getValue() !== '',
    }),
  };

  outputs.loanTotal = new OutputConfig('loan-total', {
    form,
    value: () => outputs.studentLoanTotal.value() + outputs.postGraduateTotal.value(),
  });

  return outputs;
};
