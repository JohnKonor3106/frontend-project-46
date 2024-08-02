import { genDiff } from "../src";
import { readFile } from "../src";
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
    const file1  =  getFixturePath('file1.json')
    const file2  =  getFixturePath('file2.json')

    const result =  readFile(getFixturePath('result.diff.txt'))
 
    expect(genDiff(file1, file2)).toEqual(result)
});