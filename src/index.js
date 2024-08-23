import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import getTree from './formatter/bildTree.js';
import parse from './parses/parse.js';
import getformat from './formatter/format.js';

const readFile = (fileName) => (readFileSync(fileName, 'utf-8'));

const getPath = (path) => {
  const pathFile = resolve(cwd(), '__fixtures__', path);

  return pathFile;
};

const genDiff = (data1, data2, format = 'stylish') => {
  const path1 = getPath(data1);
  const path2 = getPath(data2);

  const dataParse1 = parse(path1);
  const dataParse2 = parse(path2);

  if (dataParse1 === '' || dataParse2 === '') {
    return {};
  }

  const tree = getTree(dataParse1, dataParse2);
  return getformat(tree, format);
};

export { genDiff, getPath, readFile };
