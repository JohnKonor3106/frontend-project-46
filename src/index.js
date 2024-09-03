import getTree from './formatter/bildTree.js';
import parse from './parses/parse.js';
import getformat from './formatter/format.js';
import * as utils from './utils.js';

const genDiff = (data1, data2, format = 'stylish') => {
  const path1 = utils.getPath(data1);
  const path2 = utils.getPath(data2);

  const dataParse1 = parse(path1);
  const dataParse2 = parse(path2);

  if (dataParse1 === '' || dataParse2 === '') {
    return {};
  }

  const tree = getTree(dataParse1, dataParse2);
  const result = getformat(tree, format);

  return result;
};

export default genDiff;
