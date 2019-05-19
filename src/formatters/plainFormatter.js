import _ from 'lodash';

const plainStringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const renderInPlainFormat = (differenceAst) => {
  const result = differenceAst.map((diffNode) => {
    if (diffNode.hasChildren()) {
      const children = diffNode.getChildren();
      children.map(childDiffNode => childDiffNode.setKey(`${diffNode.getKey()}.${childDiffNode.getKey()}`));
      return renderInPlainFormat(children);
    }
    if (diffNode.getInitialValue() === diffNode.getFinalValue()) {
      return '';
    }
    if (!diffNode.hasInitialValue()) {
      return `Property '${diffNode.getKey()}' added with value: ${plainStringify(diffNode.getFinalValue())}`;
    }
    if (!diffNode.hasFinalValue()) {
      return `Property '${diffNode.getKey()}' was removed`;
    }
    return `Property '${diffNode.getKey()}' was updated. From ${plainStringify(diffNode.getInitialValue())} to ${plainStringify(diffNode.getFinalValue())}`;
  });
  return _.compact(result).join('\n');
};

export default renderInPlainFormat;
