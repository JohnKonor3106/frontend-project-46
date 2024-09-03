#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0', 'V', '--version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<file1path1> <file1path2>')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    return console.log(result);
  });

program.parse();
