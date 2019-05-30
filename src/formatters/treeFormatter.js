import _ from 'lodash';

const stringify = (value) => {
  if (_.isArray(value)) {
    return `[
      ${value.join(',\n      ')}
    ]`;
  }
  if (_.isPlainObject(value)) {
    const objectString = `${Object.keys(value).map(key => `  ${key}: ${stringify(value[key])}\n`).join('  ')}`;
    return `{\n      ${objectString.split('\n').join('\n    ')}}`;
  }
  return value;
};

const render = (differenceAst) => {
  const renderProcessor = {
    nested: diffNode => `  ${diffNode.property}: {${render(diffNode.children).split('\n').join('\n    ')}\n    }`,
    unchanged: diffNode => `  ${diffNode.property}: ${stringify(diffNode.initialValue)}`,
    changed: diffNode => [`- ${diffNode.property}: ${stringify(diffNode.initialValue)}`, `+ ${diffNode.property}: ${stringify(diffNode.finalValue)}`],
    removed: diffNode => `- ${diffNode.property}: ${stringify(diffNode.initialValue)}`,
    added: diffNode => `+ ${diffNode.property}: ${stringify(diffNode.finalValue)}`,
  };
  const result = differenceAst.map(diffNode => renderProcessor[diffNode.type](diffNode));
  return `\n  ${_.compact(_.flatten(result)).join('\n  ')}`;
};

export default ast => `{${render(ast)}\n}`;
