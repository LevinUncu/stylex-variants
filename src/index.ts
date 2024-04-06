import { type StyleXStyles } from '@stylexjs/stylex';

type Variants = Record<string, Record<string, StyleXStyles>>;

type DefaultVariants<T> = {
  [key in keyof T]: keyof T[key];
};

type Arguments<T> = {
  base?: StyleXStyles;
  variants?: T;
  defaultVariants?: DefaultVariants<T>;
};

type SelectedVariants<T> = {
  [K in keyof T]?: keyof T[K];
};

export type VariantProps<T extends (args: SelectedVariants<T>) => unknown> =
  Parameters<T>[0];

export function sv<T extends Variants = never>({
  base,
  variants,
  defaultVariants,
}: Arguments<T> = {}) {
  return function (selectedVariants?: SelectedVariants<T>): StyleXStyles[] {
    if (!variants) {
      return base ? [base] : [];
    }

    const variantClassnames: StyleXStyles[] = [];

    for (const variant in variants) {
      const selectedVariant = selectedVariants?.[variant];
      const defaultVariant = defaultVariants?.[variant];

      if (selectedVariant) {
        variantClassnames.push(variants[variant][selectedVariant]);
      } else if (defaultVariant) {
        variantClassnames.push(variants[variant][defaultVariant]);
      }
    }

    if (variantClassnames.length === 0) {
      return base ? [base] : [];
    }

    return base ? [base, ...variantClassnames] : variantClassnames;
  };
}
