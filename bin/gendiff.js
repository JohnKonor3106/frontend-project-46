import { Command } from 'commander';
import { parse } from '../src/parse.js';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { resolve } from 'node:path';
import { readFileSync} from 'fs';
import { isAbsolute } from 'node:path';

const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0')
  .option('-f, --format', 'output format')
  .argument('<file1path1>')
  .argument('<file1path2>')
  .action((filepath1, filepath2) => {
  
      const path1 = resolve(cwd(), filepath1)
      const path2 = resolve(cwd(), filepath2)

      const file1 = readFileSync(path1, 'utf-8')
      const file2 = readFileSync(path2, 'utf-8')
     
      const parseFile = parse(file1)
      const parseFile2 = parse(file2)
     
      return console.log(parseFile),
             console.log(parseFile2)
    
    //  const data1 = readFileSync(cwd() + '/' + filepath1, 'utf-8');
    //  const data2 = readFileSync(cwd() + '/' + filepath2, 'utf-8');

    //  const parseData1 =  parse(data1);
    //  const parseData2 =  parse(data2);

    //  return console.log(parseData1),
    //         console.log(parseData2)
    })
  

program.parse();
