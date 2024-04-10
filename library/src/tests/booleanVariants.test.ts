import { expect, test, describe } from 'vitest';
import stylex, { StyleXStyles } from '@stylexjs/stylex';
import { VariantProps, sv } from '../index';

const styles = stylex.create({
  color: {
    color: 'red',
  },
  fontSize: {
    fontSize: '1rem',
  },
});

describe('boolean variants', () => {
  const variantTrue = sv({
    variants: {
      disabled: {
        true: styles.color,
      },
    },
  });
  const variantFalse = sv({
    variants: {
      disabled: {
        false: styles.color,
      },
    },
  });
  const variantFalseTrue = sv({
    variants: {
      disabled: {
        false: styles.color,
        true: styles.fontSize,
      },
    },
  });

  type Props =
    | VariantProps<typeof variantFalse>
    | VariantProps<typeof variantTrue>
    | VariantProps<typeof variantFalseTrue>;

  describe.each<[Props, StyleXStyles[], StyleXStyles[], StyleXStyles[]]>([
    [null as unknown as Props, [], [styles.color], [styles.color]],
    [undefined, [], [styles.color], [styles.color]],
    [{}, [], [styles.color], [styles.color]],
    [
      { disabled: null } as unknown as Props,
      [],
      [styles.color],
      [styles.color],
    ],
    [{ disabled: undefined }, [], [styles.color], [styles.color]],
    [{ disabled: false }, [], [styles.color], [styles.color]],
    [{ disabled: true }, [styles.color], [], [styles.fontSize]],
  ])(
    'variant(%o)',
    (options, expectedTrue, expectedFalse, expectedFalseTrue) => {
      test('with true key', () => {
        expect(variantTrue(options)).toStrictEqual(expectedTrue);
      });
      test('with false key', () => {
        expect(variantFalse(options)).toStrictEqual(expectedFalse);
      });
      test('with false and true key', () => {
        expect(variantFalseTrue(options)).toStrictEqual(expectedFalseTrue);
      });
    }
  );
});
