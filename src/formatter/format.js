import stylish from './stylish.js';
import plain from './plain.js';

const getformat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error('This format is not supported.Please specify the correct format');
  }
};

export default getformat;
