import _ from 'lodash';

const iter = (data, depth) => {
  const indent = (newDepth, replace = ' ', spaceCount = 4) => {
    const numberSpecialSymbols = 2;
    return replace.repeat(newDepth * spaceCount - numberSpecialSymbols);
  };

  const isNode = (item) => _.isObject(item) && item !== null;

  const brackets = (newDepth, space = 4) => ' '.repeat((newDepth * space - 2) + 2);

  const getNestedObject = (obj, newIdent) => {
    const copy = structuredClone(obj);
    const newObj = Object.entries(copy)
      .reduce((acc, [key, value]) => {
        if (!isNode(value)) {
          let result = acc;
          result += `${indent(newIdent)}  ${key}: ${value}\n`;
          return result;
        }

        let result = acc;
        result += `${indent(newIdent)}  ${key}: ${getNestedObject(value, newIdent + 1)}${brackets(newIdent)}}\n`;
        return result;
      }, '{\n');

    return newObj;
  };

  const mapping = (key, value, newDepth, symblol, mark) => {
    switch (mark) {
      case 'added':
      case 'deleted':
      case 'changed':
      case 'unchanged':
        if (!isNode(value)) {
          return `${indent(newDepth)}${symblol} ${key}: ${value}\n`;
        }
        return `${indent(newDepth)}${symblol} ${key}: ${getNestedObject(value, newDepth + 1)}${brackets(newDepth)}}\n`;

      case 'nested':
        return `${indent(newDepth)}${symblol}${key.key}: {${iter(value, newDepth + 1)}${brackets(newDepth)}}\n`;

      default:
        return null;
    }
  };

  const copyData = structuredClone(data);
  const diff = copyData.reduce((acc, key) => {
    if (key.type === 'nested') {
      let result = acc;
      result += mapping(key, key.children, depth, '  ', 'nested');
      return result;
    }

    if (key.type === 'added') {
      let result = acc;
      result += mapping(key.key, key.value, depth, '+', 'added');
      return result;
    }

    if (key.type === 'deleted') {
      let result = acc;
      result += mapping(key.key, key.value, depth, '-', 'deleted');
      return result;
    }

    if (key.type === 'changed') {
      let result = acc;
      result += mapping(key.key, key.value1, depth, '-', 'changed');
      result += mapping(key.key, key.value2, depth, '+', 'changed');

      return result;
    }

    if (key.type === 'unchanged') {
      let result = acc;
      result += mapping(key.key, key.value, depth, ' ', 'unchanged');
      return result;
    }
    const result = acc;
    return result;
  }, '');

  return `\n${diff}`;
};

const getDifftree = (ast, depth = 1) => `{${iter(ast, depth)}}`;

export default getDifftree;
