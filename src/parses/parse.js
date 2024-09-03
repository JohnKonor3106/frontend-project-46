import jsYaml from 'js-yaml';
import { extname } from 'path';
import * as utils from '../utils.js';

const parse = (data) => {
  const format = extname(data);

  if (format === '.json') {
    return JSON.parse(utils.readFile(utils.getPath(data)));
  }
  if (format === '.yaml' || format === '.yml') {
    return jsYaml.load(utils.readFile(utils.getPath(data)));
  }

  return '';
};

export default parse;
