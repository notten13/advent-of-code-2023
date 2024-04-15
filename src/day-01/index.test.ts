// sum.test.js
import { expect, test } from 'vitest';
import { getSumOfCalibrationNumbers, transformSpelledOutDigits } from './index';

test('get sum with simple input', () => {
  // 15 + 30 = 45
  const input = `
    1abc5
    3abc0
  `;

  const result = getSumOfCalibrationNumbers(input);

  expect(result).toBe(45);
});

test('single digits in line are counted twice', () => {
  // 15 + 55 = 70
  const input = `
    1abc5
    5abc
  `;

  const result = getSumOfCalibrationNumbers(input);

  expect(result).toBe(70);
});

test('lines with no digits are ignored', () => {
  // 12, abc ignored
  const input = `
    1abc2
    abc
  `;

  const result = getSumOfCalibrationNumbers(input);

  expect(result).toBe(12);
});

test('lines with many digits are processed as expected', () => {
  // 19 + 11 = 30
  const input = `
    1abc23456789
    1abc1
  `;

  const result = getSumOfCalibrationNumbers(input);

  expect(result).toBe(30);
});

test('line contains a spelled-out digit', () => {
  const input = `
    oneabc2
    aaathreebbbnzero
  `;

  const result = getSumOfCalibrationNumbers(input);

  expect(result).toBe(42);
});

test('spelled-out digits overlap', () => {
  const input = `
    xtwone3twone
  `;

  const result = getSumOfCalibrationNumbers(input);

  expect(result).toBe(21);
});
