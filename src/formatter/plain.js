const iter = (data, parentKey = '') => {
  const isBoolean = (value) => {
    if (value === null) {
      return value;
    }
    switch (typeof value) {
      case 'string':
        return `'${value}'`;
      case 'number':
      case 'boolean':
        return value;
      default:
        return '[complex value]';
    }
  };

  return data.reduce((acc, key) => {
    const currentKey = `${parentKey}${key.key}`;

    switch (key.type) {
      case 'added':
        return `${acc}Property '${currentKey}' was added with value: ${isBoolean(key.value)}\n`;
      case 'deleted':
        return `${acc}Property '${currentKey}' was removed\n`;
      case 'changed':
        return `${acc}Property '${currentKey}' was updated. From ${isBoolean(key.value1)} to ${isBoolean(key.value2)}\n`;
      case 'nested':
        return `${acc}${iter(key.children, `${currentKey}.`)}`;
      default:
        return acc; // No changes for unrecognized types
    }
  }, '');
};

const plain = (ast) => iter(ast).trim();

export default plain;
