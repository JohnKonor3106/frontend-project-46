import stylish from './stylish.js';

const getformat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('This format is not supported.Please specify the correct format');
  }
};

export default getformat;
