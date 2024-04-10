import { expect, test, describe, vi, afterEach } from 'vitest';
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

describe('required variants', () => {
  const consoleMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  afterEach(() => {
    consoleMock.mockReset();
  });

  describe("error when required variant isn't selected", () => {
    test('one required variant', () => {
      const variant = sv({
        variants: {
          color: {
            primary: styles.color,
            required: true,
          },
          size: {
            md: styles.fontSize,
            required: false,
          },
        },
      });
      // @ts-expect-error variant()
      expect(variant()).toStrictEqual([]);
      expect(consoleMock).toHaveBeenCalledTimes(1);
      expect(consoleMock.mock.calls).toEqual([
        ['variant color is required but not selected.'],
      ]);
    });
    test('two required variants', () => {
      const variant = sv({
        variants: {
          color: {
            primary: styles.color,
            required: true,
          },
          size: {
            md: styles.fontSize,
            required: true,
          },
        },
      });
      // @ts-expect-error variant()
      expect(variant()).toStrictEqual([]);
      expect(consoleMock).toHaveBeenCalledTimes(2);
      expect(consoleMock.mock.calls).toEqual([
        ['variant color is required but not selected.'],
        ['variant size is required but not selected.'],
      ]);
    });
  });
});
