import { expect, test, describe } from 'vitest';
import stylex from '@stylexjs/stylex';
import { sv } from '.';

const styles = stylex.create({
  color: {
    color: 'red',
  },
  fontSize: {
    fontSize: '1rem',
  },
});

test('selected variant different than default variant', () => {
  const variant = sv({
    variants: {
      size: {
        lg: styles.fontSize,
        md: styles.color,
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  });
  expect(variant({ size: 'md' })).toStrictEqual([
    {
      $$css: true,
      color: 'x1e2nbdu',
      'index__styles.color': 'index__styles.color',
    },
  ]);
});

describe('without base', () => {
  describe('without variants', () => {
    test('empty', () => {
      const variant = sv();
      expect(variant()).toStrictEqual([]);
      expect(
        // @ts-expect-error variant(undefined)
        variant({
          x: styles.color,
        }),
      ).toStrictEqual([]);
    });
    test('undefined', () => {
      const variant = sv(undefined);
      expect(variant()).toStrictEqual([]);
      expect(
        // @ts-expect-error variant(undefined)
        variant({
          x: styles.color,
        }),
      ).toStrictEqual([]);
    });
    test('empty object', () => {
      const variant = sv({});
      expect(variant()).toStrictEqual([]);
      expect(
        // @ts-expect-error variant(undefined)
        variant({
          x: styles.color,
        }),
      ).toStrictEqual([]);
    });
  });
  describe('without defaults', () => {
    test('without selected variant', () => {
      const variant = sv({
        variants: {
          size: {
            small: styles.color,
          },
        },
      });
      expect(variant()).toStrictEqual([]);
    });
    test('with selected variant', () => {
      const variant1 = sv({
        variants: {
          size: {
            small: styles.color,
          },
        },
      });
      expect(variant1({ size: 'small' })).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
      const variant2 = sv({
        variants: {
          size: {
            small: styles.color,
          },
          variant: {
            icon: styles.color,
          },
        },
      });
      expect(variant2({ size: 'small', variant: 'icon' })).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
      const variant3 = sv({
        variants: {
          size: {
            small: styles.color,
            large: styles.color,
          },
          variant: {
            icon: styles.color,
          },
        },
      });
      expect(variant3({ size: 'small', variant: 'icon' })).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
    });
  });
  describe('with defaults', () => {
    test('without selected variant', () => {
      const variant1 = sv({
        variants: {
          size: {
            small: styles.color,
          },
        },
        defaultVariants: {
          size: 'small',
        },
      });
      expect(variant1()).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
      const variant2 = sv({
        variants: {
          size: {
            small: styles.color,
            large: styles.fontSize,
          },
          variant: {
            icon: styles.color,
          },
        },
        defaultVariants: {
          size: 'small',
          variant: 'icon',
        },
      });
      expect(variant2()).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
    });
    test('with selected variant', () => {
      const variant1 = sv({
        variants: {
          size: {
            small: styles.color,
          },
        },
        defaultVariants: {
          size: 'small',
        },
      });
      expect(variant1({ size: 'small' })).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
      const variant2 = sv({
        variants: {
          size: {
            small: styles.color,
            large: styles.fontSize,
          },
          variant: {
            icon: styles.color,
          },
        },
        defaultVariants: {
          size: 'small',
          variant: 'icon',
        },
      });
      expect(variant2({ size: 'large', variant: 'icon' })).toStrictEqual([
        {
          $$css: true,
          fontSize: 'x1jchvi3',
          'index__styles.fontSize': 'index__styles.fontSize',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
    });
  });
});

describe('with base', () => {
  test('without variants', () => {
    const variant = sv({
      base: styles.color,
    });
    expect(variant()).toStrictEqual([
      {
        $$css: true,
        color: 'x1e2nbdu',
        'index__styles.color': 'index__styles.color',
      },
    ]);
  });
  describe('without defaults', () => {
    test('without selected variant', () => {
      const variant = sv({
        base: styles.color,
        variants: {
          size: {
            small: styles.fontSize,
          },
        },
      });
      expect(variant()).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
    });
    test('with selected variant', () => {
      const variant1 = sv({
        base: styles.color,
        variants: {
          size: {
            small: styles.fontSize,
          },
        },
      });
      expect(variant1({ size: 'small' })).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          fontSize: 'x1jchvi3',
          'index__styles.fontSize': 'index__styles.fontSize',
        },
      ]);
      const variant2 = sv({
        base: styles.fontSize,
        variants: {
          size: {
            small: styles.color,
          },
          variant: {
            icon: styles.color,
          },
        },
      });
      expect(variant2({ size: 'small', variant: 'icon' })).toStrictEqual([
        {
          $$css: true,
          fontSize: 'x1jchvi3',
          'index__styles.fontSize': 'index__styles.fontSize',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
    });
  });
  describe('with defaults', () => {
    test('without selected variant', () => {
      const variant = sv({
        base: styles.color,
        variants: {
          size: {
            small: styles.fontSize,
          },
        },
        defaultVariants: {
          size: 'small',
        },
      });
      expect(variant()).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          fontSize: 'x1jchvi3',
          'index__styles.fontSize': 'index__styles.fontSize',
        },
      ]);
    });
    test('with selected variant', () => {
      const variant1 = sv({
        base: styles.color,
        variants: {
          size: {
            small: styles.fontSize,
            large: styles.color,
          },
        },
        defaultVariants: {
          size: 'small',
        },
      });
      expect(variant1({ size: 'large' })).toStrictEqual([
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
        {
          $$css: true,
          color: 'x1e2nbdu',
          'index__styles.color': 'index__styles.color',
        },
      ]);
    });
  });
});
