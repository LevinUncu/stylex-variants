import { expect, test, describe } from 'vitest';
import { StyleXStyles } from '@stylexjs/stylex';
import { sv } from '../index';

describe('sv', () => {
  test('sv()()', () => {
    // @ts-expect-error
    expect(sv()()).toStrictEqual([]);
  });
  test.each<[unknown, StyleXStyles[]]>([
    [null, []],
    [undefined, []],
    [{}, []],
  ])('sv(%o)()', (options, expected) => {
    // @ts-expect-error
    expect(sv(options)()).toStrictEqual(expected);
  });
});
