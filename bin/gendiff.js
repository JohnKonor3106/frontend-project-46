#!/usr/bin/env node

import { Command } from 'commander';
import * as utils from '../src/index.js';

const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format', 'output format')
  .argument('<file1path1>')
  .argument('<file1path2>')
  .action((filepath1, filepath2) => {
    const result = utils.genDiff(filepath1, filepath2);

    return console.log(result);
  });

program.parse();
