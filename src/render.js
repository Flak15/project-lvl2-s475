import _ from 'lodash';
import stringify from './stringify';

const render = (difference) => {
  const diffStringArray = difference.reduce((result, diffNode) => {
    if (diffNode.hasChildren()) {
      return [...result, `    ${diffNode.getKey()}: ${render(diffNode.getChildren()).split('\n').join('\n    ')}`];
    }
    if (diffNode.getMinusValue() === diffNode.getPlusValue()) {
      return [...result, `    ${diffNode.getKey()}: ${diffNode.getMinusValue()}`];
    }
    const minusValue = diffNode.hasMinusValue() ? stringify(diffNode.getMinusValue()) : '';
    const plusValue = _.isObject(diffNode.getPlusValue()) ? stringify(diffNode.getPlusValue()) : diffNode.getPlusValue();
    const minusString = diffNode.hasMinusValue() ? `  - ${diffNode.getKey()}: ${minusValue}` : '';
    const plusString = diffNode.hasPlusValue() ? `  + ${diffNode.getKey()}: ${plusValue}` : '';
    return [...result, `${_.isObject(minusString) ? stringify(minusString) : minusString}`, `${plusString}`];
  }, []);
  return `{\n${_.compact(diffStringArray).join('\n')}\n}`;
};
export default render;
