import _ from 'lodash';
import DiffNode from './DiffNode';

const genDifferenceAst = (firstDataObject, secondDataObject) => {
  const mergedKeys = _.union(_.keys(firstDataObject), _.keys(secondDataObject));
  const difference = mergedKeys.map((key) => {
    const firstValue = firstDataObject[key];
    const secondValue = secondDataObject[key];
    const diffNode = new DiffNode(key);
    if (_.isPlainObject(firstValue) && _.isPlainObject(secondValue)) {
      diffNode.addChild(genDifferenceAst(firstValue, secondValue));
      return diffNode;
    }
    if (_.has(firstDataObject, key)) {
      diffNode.setInitialValue(firstValue);
    }
    if (_.has(secondDataObject, key)) {
      diffNode.setFinalValue(secondValue);
    }
    return diffNode;
  }, '');
  return difference;
};

export default genDifferenceAst;
