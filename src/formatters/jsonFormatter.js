import _ from 'lodash';

const renderInJsonFormat = (differenceAst) => {
  const diffs = differenceAst.map((diffNode) => {

    if (diffNode.type === 'nested') {
      return { property: diffNode.property, innerJsonDiff: renderInJsonFormat(diffNode.children)};
    }

    if (diffNode.getInitialValue() === diffNode.getFinalValue()) {
      return '';
    }
    if (diffNode.type === 'added') {
      return { property: diffNode.property };
    }
    if (diffNode.type === 'removed') {
      diff.finalValue = diffNode.getFinalValue();
    }
    return diff;
  });
  return _.compact(diffs);
};

export default ast => JSON.stringify(renderInJsonFormat(ast));
