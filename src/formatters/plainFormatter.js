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
    if (diffNode.getMinusValue() === diffNode.getPlusValue()) {
      return;
    }
    if (!diffNode.hasMinusValue()) {
      const minusString = `Property '${diffNode.getKey()}' added with value: ${plainStringify(diffNode.getPlusValue())}`;
      return minusString;
    }
    if (!diffNode.hasPlusValue()) {
      const plusString = `Property '${diffNode.getKey()}' was removed`;
      return plusString;
    }

    const str = `Property '${diffNode.getKey()}' was updated. From ${plainStringify(diffNode.getMinusValue())} to ${plainStringify(diffNode.getPlusValue())}`;
    return str;
  });
  return _.compact(result).join('\n');
};

export default renderInPlainFormat;
