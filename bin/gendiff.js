#!/usr/bin/env node

import { program } from 'commander';
import * as utils from '../src/index.js';

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<file1path1>')
  .argument('<file1path2>')
  .action((filepath1, filepath2, { format }) => {
    const result = utils.genDiff(filepath1, filepath2, format);
    console.log(result);
  });

program.parse();
