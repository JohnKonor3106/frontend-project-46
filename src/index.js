import _ from 'lodash';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parse.js';

const readFile = (fileName) => (readFileSync(fileName, 'utf-8'));

const getPath = (path) => {
  const pathFile = resolve(cwd(), '__fixtures__', path);

  return readFile(pathFile);
};

const genDiff = (data1, data2) => {
  const file1 = getPath(data1);
  const file2 = getPath(data2);

  const dataParse1 = parse(file1);
  const dataParse2 = parse(file2);

  const keys1 = Object.keys(dataParse1);
  const keys2 = Object.keys(dataParse2);
  const keys = _.sortBy(_.union(keys1, keys2));

  let value = '{ \n';
  for (const key of keys) {
    if (!Object.hasOwn(dataParse2, key)) { /* если ключа нет во втором объекте, но есть в первом */
      value += `  - ${`${key}: ${dataParse1[key]}`} \n`;
    } else if (!Object.hasOwn(dataParse1, key)) { /* если ключа нет в первом  объекте, но есть во втором */
      value += `  + ${`${key}: ${dataParse2[key]}`} \n`;
    } else if (dataParse1[key] !== dataParse2[key]) { /* если ключи есть в обоих объектах, но значения различаются  */
      value += `  - ${`${key}: ${dataParse1[key]}`} \n`;
      value += `  + ${`${key}: ${dataParse2[key]}`} \n`;
    } else {
      value += `    ${`${key}: ${dataParse1[key]}`} \n`;
    }
  }

  return `${value}}`;
};

export { genDiff, getPath, readFile };
