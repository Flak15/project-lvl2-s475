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

const plainRender = (differenceAst) => {
  const result = differenceAst.reduce((acc, diffNode) => {
    if (diffNode.hasChildren()) {
      const children = diffNode.getChildren();
      children.map(childDiffNode => childDiffNode.setKey(`${diffNode.getKey()}.${childDiffNode.getKey()}`));
      return [...acc, plainRender(children)];
    }
    if (diffNode.getMinusValue() === diffNode.getPlusValue()) {
      return acc;
    }
    if (!diffNode.hasMinusValue()) {
      const minusString = `Property '${diffNode.getKey()}' added with value: ${plainStringify(diffNode.getPlusValue())}`;
      return [...acc, minusString];
    }
    if (!diffNode.hasPlusValue()) {
      const plusString = `Property '${diffNode.getKey()}' was removed`;
      return [...acc, plusString];
    }

    const str = `Property '${diffNode.getKey()}' was updated. From ${plainStringify(diffNode.getMinusValue())} to ${plainStringify(diffNode.getPlusValue())}`;
    return [...acc, str];
  }, []);
  return result.join('\n');
};

export default plainRender;
