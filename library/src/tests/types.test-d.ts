import { test, describe, expectTypeOf } from 'vitest';
import { sv } from '../index';
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
    });
    expectTypeOf(variant).parameter(0).toMatchTypeOf<
      | {
          size?: 'md' | undefined;
          color?: 'primary' | undefined;
        }
      | undefined
    >();
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
});
