import _ from 'lodash';
/*
export default (value) => {
  if (_.isArray(value)) {
    return `[\n      ${value.join(',\n      ')}\n    ]`;
  }
  if (_.isPlainObject(value)) {
    return `{
        ${Object.keys(value).map(key => `${key}: ${value[key]}\n`).join('      ')}    }`;
  }
  return value;
};
*/
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
export default stringify;
