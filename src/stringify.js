import _ from 'lodash';

export default (value) => {
  if (_.isArray(value)) {
    return `[\n\t${value.join(',\n\t')}\n  ]`;
  }
  if (_.isPlainObject(value)) {
    return `{
      ${Object.keys(value).map(key => `${key}: ${value[key]}\n`).join('\t')}  }`;
  }
  return value;
};
