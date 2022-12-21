import { numberToCurrency, OutputConfig } from '../helpers';
import type { AnnualFigure } from './annualFigures';
import type { Inputs } from './inputs';

export interface Outputs {
  profit: OutputConfig;
  allowance: OutputConfig;
  taxToPay: OutputConfig;
  profitAfterTax: OutputConfig;
}

export const outputs = (form: HTMLFormElement, inputs: Inputs, figures: AnnualFigure) => {
  if (!inputs) return;

  const outputs: Outputs = {
    profit: new OutputConfig('profit', {
      form,
      value: () => {
        const capitalGains = inputs.capitalGains.getValueAsNumber();
        return capitalGains ? capitalGains : 0;
      },
      labels: () => {
        let dynamic = '';
        switch (inputs.how.getValue()) {
          case 'shares':
            dynamic = 'shares';
            break;
          case 'property':
            dynamic = 'property';
            break;
          case 'crypto':
            dynamic = 'cryptocurrencies';
            break;
          case 'other':
            dynamic = 'other assets';
            break;
        }

        return `Your profit from ${dynamic}`;
      },
    }),
    allowance: new OutputConfig('allowance', {
      form,
      value: () => `${numberToCurrency(figures.exemption, false)} tax-free CGT allowance`,
    }),
    taxToPay: new OutputConfig('tax-to-pay', {
      form,
      value: () => {
        // get the values of the inputs
        const capitalGains = inputs.capitalGains.getValueAsNumber();
        const otherIncome = inputs.otherIncome.getValueAsNumber();

        // destructure the figures object for easy access
        const { exemption, basicBand, personalAllowance, basicRate, higherRate, badr } = figures;

        // amount of basic rate used by other income
        const basicRateUsed = otherIncome <= basicBand ? otherIncome : basicBand;

        // amount of basic rate left to be used by CG
        let remaingingBasicRate = personalAllowance + basicBand - basicRateUsed;
        remaingingBasicRate = remaingingBasicRate >= basicBand ? basicBand : remaingingBasicRate;

        // capital gains chargeable to tax
        const chargeableCapitalGains = capitalGains - exemption;

        const basicRateCapitalGains =
          chargeableCapitalGains >= remaingingBasicRate
            ? remaingingBasicRate
            : chargeableCapitalGains;

        const higherRateCapitalGains = chargeableCapitalGains - basicRateCapitalGains;

        let captialGainsTax = 0;
        switch (inputs.how.getValue()) {
          case 'property':
            captialGainsTax =
              basicRateCapitalGains * basicRate.residential +
              higherRateCapitalGains * higherRate.residential;
            break;
          case 'shares':
            captialGainsTax = basicRateCapitalGains * badr + higherRateCapitalGains * badr;
            break;
          default:
            captialGainsTax =
              basicRateCapitalGains * basicRate.other + higherRateCapitalGains * higherRate.other;
        }

        return captialGainsTax;
      },
    }),
  };

  outputs.profitAfterTax = new OutputConfig('profit-after-tax', {
    form,
    value: () => {
      const capitalGains = inputs.capitalGains.getValueAsNumber();
      const otherIncome = inputs.otherIncome.getValueAsNumber();
      const totalIncome = capitalGains + otherIncome;

      return totalIncome - outputs.taxToPay.getValue();
    },
  });

  return outputs;
};
