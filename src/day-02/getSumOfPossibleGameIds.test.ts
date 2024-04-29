import { expect, test } from 'vitest';
import { getSumOfPossibleGameIds } from './index';

test('simple case', () => {
  const input = `
    Game 1: 1 red, 2 green, 3 blue; 1 red, 1 green, 1 blue
    Game 2: 2 red, 2 green, 3 blue; 1 red, 2 green, 3 blue
    Game 3: 1 red, 1 green, 1 blue; 1 red, 1 green, 4 blue
    Game 4: 1 green, 1 blue; 1 red; 1 red, 2 green, 3 blue
    Game 5: 2 green, 1 blue; 1 red, 2 green, 10 blue
  `;

  const hypotheticalBagContent = {
    red: 1,
    green: 2,
    blue: 3,
  };

  // Games 1 and 4 should be possible => 1 + 4 = 5
  expect(getSumOfPossibleGameIds(input, hypotheticalBagContent)).toBe(5);
});
