import _ from 'lodash';
import stringify from './stringify';

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
