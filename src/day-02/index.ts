const fs = require('fs').promises;

type CubesCount = {
  red: number;
  green: number;
  blue: number;
};

type ParsedInput = {
  gameId: number;
  revealedCubes: CubesCount[];
}[];

export function parseInput(input: string): ParsedInput {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const gameOutput = line.split(':')[1];
      const revealedCubesString = gameOutput.split(';');

      const cubes = revealedCubesString.map((revealedCubes) => {
        const counts: CubesCount = {
          red: 0,
          green: 0,
          blue: 0,
        };

        revealedCubes.split(',').forEach((cube) => {
          const [countString, color] = cube.trim().split(' ');
          counts[color as keyof CubesCount] = parseInt(countString);
        });

        return counts;
      });

      return {
        gameId: index + 1,
        revealedCubes: cubes,
      };
    });
}

/**
 * Get the sum of all possible game IDs. A possible game is a game where all
 * the sets of revealed cubes can actually be found in the hypothetical bag, so
 * none of the counts provided in the input exceed the count of each colour
 * in the hypothetical bag content we're testing against.
 * @param input Game input string
 * @param hypotheticalBagContent The bag content we're testing against
 * @returns number The sum of all possible game IDs
 */
export function getSumOfPossibleGameIds(
  input: string,
  hypotheticalBagContent: CubesCount
): number {
  const parsedInput: ParsedInput = parseInput(input);

  const possibleGames = parsedInput.filter((game) => {
    return game.revealedCubes.every((revealedCubes) => {
      return Object.entries(revealedCubes).every(([color, count]) => {
        return count <= hypotheticalBagContent[color as keyof CubesCount];
      });
    });
  });

  return possibleGames.reduce((sum, game) => sum + game.gameId, 0);
}

/**
 * Get sum of all game powers. The power is: for each game, we find the minimum
 * number of cubes of each colour that must be in the bag for the input to be
 * possible. The power of a game is the product of these minimum counts.
 */
export function getSumOfGamePowers(input: string) {
  // TODO: do this once in main function
  const parsedInput: ParsedInput = parseInput(input);

  const gamePowers: number[] = parsedInput.map((game) => {
    // For each game, find minimum number of cubes of each colour
    const minimumCubes: CubesCount = {
      red: 0,
      green: 0,
      blue: 0,
    };

    game.revealedCubes.forEach((revealedCubes) => {
      Object.entries(revealedCubes).forEach(([color, count]) => {
        minimumCubes[color as keyof CubesCount] = Math.max(
          minimumCubes[color as keyof CubesCount],
          count
        );
      });
    });

    return minimumCubes.red * minimumCubes.green * minimumCubes.blue;
  });

  return gamePowers.reduce((sum, power) => sum + power, 0);
}

async function run() {
  const hypotheticalBagContent: CubesCount = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const input = await fs.readFile('src/day-02/input.txt', 'utf-8');

  console.log(
    'Part 1:',
    getSumOfPossibleGameIds(input, hypotheticalBagContent)
  );
  console.log('Part 2:', getSumOfGamePowers(input));
}

run().then(console.log).catch(console.error);
