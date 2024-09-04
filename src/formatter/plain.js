const iter = (data, parentKey = '') => {
  const checkTypeData = (value) => {
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
        return `${acc}Property '${currentKey}' was added with value: ${checkTypeData(key.value)}\n`;
      case 'deleted':
        return `${acc}Property '${currentKey}' was removed\n`;
      case 'changed':
        return `${acc}Property '${currentKey}' was updated. From ${checkTypeData(key.value1)} to ${checkTypeData(key.value2)}\n`;
      case 'nested':
        return `${acc}${iter(key.children, `${currentKey}.`)}`;
      default:
        return acc;
    }
  }, '');
};

const plain = (ast) => iter(ast).trim();

export default plain;
