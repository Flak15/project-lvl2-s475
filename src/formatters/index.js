import treeFormatRender from './treeFormatter';
import plainFormatRender from './plainFormatter';

const formatterSwitch = {
  plain: plainFormatRender,
  json: JSON.stringify,
  tree: treeFormatRender,
};

export default (ast, format = 'tree') => formatterSwitch[format](ast);
