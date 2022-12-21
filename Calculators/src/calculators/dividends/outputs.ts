import { OutputConfig } from '../helpers';
import type { AnnualFigure } from './annualFigures';
import type { Inputs } from './inputs';

export interface Outputs {
  dividendProfits: OutputConfig;
  taxToPay: OutputConfig;
  allowance: OutputConfig;
  profitAfterTax: OutputConfig;
}

export const outputs = (form: HTMLFormElement, inputs: Inputs, figures: AnnualFigure) => {
  if (!inputs) return;
  const outputs: Outputs = {
    dividendProfits: new OutputConfig('dividend-profits', {
      form,
      value: () => inputs.dividendIncome.getValueAsNumber(),
    }),
    taxToPay: new OutputConfig('tax-to-pay', {
      form,
      value: () => {
        // destructure figures for ease of access
        const { rates, allowances, bands } = figures;

        // get input values
        const dividendIncome = inputs.dividendIncome.getValueAsNumber();
        const otherIncome = inputs.otherIncome.getValueAsNumber();
        const totalIncome = dividendIncome + otherIncome;

        // calculate the unutilized personal allowance
        const unutilizedPersonalAllowance =
          otherIncome <= allowances.personal ? allowances.personal - otherIncome : 0;

        // get the taxable amount of dividends and return 0 if there aren't any
        const taxableDividends =
          dividendIncome - unutilizedPersonalAllowance - allowances.dividends;
        if (taxableDividends <= 0) return 0;

        // basic rate threshold left
        const basicThreshold = allowances.personal + bands.basic;
        const basicThresholdRemaining =
          otherIncome < basicThreshold ? basicThreshold - otherIncome - allowances.dividends : 0;

        // basic rate tax
        const basicRateTax =
          basicThresholdRemaining === 0
            ? 0
            : taxableDividends >= basicThresholdRemaining
            ? basicThresholdRemaining * rates.ordinary
            : taxableDividends * rates.ordinary;

        // higher rate threshold left
        const higherThresholdRemaining =
          totalIncome > bands.higher
            ? bands.higher - otherIncome - allowances.dividends
            : totalIncome - bands.basic - allowances.personal <= 0
            ? 0
            : totalIncome - bands.basic - allowances.personal;

        // higher rate tax
        const higherRateTax =
          higherThresholdRemaining === 0
            ? 0
            : taxableDividends > higherThresholdRemaining
            ? higherThresholdRemaining * rates.upper
            : (taxableDividends - basicThresholdRemaining) * rates.upper;

        // additional rate tax
        const additionalRateTax =
          taxableDividends - basicThresholdRemaining - higherThresholdRemaining <= 0
            ? 0
            : (taxableDividends - basicThresholdRemaining - higherThresholdRemaining) *
              rates.additional;

        // total tax
        const totalTax = basicRateTax + higherRateTax + additionalRateTax;

        return totalTax;
      },
    }),
    allowance: new OutputConfig('allowance', {
      form,
      value: () => `£2,000 tax-free dividend allowance`,
    }),
  };

  outputs.profitAfterTax = new OutputConfig('profit-after-tax', {
    form,
    value: () => inputs.dividendIncome.getValue() - outputs.taxToPay.value(),
  });

  return outputs;
};
