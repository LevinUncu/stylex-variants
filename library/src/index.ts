import stylex, { type StyleXStyles } from '@stylexjs/stylex';
import { Options, Variants, SelectedVariants } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantProps<T extends (selectedVariants: any) => StyleXStyles[]> =
  Parameters<T>[0];

export function sv<T extends Variants>(options: Options<T> = {}) {
  return function (selectedVariants: SelectedVariants<T>): StyleXStyles[] {
    if (!options) {
      return [];
    }

    const { base, variants, defaultVariants } = options;

    if (!variants) {
      return base ? [base] : [];
    }

    const variantClassnames: StyleXStyles[] = [];

    for (const variant in variants) {
      const selectedVariant = selectedVariants?.[variant] as string | undefined;
      const defaultVariant = defaultVariants?.[variant] as string | undefined;

      if (variants[variant].required && !selectedVariant) {
        console.error(
          `variant ${String(variant)} is required but not selected.`
        );
      }

      if (selectedVariant && variants[variant][selectedVariant]) {
        variantClassnames.push(
          variants[variant][selectedVariant] as StyleXStyles
        );
      } else if (defaultVariant && variants[variant][defaultVariant]) {
        variantClassnames.push(
          variants[variant][defaultVariant] as StyleXStyles
        );
      } else if (variants[variant].false && !selectedVariant) {
        variantClassnames.push(variants[variant].false as StyleXStyles);
      }
    }

    if (variantClassnames.length === 0) {
      return base ? [base] : [];
    }

    return base ? [base, ...variantClassnames] : variantClassnames;
  };
}
