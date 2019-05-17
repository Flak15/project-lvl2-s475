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
    if (diffNode.hasChildren()) {
      const children = diffNode.getChildren();
      return [...acc, `  ${diffNode.getKey()}: ${render(children).split('\n').slice(0, -1).join('\n    ')}
    }`];
    }
    if (diffNode.getMinusValue() === diffNode.getPlusValue()) {
      return [...acc, `  ${diffNode.getKey()}: ${diffNode.getMinusValue()}`];
    }
    const minusValue = stringify(diffNode.getMinusValue());
    const plusValue = stringify(diffNode.getPlusValue());
    const minusString = diffNode.hasMinusValue() ? `- ${diffNode.getKey()}: ${minusValue}` : '';
    const plusString = diffNode.hasPlusValue() ? `+ ${diffNode.getKey()}: ${plusValue}` : '';
    return [...acc, minusString, plusString];
  }, []);
  return `{
  ${_.compact(result).join('\n  ')}
}`;
};
export default render;
