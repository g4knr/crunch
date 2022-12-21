import { OutputConfig } from '../helpers';
import type { AnnualFigure } from './annualFigures';
import type { Inputs } from './inputs';

export interface Outputs {
  example: OutputConfig;
}

export const outputs = (form: HTMLFormElement, inputs: Inputs, figures: AnnualFigure) => {
  if (!inputs) return;
  const outputs: Outputs = {
    example: new OutputConfig('example', {
      form,
      value: () => 0,
    }),
  };

  return outputs;
};
