import { StyleXStyles } from '@stylexjs/stylex';

type StyleVariant = StyleXStyles | true | undefined;

interface Variant {
  [key: string]: StyleVariant;
  required?: boolean;
}

export interface Variants {
  [key: string]: Variant;
}

interface Base {
  base?: StyleXStyles;
}

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type VariantKeys<T> = keyof T;
type VariantValues<T> = StringToBoolean<
  keyof Omit<T[VariantKeys<T>], 'required'>
>;

interface VariantOptions<T extends Variants> {
  variants?: T;
  defaultVariants?: Partial<Record<VariantKeys<T>, VariantValues<T>>>;
}

export type Options<T extends Variants> = Base & VariantOptions<T>;

type RequiredVariants<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}[keyof T];

type OptionalVariants<T> = {
  [K in keyof T]: T[K] extends { required: true } ? never : K;
}[keyof T];

type HasRequired<T> =
  RequiredVariants<T> extends Record<string, never> ? false : true;

type RequiredVariantKeys<T> = {
  [K in RequiredVariants<T>]: VariantValues<T>;
};

type OptionalVariantKeys<T> = {
  [K in OptionalVariants<T>]?: VariantValues<T>;
};

export type SelectedVariants<T extends Variants> =
  HasRequired<T> extends true
    ? RequiredVariantKeys<T> & OptionalVariantKeys<T>
    : OptionalVariantKeys<T>;
