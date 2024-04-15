const fs = require('fs').promises;

export function getSumOfCalibrationNumbers(input: string): number {
  const lines = input.split('\n').filter(Boolean);

  const calibrationNumbers = lines.map((line) => {
    const digits = transformSpelledOutDigits(line).match(/\d/g);

    // Make sure any lines with no digit are not counted
    if (digits === null) {
      return 0;
    }

    const firstDigit = digits[0];
    const lastDigit = digits[digits.length - 1];

    return parseInt(`${firstDigit}${lastDigit}`, 10);
  });

  return calibrationNumbers.reduce((acc: number, cur: number) => acc + cur, 0);
}

/**
 * This is really hard because digits can overlap:
 * 'twone' should become 21
 * After trying to do this with a single regex, I couldn't get it to work properly
 * so came up with a really ugly hack: replace spelled-out digits with a string
 * containing the digit itself (allowing for processing by the main function), but
 * leaving the last characters so that overlaps can still be found. This requires
 * two passes on the string to find any overlaps.
 */
export function transformSpelledOutDigits(line: string): string {
  const textToDigit: Record<string, string> = {
    'one': '1ne',
    'two': '2wo',
    'three': '3ree',
    'four': '4ur',
    'five': '5ve',
    'six': '6ix',
    'seven': '7ven',
    'eight': '8ght',
    'nine': '9ne',
    'zero': '0ero',
  }
  
  const firstPass = line.replace(/(one|two|three|four|five|six|seven|eight|nine|zero)/g, (match) => textToDigit[match]); 
  const secondPass = firstPass.replace(/(one|two|three|four|five|six|seven|eight|nine|zero)/g, (match) => textToDigit[match]); 

  return secondPass;
}

async function run() {
  const input = await fs.readFile('src/day-01/input.txt', 'utf-8');

  return getSumOfCalibrationNumbers(input);
}

run().then(console.log).catch(console.error);
