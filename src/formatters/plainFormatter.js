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

const renderInPlainFormat = (differenceAst, path) => {
  const renderProcessor = {
    nested: diffNode => renderInPlainFormat(diffNode.children, (path ? `${path}.` : '') + diffNode.property),
    added: diffNode => `Property '${path ? `${path}.` : ''}${diffNode.property}' added with value: ${plainStringify(diffNode.finalValue)}`,
    removed: diffNode => `Property '${path ? `${path}.` : ''}${diffNode.property}' was removed`,
    changed: diffNode => `Property '${path ? `${path}.` : ''}${diffNode.property}' was updated. From ${plainStringify(diffNode.initialValue)} to ${plainStringify(diffNode.finalValue)}`,
    unchanged: () => null,
  };
  const result = differenceAst.map(diffNode => renderProcessor[diffNode.type](diffNode));
  return _.compact(result).join('\n');
};

export default renderInPlainFormat;
