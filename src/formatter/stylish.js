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
    return Object.entries(copy)
      .reduce((acc, [key, value]) => {
        const result = !isNode(value)
          ? `${indent(newIdent)}  ${key}: ${value}\n`
          : `${indent(newIdent)}  ${key}: ${getNestedObject(value, newIdent + 1)}${brackets(newIdent)}}\n`;
        return acc + result;
      }, '{\n');
  };

  const mapping = (key, value, newDepth, symblol, mark) => {
    switch (mark) {
      case 'added':
      case 'deleted':
      case 'changed':
      case 'unchanged':
        return !isNode(value)
          ? `${indent(newDepth)}${symblol} ${key}: ${value}\n`
          : `${indent(newDepth)}${symblol} ${key}: ${getNestedObject(value, newDepth + 1)}${brackets(newDepth)}}\n`;

      case 'nested':
        return `${indent(newDepth)}${symblol}${key.key}: {${iter(value, newDepth + 1)}${brackets(newDepth)}}\n`;

      default:
        return null;
    }
  };

  const copyData = structuredClone(data);
  return `\n${copyData.reduce((acc, key) => {
    if (key.type === 'nested') {
      return acc + mapping(key, key.children, depth, '  ', 'nested');
    }

    if (key.type === 'added') {
      return acc + mapping(key.key, key.value, depth, '+', 'added');
    }

    if (key.type === 'deleted') {
      return acc + mapping(key.key, key.value, depth, '-', 'deleted');
    }

    if (key.type === 'changed') {
      return acc + mapping(key.key, key.value1, depth, '-', 'changed')
        + mapping(key.key, key.value2, depth, '+', 'changed');
    }

    if (key.type === 'unchanged') {
      return acc + mapping(key.key, key.value, depth, ' ', 'unchanged');
    }

    return acc;
  }, '')}`;
};

const getDifftree = (ast, depth = 1) => `{${iter(ast, depth)}}`;

export default getDifftree;
