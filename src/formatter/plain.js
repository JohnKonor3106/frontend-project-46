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

  const text = data.reduce((acc, key) => {
    let result = acc;

    switch (key.type) {
      case 'added':
        result
        += `Property '${parentKey}${key.key}' was added with value: ${isBoolean(key.value)}\n`;
        break;
      case 'deleted':
        result
        += `Property '${parentKey}${key.key}' was removed\n`;
        break;
      case 'changed':
        result
        += `Property '${parentKey}${key.key}' was updated. From ${isBoolean(key.value1)} to ${isBoolean(key.value2)}\n`;
        break;
      case 'nested':
        result += iter(key.children, `${parentKey}${key.key}.`);
        break;
      default:
        break;
    }

    return result;
  }, '');

  return text;
};

const plain = (ast) => iter(ast).trim();

export default plain;
