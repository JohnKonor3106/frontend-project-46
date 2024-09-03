#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0', 'V', '--version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<file1path1> <file1path2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    const result = genDiff(filepath1, filepath2, format);
    console.log(result);
  });

program.parse();
