import _ from 'lodash';

const renderInJsonFormat = (differenceAst) => {
  const diffs = differenceAst.map((diffNode) => {
    if (diffNode.type === 'nested') {
      return {
        prop: diffNode.property,
        innerJsonDiff: renderInJsonFormat(diffNode.children),
      };
    }
    if (diffNode.type === 'added') {
      return {
        prop: diffNode.property,
        finalValue: diffNode.finalValue,
      };
    }
    if (diffNode.type === 'removed') {
      return {
        prop: diffNode.property,
        initValue: diffNode.initialValue,
      };
    }
    if (diffNode.type === 'changed') {
      return {
        prop: diffNode.property,
        initValue: diffNode.initialValue,
        finalValue: diffNode.finalValue,
      };
    }
    return '';
  });
  return _.compact(diffs);
};

export default ast => JSON.stringify(renderInJsonFormat(ast));
