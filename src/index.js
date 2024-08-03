import _ from 'lodash';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parses/parse.js';

const readFile = (fileName) => (readFileSync(fileName, 'utf-8'));

const getPath = (path) => {
  const pathFile = resolve(cwd(), '__fixtures__', path);

  return pathFile;
};

const genDiff = (data1, data2) => {
  const path1 = getPath(data1);
  const path2 = getPath(data2);

  const dataParse1 = parse(path1);
  const dataParse2 = parse(path2);

  if (dataParse1 === '' || dataParse2 === '') {
    return {};
  }

  const keys1 = Object.keys(dataParse1);
  const keys2 = Object.keys(dataParse2);
  const keys = _.sortBy(_.union(keys1, keys2));

  let value = '{ \n';

  keys.forEach((key) => {
    if (!Object.hasOwn(dataParse2, key)) {
      value += `  - ${`${key}: ${dataParse1[key]}`} \n`;
    } else if (!Object.hasOwn(dataParse1, key)) {
      value += `  + ${`${key}: ${dataParse2[key]}`} \n`;
    } else if (dataParse1[key] !== dataParse2[key]) {
      value += `  - ${`${key}: ${dataParse1[key]}`} \n`;
      value += `  + ${`${key}: ${dataParse2[key]}`} \n`;
    } else {
      value += `    ${`${key}: ${dataParse1[key]}`} \n`;
    }
  });

  return `${value}}`;
};

export { genDiff, getPath, readFile };
