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
  const renderProcessor = {
    nested: (diffNode) => {
      const children = diffNode.children.map(child => _.assign({}, child, { property: `${diffNode.property}.${child.property}` }));
      return renderInPlainFormat(children);
    },
    added: diffNode => `Property '${diffNode.property}' added with value: ${plainStringify(diffNode.finalValue)}`,
    removed: diffNode => `Property '${diffNode.property}' was removed`,
    changed: diffNode => `Property '${diffNode.property}' was updated. From ${plainStringify(diffNode.initialValue)} to ${plainStringify(diffNode.finalValue)}`,
    unchanged: () => '',
  };
  const result = differenceAst.map(diffNode => renderProcessor[diffNode.type](diffNode));
  return _.compact(result).join('\n');
};

export default renderInPlainFormat;
