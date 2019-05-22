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
    if (diffNode.type === 'nested') {
      const children = diffNode.children.map(child => _.assign({}, child, { property: `${diffNode.property}.${child.property}` }));
      return renderInPlainFormat(children);
    }
    if (diffNode.type === 'unchanged') {
      return '';
    }
    if (diffNode.type === 'added') {
      return `Property '${diffNode.property}' added with value: ${plainStringify(diffNode.finalValue)}`;
    }
    if (diffNode.type === 'removed') {
      return `Property '${diffNode.property}' was removed`;
    }
    if (diffNode.type === 'changed') {
      return `Property '${diffNode.property}' was updated. From ${plainStringify(diffNode.initialValue)} to ${plainStringify(diffNode.finalValue)}`;
    }
  });
  return _.compact(result).join('\n');
};

export default renderInPlainFormat;
