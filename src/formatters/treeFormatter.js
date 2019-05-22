import _ from 'lodash';

const stringify = (value) => {
  if (_.isArray(value)) {
    return `[
      ${value.join(',\n      ')}
    ]`;
  }
  if (_.isPlainObject(value)) {
    const objectString = `${Object.keys(value).map(key => `  ${key}: ${stringify(value[key])}\n`).join('  ')}`;
    return `{
      ${objectString.split('\n').slice(0, -1).join('\n    ')}
    }`;
  }
  return value;
};

const render = (differenceAst) => {
  const result = differenceAst.reduce((acc, diffNode) => {
    if (diffNode.type === 'nested') {
      return [...acc, `  ${diffNode.property}: ${render(diffNode.children).split('\n').slice(0, -1).join('\n    ')}
    }`];
    }
    if (diffNode.type === 'unchanged') {
      return [...acc, `  ${diffNode.property}: ${stringify(diffNode.initialValue)}`];
    }
    if (diffNode.type === 'changed') {
      return [...acc, `- ${diffNode.property}: ${stringify(diffNode.initialValue)}`, `+ ${diffNode.property}: ${stringify(diffNode.finalValue)}`];
    }
    if (diffNode.type === 'removed') {
      return [...acc, `- ${diffNode.property}: ${stringify(diffNode.initialValue)}`];
    }
    if (diffNode.type === 'added') {
      return [...acc, `+ ${diffNode.property}: ${stringify(diffNode.finalValue)}`];
    }
    return [];
  }, []);
  return `{
  ${_.compact(result).join('\n  ')}
}`;
};
export default render;
