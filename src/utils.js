import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const readFile = (fileName) => (readFileSync(fileName, 'utf-8'));

const getPath = (path) => {
  const pathFile = resolve(cwd(), '__fixtures__', path);

  return pathFile;
};

export { getPath, readFile };
