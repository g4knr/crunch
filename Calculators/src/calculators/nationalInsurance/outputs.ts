import { OutputConfig } from '../helpers';
import type { AnnualFigure } from './annualFigures';
import type { Inputs } from './inputs';

export interface Outputs {
  totalEarnings: OutputConfig;
  allowance: OutputConfig;
  niClass1: OutputConfig;
  niClass2: OutputConfig;
  niClass4: OutputConfig;
  niTotal: OutputConfig;
  incomeTax: OutputConfig;
  remains: OutputConfig;
}

export const outputs = (form: HTMLFormElement, inputs: Inputs, figures: AnnualFigure) => {
  if (!inputs) return;
  const { UPL, PT, SPT, LPL, eNIC } = figures.figures;
  const { ni } = figures;

  const outputs: Outputs = {
    totalEarnings: new OutputConfig('total-earnings', {
      form,
      value: () => {
        let total = 0;
        // if employed
        if (inputs.isEmployed.getValue()) total += inputs.annualSalary.getValueAsNumber();

        // if self-employed
        if (inputs.isSelfEmployed.getValue()) {
          // deductible is expenses up to a maximum of 1000
          const deductible =
            inputs.selfEmployedExpenses.getValueAsNumber() > 1000
              ? 1000
              : inputs.selfEmployedExpenses.getValue();
          // total is income negative deductible, minimum of 0
          total += inputs.selfEmployedIncome.getValueAsNumber() - deductible;
        }
        return total < 0 ? 0 : total;
      },
    }),
    allowance: new OutputConfig('allowance', {
      form,
      value: () => '£1,000 tax-free Trading Allowance',
      visibleIf: () => !!inputs.isSelfEmployed.getValue(),
    }),
  };

  outputs.niClass1 = new OutputConfig('ni-class1', {
    form,
    value: () => {
      if (!inputs.isEmployed.getValue()) return 0;
      const totalEarnings = outputs.totalEarnings.getValue();

      // get relevant config
      const { employee, employer } = ni.class1;
      if (totalEarnings < PT) return 0;
      if (totalEarnings > UPL)
        return (UPL - PT) * employee.PTtoUEL + (totalEarnings - UPL) * employee.aboveUEL;
      return (totalEarnings - PT) * employee.PTtoUEL;
    },
    visibleIf: () => !!inputs.isEmployed.getValue(),
  });

  outputs.niClass2 = new OutputConfig('ni-class2', {
    form,
    value: () => {
      if (!inputs.isSelfEmployed.getValue()) return 0;
      const totalEarnings = outputs.totalEarnings.getValue();

      // get relevant config
      const { belowSPT, SPTtoLPL, LPLtoUPL, aboveUPL } = ni.class2;
      if (totalEarnings > SPT) return SPTtoLPL * 52;
      return 0;
    },
    visibleIf: () => !!inputs.isSelfEmployed.getValue(),
  });

  outputs.niClass4 = new OutputConfig('ni-class4', {
    form,
    value: () => {
      if (!inputs.isSelfEmployed.getValue()) return 0;
      const totalEarnings = outputs.totalEarnings.getValue();

      /**
       * 1. if totalEarnings < LPL = 0
       * 2. if totalEarnings > UPL:
       *  a. TRUE: (UPL - LPL) * LPLtoUPL + (totalEarnings - UPL) * AboveUPL
       *  b. FALSE: (totalEarnings - LPL) * LPLtoUPL
       */

      // get relevant config
      const { belowSPT, SPTtoLPL, LPLtoUPL, aboveUPL } = ni.class4;
      if (totalEarnings < LPL) return 0;
      if (totalEarnings > UPL) return (UPL - LPL) * LPLtoUPL + (totalEarnings - UPL) * aboveUPL;
      return (totalEarnings - LPL) * LPLtoUPL;
    },
    visibleIf: () => !!inputs.isSelfEmployed.getValue(),
  });

  outputs.niTotal = new OutputConfig('ni-total', {
    form,
    value: () => {
      return (
        Number(outputs.niClass1.value()) +
        Number(outputs.niClass2.value()) +
        Number(outputs.niClass4.value())
      );
    },
  });

  return outputs;
};
