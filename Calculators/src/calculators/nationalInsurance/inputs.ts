import { InputConfig } from '../helpers';

export interface Inputs {
  year: InputConfig;
  isEmployed: InputConfig;
  isSelfEmployed: InputConfig;
  annualSalary: InputConfig;
  selfEmployedIncome: InputConfig;
  selfEmployedExpenses: InputConfig;
}

export const inputs = (form: HTMLFormElement): Inputs => {
  const config: Inputs = {
    year: new InputConfig('year', {
      form,
    }),
    isEmployed: new InputConfig('is-employed', {
      form,
    }),
    isSelfEmployed: new InputConfig('is-self-employed', {
      form,
    }),
  };

  config.annualSalary = new InputConfig('annual-salary', {
    form,
    visibleIf: () => {
      return !!config.isEmployed.getValue();
    },
  });

  config.selfEmployedIncome = new InputConfig('self-employed-income', {
    form,
    visibleIf: () => {
      return !!config.isSelfEmployed.getValue();
    },
  });

  config.selfEmployedExpenses = new InputConfig('self-employed-expenses', {
    form,
    visibleIf: () => {
      return !!config.isSelfEmployed.getValue();
    },
  });

  return config;
};
