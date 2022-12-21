import { OutputConfig } from '../helpers';
import type { AnnualFigure } from './annualFigures';
import type { Inputs } from './inputs';

export interface Outputs {
  claim: OutputConfig;
}

export const outputs = (form: HTMLFormElement, inputs: Inputs, figures: AnnualFigure) => {
  if (!inputs) return;

  const outputs: Outputs = {
    claim: new OutputConfig('claim', {
      form,
      value: () => {
        if (
          inputs.own.getValue() !== 'yes' ||
          inputs.work.getValue() !== 'yes' ||
          inputs.type.getValue() === ''
        )
          return 0;

        const totalMiles: number = inputs.miles.getValueAsNumber();
        const belowThreshold: number = totalMiles >= 10000 ? 10000 : totalMiles;
        const aboveThreshold: number = totalMiles >= 10000 ? totalMiles - 10000 : 0;

        const belowCost: number = figures.pre10[inputs.type.getValue()] * belowThreshold;
        const aboveCost: number = figures.post10[inputs.type.getValue()] * aboveThreshold;

        return belowCost + aboveCost;
      },
    }),
  };

  return outputs;
};
