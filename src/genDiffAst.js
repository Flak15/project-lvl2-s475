import _ from 'lodash';

const genDifferenceAst = (firstDataObject, secondDataObject) => {
  const mergedKeys = _.union(_.keys(firstDataObject), _.keys(secondDataObject));

  const nodeGenerator = {
    nested(key, initialValue, finalValue) {
      return {
        property: key,
        type: 'nested',
        children: genDifferenceAst(initialValue, finalValue),
      };
    },
    changed(key, initialValue, finalValue) {
      return {
        property: key,
        type: 'changed',
        initialValue,
        finalValue,
      };
    },
    unchanged(key, initialValue, finalValue) {
      return {
        property: key,
        type: 'unchanged',
        initialValue,
        finalValue,
      };
    },
    added(key, finalValue) {
      return {
        property: key,
        type: 'added',
        finalValue,
      };
    },
    removed(key, initialValue) {
      return {
        property: key,
        type: 'removed',
        initialValue,
      };
    },
  };

  const ast = mergedKeys.map((key) => {
    const initialValue = firstDataObject[key];
    const finalValue = secondDataObject[key];
    if (_.isPlainObject(initialValue) && _.isPlainObject(finalValue)) {
      return nodeGenerator.nested(key, initialValue, finalValue);
    }
    if (_.has(firstDataObject, key) &&
      _.has(secondDataObject, key) &&
      initialValue === finalValue) {
      return nodeGenerator.unchanged(key, initialValue);
    }
    if (_.has(firstDataObject, key) && !_.has(secondDataObject, key)) {
      return nodeGenerator.removed(key, initialValue);
    }
    if (!_.has(firstDataObject, key) && _.has(secondDataObject, key)) {
      return nodeGenerator.added(key, finalValue);
    }
    return nodeGenerator.changed(key, initialValue, finalValue);
  });
  return ast;
};


export default genDifferenceAst;
