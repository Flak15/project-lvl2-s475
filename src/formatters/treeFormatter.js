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
    if (diffNode.getInitialValue() === diffNode.getFinalValue()) {
      return [...acc, `  ${diffNode.getKey()}: ${diffNode.getInitialValue()}`];
    }
    const initialValueString = stringify(diffNode.getInitialValue());
    const finalValueString = stringify(diffNode.getFinalValue());
    const minusString = diffNode.hasInitialValue() ? `- ${diffNode.getKey()}: ${initialValueString}` : '';
    const plusString = diffNode.hasFinalValue() ? `+ ${diffNode.getKey()}: ${finalValueString}` : '';
    return [...acc, minusString, plusString];
  }, []);
  return `{
  ${_.compact(result).join('\n  ')}
}`;
};
export default render;
