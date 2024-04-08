import { type StyleXStyles } from '@stylexjs/stylex';
import { Options, AvailableVariants } from './types';

export type VariantProps<
  T extends (selectedVariants?: AvailableVariants<T>) => StyleXStyles[],
> = Parameters<T>[0];

export function sv<T>(options: Options<T>) {
  return function (selectedVariants?: AvailableVariants<T>): StyleXStyles[] {
    const base = options?.base;
    if (!options?.variants) {
      return base ? [base] : [];
    }
    const { variants, defaultVariants } = options;
    const variantClassnames: StyleXStyles[] = [];

    for (const variant in variants) {
      const selectedVariant = selectedVariants?.[
        variant
      ] as keyof (typeof variants)[typeof variant];
      const defaultVariant = defaultVariants?.[
        variant
      ] as keyof (typeof variants)[typeof variant];

      if (selectedVariant) {
        variantClassnames.push(variants[variant][selectedVariant]);
      } else if (defaultVariant) {
        variantClassnames.push(variants[variant][defaultVariant]);
      } else if (variants[variant].false) {
        variantClassnames.push(variants[variant].false);
      }
    }

    if (variantClassnames.length === 0) {
      return base ? [base] : [];
    }

    return base ? [base, ...variantClassnames] : variantClassnames;
  };
}
