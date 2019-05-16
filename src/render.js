import _ from 'lodash';
import stringify from './stringify';

const render = (difference) => {
  const result = difference.reduce((result, diffNode) => {
     if (diffNode.hasChildren()) {
       const children = diffNode.getChildren();
       return [...result, `  ${diffNode.getKey()}: ${render(children).split('\n').slice(0, -1).join('\n    ')}
   }`];
     }
     if (diffNode.getMinusValue() === diffNode.getPlusValue())
       return [...result, `  ${diffNode.getKey()}: ${diffNode.getMinusValue()}`];
     const minusValue = stringify(diffNode.getMinusValue());
     const plusValue = stringify(diffNode.getPlusValue());
     const minusString = diffNode.hasMinusValue() ? `- ${diffNode.getKey()}: ${minusValue}` : '';
     const plusString = diffNode.hasPlusValue() ? `+ ${diffNode.getKey()}: ${plusValue}` : '';
     return [...result, minusString, plusString];
 }, []);
 return `{
 ${_.compact(result).join('\n  ')}
}`;
};
export default render;
