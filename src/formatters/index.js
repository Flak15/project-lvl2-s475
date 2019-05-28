import treeFormatRender from './treeFormatter';
import plainFormatRender from './plainFormatter';
import jsonFormatRender from './jsonFormatter';

export default (ast, format) => {
  if (format === 'plain') {
    return plainFormatRender(ast);
  }
  if (format === 'json') {
    return JSON.stringify(ast);
  }
  return treeFormatRender(ast);
};
