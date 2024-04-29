import { expect, test } from 'vitest';
import { parseInput } from './index';

test('simple case', () => {
  const input = `
    Game 1: 1 red, 2 green, 3 blue; 2 red, 3 green, 4 blue
    Game 2: 7 red, 10 green, 3 blue; 1 red, 1 green, 1 blue
  `;

  expect(parseInput(input)).toEqual([
    {
      gameId: 1,
      revealedCubes: [
        { red: 1, green: 2, blue: 3 },
        { red: 2, green: 3, blue: 4 },
      ],
    },
    {
      gameId: 2,
      revealedCubes: [
        { red: 7, green: 10, blue: 3 },
        { red: 1, green: 1, blue: 1 },
      ],
    },
  ]);
});

test('missing colours are set to 0', () => {
  const input = `
    Game 1: 1 red; 1 blue
  `;

  expect(parseInput(input)).toEqual([
    {
      gameId: 1,
      revealedCubes: [
        { red: 1, green: 0, blue: 0 },
        { red: 0, green: 0, blue: 1 },
      ],
    },
  ]);
});
