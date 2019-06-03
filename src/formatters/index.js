import treeFormatRender from './treeFormatter';
import plainFormatRender from './plainFormatter';

const formatters = {
  plain: plainFormatRender,
  json: JSON.stringify,
  tree: treeFormatRender,
};

export default (ast, format = 'tree') => formatters[format](ast);
