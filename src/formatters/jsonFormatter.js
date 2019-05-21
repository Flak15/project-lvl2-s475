import _ from 'lodash';

const renderInJsonFormat = (differenceAst) => {
  const diffs = differenceAst.map((diffNode) => {
    const diff = {};
    diff.prop = diffNode.getKey();
    if (diffNode.hasChildren()) {
      const children = diffNode.getChildren();
      diff.innerJsonDiff = renderInJsonFormat(children);
      return diff;
    }
    if (diffNode.getInitialValue() === diffNode.getFinalValue()) {
      return '';
    }
    if (diffNode.hasInitialValue()) {
      diff.initValue = diffNode.getInitialValue();
    }
    if (diffNode.hasFinalValue()) {
      diff.finalValue = diffNode.getFinalValue();
    }
    return diff;
  });
  return _.compact(diffs);
};

export default ast => JSON.stringify(renderInJsonFormat(ast));
