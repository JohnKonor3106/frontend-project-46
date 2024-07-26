import _ from 'lodash';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parse.js';

const getPath = (path) => {
  const pathFile = resolve(cwd(), path);
  const file = readFileSync(pathFile, 'utf-8');

  return file;
};

const genDiff = (data1, data2) => {
  const dataParse1 = parse(data1);
  const dataParse2 = parse(data2);

  const keys1 = Object.keys(dataParse1);
  const keys2 = Object.keys(dataParse2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = {};
  let value = '{ \n'
  for (const key of keys) {
    if (!Object.hasOwn(dataParse2, key)) { /* если ключа нет во втором объекте, но есть в первом */
      value +=  `  - ${key + ': ' + dataParse1[key]} \n`   /* result[`-${key}`] = dataParse1[key]; */
    } else if (!Object.hasOwn(dataParse1, key)) { /* если ключа нет в первом  объекте, но есть во втором */
      value +=  `  + ${key + ': ' + dataParse2[key]} \n` ;
    } else if (dataParse1[key] !== dataParse2[key]) { /* если ключи есть в обоих объектах, но значения различаются  */
      value += `  - ${key + ': ' + dataParse1[key]} \n`;
      value += `  + ${key + ': ' + dataParse2[key]} \n`;
    } else {
      value += `    ${key + ': ' + dataParse1[key]} \n`;
    }
  }

  return console.log(value + '}');
};

export { genDiff, getPath };
