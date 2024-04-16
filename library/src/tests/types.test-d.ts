import { test, describe, expectTypeOf } from 'vitest';
import { VariantProps, sv } from '../index';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  color: {
    color: 'red',
  },
  fontSize: {
    fontSize: '1rem',
  },
});

describe('test types', () => {
  test('no required variant', () => {
    const variant = sv({
      variants: {
        size: {
          md: styles.color,
        },
        color: {
          primary: styles.fontSize,
        },
      },
      defaultVariants: {
        color: 'primary',
      },
    });

    expectTypeOf(variant).parameter(0).toMatchTypeOf<{
      size?: 'md' | undefined;
      color?: 'primary' | undefined;
    }>();
  });
  test('required variant', () => {
    const variant = sv({
      variants: {
        size: {
          md: styles.color,
          required: true,
        },
        color: {
          primary: styles.fontSize,
        },
      },
    });
    expectTypeOf(variant).parameter(0).toMatchTypeOf<{
      size: 'md';
      color?: 'primary' | undefined;
    }>();
  });
  test('boolean variant', () => {
    const variant = sv({
      variants: {
        disabled: {
          true: styles.color,
        },
        hover: {
          true: styles.color,
          false: styles.color,
        },
        active: {
          true: styles.color,
          required: true,
        },
      },
    });
    expectTypeOf(variant).parameter(0).toMatchTypeOf<{
      disabled?: true | undefined;
      hover?: boolean | undefined;
      active: true;
    }>();
  });
  test('variant props', () => {
    const variant = sv({
      variants: {
        size: {
          sm: styles.color,
          md: styles.color,
          lg: styles.color,
        },
        disabled: {
          true: styles.color,
        },
        hover: {
          true: styles.color,
          false: styles.color,
        },
        active: {
          true: styles.color,
          required: true,
        },
      },
    });
    // @ts-expect-error
    const variantProps: VariantProps<typeof variant> = {};

    expectTypeOf(variantProps).toMatchTypeOf<{
      size?: 'sm' | 'md' | 'lg' | undefined;
      disabled?: true | undefined;
      hover?: boolean | undefined;
      active: true;
    }>();
  });
});
