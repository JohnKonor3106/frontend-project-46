import jsYaml from 'js-yaml';
import { extname } from 'path';
import { readFile, getPath } from '../index.js';

const parse = (data) => {
  const format = extname(data);

  if (format === '.json') {
    return JSON.parse(readFile(getPath(data)));
  }
  if (format === '.yaml' || format === '.yml') {
    return jsYaml.load(readFile(getPath(data)));
  }

  return '';
};

export default parse;
