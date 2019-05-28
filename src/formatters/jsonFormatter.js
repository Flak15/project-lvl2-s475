import _ from 'lodash';

const renderInJsonFormat = (differenceAst) => {
  const renderProcessor = {
    nested: diffNode => ({
      prop: diffNode.property,
      innerJsonDiff: renderInJsonFormat(diffNode.children),
    }),
    added: diffNode => ({ prop: diffNode.property, finalValue: diffNode.finalValue }),
    removed: diffNode => ({ prop: diffNode.property, initValue: diffNode.initialValue }),
    changed: diffNode => ({
      prop: diffNode.property,
      initValue: diffNode.initialValue,
      finalValue: diffNode.finalValue,
    }),
    unchanged: () => null,
  };
  const diffs = differenceAst.map(diffNode => renderProcessor[diffNode.type](diffNode));
  return _.compact(diffs);
};

export default ast => JSON.stringify(renderInJsonFormat(ast));
