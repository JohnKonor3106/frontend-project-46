import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import { genDiff, readFile } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('getting diff json files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const result = readFile(getFixturePath('result.diff.txt'));
  const resultDiff = genDiff(file1, file2);

  expect(resultDiff).toEqual(result);
});

test('getting diff yaml files', () => {
  const fileForExpect1 = getFixturePath('file1.yaml');
  const fileForExpect2 = getFixturePath('file2.yaml');
  const fileForExpect3 = getFixturePath('file1.yml');
  const fileForExpect4 = getFixturePath('file2.yml');

  const result = readFile(getFixturePath('result.diff.txt'));
  const resultExpect1 = genDiff(fileForExpect1, fileForExpect2);
  const resultExpect2 = genDiff(fileForExpect3, fileForExpect4);

  expect(resultExpect1).toEqual(result);
  expect(resultExpect2).toEqual(result);
});

test('invalid parameters', () => {
  const resultExpect1 = genDiff('', '');
  const resultExpect2 = genDiff('file1.txt', 'file2.txt');

  expect(resultExpect1).toEqual({});
  expect(resultExpect2).toEqual({});
});
