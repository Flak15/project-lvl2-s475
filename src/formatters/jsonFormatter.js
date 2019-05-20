import _ from 'lodash';

const renderInJsonFormat = (differenceAst) => {
  const result = differenceAst.map((diffNode) => {
    const diff = {};
    diff.prop = diffNode.getKey();
    if (diffNode.hasChildren()) {
      const children = diffNode.getChildren();
      diff.innerJSON = renderInPlainFormat(children);
      return;
    }
    if (diffNode.getInitialValue() === diffNode.getFinalValue()) {
      return;
    }
    if (!diffNode.hasInitialValue()) {
      return `Property '${diffNode.getKey()}' added with value: ${plainStringify(diffNode.getFinalValue())}`;
    }
    if (!diffNode.hasFinalValue()) {
      return `Property '${diffNode.getKey()}' was removed`;
    }
    return `Property '${diffNode.getKey()}' was updated. From ${plainStringify(diffNode.getInitialValue())} to ${plainStringify(diffNode.getFinalValue())}`;
    return diff;
  });
  return _.compact(result).join('\n');
};

export default renderInPlainFormat;
