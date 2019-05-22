import _ from 'lodash';

const genDifferenceAst = (firstDataObject, secondDataObject) => {
  const mergedKeys = _.union(_.keys(firstDataObject), _.keys(secondDataObject));
  const difference = mergedKeys.map((key) => {
    const initialValue = firstDataObject[key];
    const finalValue = secondDataObject[key];
    if (_.isPlainObject(initialValue) && _.isPlainObject(finalValue)) {
      return {
        property: key,
        type: 'nested',
        children: genDifferenceAst(initialValue, finalValue),
      };
    }
    if (_.has(firstDataObject, key) &&
      _.has(secondDataObject, key) &&
      initialValue === finalValue) {
      return {
        property: key,
        type: 'unchanged',
        initialValue,
        finalValue,
      };
    }
    if (_.has(firstDataObject, key) && !_.has(secondDataObject, key)) {
      return {
        property: key,
        type: 'removed',
        initialValue,
      };
    }
    if (!_.has(firstDataObject, key) && _.has(secondDataObject, key)) {
      return {
        property: key,
        type: 'added',
        finalValue,
      };
    }
    return {
      property: key,
      type: 'changed',
      initialValue,
      finalValue,
    };
  }, '');
  return difference;
};

export default genDifferenceAst;
