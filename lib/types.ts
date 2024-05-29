export interface ReturnObj {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface OptionsObj<ReturnZeros extends boolean> {
  units?: string | Partial<Record<keyof ReturnObj, boolean>>;
  returnZeros?: ReturnZeros;
}

export type Options<ReturnZeros extends boolean = false> =
  | string
  | OptionsObj<ReturnZeros>;
