// configuration
export interface ConfigurationFigures {
  [key: string]: number;
}

export interface ConfigurationObject {
  year: '2020-21' | '2021-22' | '2022-23';
  [key: string]: configurationFigures;
}

export type ConfigurationArray = [ConfigurationObject];

// inputs
export interface InputConfig {
  name: string;
  element(): HTMLInputElement | HTMLSelectElement;
  type(): 'number' | 'checkbox' | 'select-one';
  value(): string | number | booelan;
  visible?(): boolean;
}

// outputs
export interface OutputConfig {
  name: string;
  element(): HTMLDivElement;
  type: 'text' | 'currency';
  value(): string | number;
  visible?(): boolean;
}

// form, configuration, inputs, outputsConfig
export type OnChangeConfig = {
  form: HTMLFormElement;
  configuration: object;
  inputs: object;
  outputsConfig: object;
};
