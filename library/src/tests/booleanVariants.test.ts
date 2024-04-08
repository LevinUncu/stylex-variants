import { expect, test, describe } from 'vitest';
import stylex from '@stylexjs/stylex';
import { sv } from '../index';

const styles = stylex.create({
  color: {
    color: 'red',
  },
  fontSize: {
    fontSize: '1rem',
  },
});

describe('boolean variant', () => {
  test('no default, no selected', () => {
    let variant = sv({
      variants: {
        disabled: {
          true: styles.color,
        },
      },
    });
    expect(variant()).toStrictEqual([]);
    variant = sv({
      variants: {
        disabled: {
          true: styles.fontSize,
          false: styles.color,
        },
      },
    });
    expect(variant()).toStrictEqual([styles.color]);
  });
  test('default, no selected', () => {
    let variant = sv({
      variants: {
        disabled: {
          true: styles.color,
        },
      },
      defaultVariants: {
        disabled: true,
      },
    });
    expect(variant()).toStrictEqual([styles.color]);
    variant = sv({
      variants: {
        disabled: {
          true: styles.color,
          false: styles.fontSize,
        },
      },
      defaultVariants: {
        disabled: true,
      },
    });
    expect(variant()).toStrictEqual([styles.color]);
    variant = sv({
      variants: {
        disabled: {
          true: styles.color,
          false: styles.fontSize,
        },
      },
      defaultVariants: {
        disabled: false,
      },
    });
    expect(variant()).toStrictEqual([styles.fontSize]);
  });
  describe('no default, selected', () => {
    test('select false', () => {
      let variant = sv({
        variants: {
          disabled: {
            true: styles.color,
          },
        },
      });
      expect(variant({ disabled: false })).toStrictEqual([]);
      variant = sv({
        variants: {
          disabled: {
            true: styles.color,
            false: styles.fontSize,
          },
        },
      });
      expect(variant({ disabled: false })).toStrictEqual([styles.fontSize]);
    });
    test('select true', () => {
      let variant = sv({
        variants: {
          disabled: {
            true: styles.color,
          },
        },
      });
      expect(variant({ disabled: true })).toStrictEqual([styles.color]);
      variant = sv({
        variants: {
          disabled: {
            true: styles.color,
            false: styles.fontSize,
          },
        },
      });
      expect(variant({ disabled: true })).toStrictEqual([styles.color]);
    });
  });
});
