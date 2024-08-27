const iter = (data, parentKey = '') => {
  const isBoolean = (value) => ((typeof value === 'boolean' || value === null) ? value : `'${value}'`);

  const text = data.reduce((acc, key) => {
    let result = acc;

    switch (key.type) {
      case 'added':
        result
        += `Property '${parentKey}${key.key}' was added with value: ${typeof key.value === 'object' ? '[complex value]' : isBoolean(key.value)}\n`;
        break;
      case 'deleted':
        result
        += `Property '${parentKey}${key.key}' was removed\n`;
        break;
      case 'changed':
        result
        += `Property '${parentKey}${key.key}' was updated. From ${typeof key.value1 === 'object' ? '[complex value]' : isBoolean(key.value1)} to ${isBoolean(key.value2)}\n`;
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
