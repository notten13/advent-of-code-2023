import { expect, test } from 'vitest';
import { getSumOfGamePowers } from './index';

test('simple case', () => {
  /**
   * First game: minimum is 3 red, 2 green, 3 blue = 3 * 2 * 3 = 18
   * Second game: minimum is 5 red, 2 green, 3 blue = 5 * 2 * 3 = 30
   * Expected result is 18 + 30 = 48
   */
  const input = `
    Game 1: 1 red, 2 green, 3 blue; 3 red
    Game 2: 2 red, 2 green, 3 blue; 5 red, 2 green, 1 blue
  `;

  expect(getSumOfGamePowers(input)).toBe(48);
});
