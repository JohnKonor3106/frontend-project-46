import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';
import * as utils from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function isValidJSON(string) {
  try {
    JSON.parse(string);
    return true; // Строка является корректным JSON
  } catch (error) {
    return false; // Строка не является корректным JSON
  }
}

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('getting diff json files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const result = utils.readFile(getFixturePath('result.diff.txt'));
  const resultDiff = genDiff(file1, file2);

  expect(resultDiff).toBe(result);
});

test('getting diff yaml files', () => {
  const fileForExpect1 = getFixturePath('file1.yaml');
  const fileForExpect2 = getFixturePath('file2.yaml');
  const fileForExpect3 = getFixturePath('file1.yml');
  const fileForExpect4 = getFixturePath('file2.yml');

  const result = utils.readFile(getFixturePath('result.diff.txt'));
  const resultExpect1 = genDiff(fileForExpect1, fileForExpect2);
  const resultExpect2 = genDiff(fileForExpect3, fileForExpect4);

  expect(resultExpect1).toBe(result);
  expect(resultExpect2).toBe(result);
});

test('invalid parameters', () => {
  const resultExpect1 = genDiff('', '');
  const resultExpect2 = genDiff('file1.txt', 'file2.txt');

  expect(resultExpect1).toEqual({});
  expect(resultExpect2).toEqual({});
});

test('comparison of nested values', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const result = utils.readFile(getFixturePath('result.diff.txt'));
  const resultDiff = genDiff(file1, file2);

  expect(resultDiff).toBe(result);
});

test('should throw an error', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = genDiff(file1, file2, 'txt');

  expect(result).toBe('');
});

test('should incorrect format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const trueOutput = utils.readFile(getFixturePath('result.diff.txt'));
  const resultDiff = genDiff(file1, file2, 'stylish');

  expect(resultDiff).toBe(trueOutput);
});

test('should plain format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const trueOutput = utils.readFile(getFixturePath('result.plain.txt'));
  const resultDiff = genDiff(file1, file2, 'plain');
  expect(resultDiff).toBe(trueOutput);
});

test('should json format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const jsonFormat = genDiff(file1, file2, 'json');
  const resultJson = isValidJSON(jsonFormat);

  expect(resultJson).toBe(true);
});
