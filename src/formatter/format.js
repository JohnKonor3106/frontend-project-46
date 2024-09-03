import stylish from './stylish.js';
import plain from './plain.js';
import genJson from './json.js';

const getformat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return genJson(tree);
    default:
      return '';
  }
};

export default getformat;
