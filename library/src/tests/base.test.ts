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

describe('base', () => {
  const variant = sv({
    base: styles.color,
    variants: {
      size: {
        md: styles.fontSize,
      },
    },
  });

  type Props = VariantProps<typeof variant>;

  test.each<[Props, StyleXStyles[]]>([
    [null as unknown as Props, [styles.color]],
    [undefined, [styles.color]],
    [{}, [styles.color]],
    [{ size: null } as unknown as Props, [styles.color]],
    [{ size: undefined }, [styles.color]],
    [{ size: 'md' }, [styles.color, styles.fontSize]],
  ])('variant(%o)', (options, expected) => {
    expect(variant(options)).toStrictEqual(expected);
  });
});
