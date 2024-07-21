import { Command } from 'commander';

const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format', 'output format')
  .argument('<file1path1>')
  .argument('<file1path2>')
  

program.parse();
