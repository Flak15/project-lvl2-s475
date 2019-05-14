import _ from 'lodash';

export default (value) => {
  if (_.isString(value)) {
    return value;
  }
  if (_.isArray(value)) {
    return `[\n\t${value.join(',\n\t')}\n  ]`;
  }
  return `{
\t${Object.keys(value).map(key => `${key}: ${value[key]}\n`).join('\t')}  }`;
};
