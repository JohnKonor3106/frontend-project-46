import _ from 'lodash';

const getTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const newObj = keys.map((key) => {
    if (typeof data1[key] !== 'object' || typeof data2[key] !== 'object') {
      if (!Object.hasOwn(data2, key)) {
        return {
          key,
          type: 'deleted',
          value: data1[key],
        };
      } if (!Object.hasOwn(data1, key)) {
        return {
          key,
          type: 'added',
          value: data2[key],
        };
      } if (data1[key] !== data2[key]) {
        return {
          key,
          type: 'changed',
          value1: data1[key],
          value2: data2[key],
        };
      }

      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return {
        key,
        type: 'nested',
        children: getTree(data1[key], data2[key]),
      };
    }

    throw new Error('Data must be an object');
  });

  return newObj;
};

export default getTree;
