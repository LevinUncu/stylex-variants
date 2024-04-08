import { StyleXStyles } from '@stylexjs/stylex';

type Variants = Record<string, Record<string, StyleXStyles>>;

export type Options<T> = T extends Variants
  ? {
      base?: StyleXStyles;
      variants?: T;
      defaultVariants?: AvailableVariants<T>;
    }
  : {
      base?: StyleXStyles;
      variants?: never;
      defaultVariants?: never;
    };

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

export type AvailableVariants<T> = T extends Variants
  ? {
      [key in keyof T]?: StringToBoolean<keyof T[key]>;
    }
  : never;
