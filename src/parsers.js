import yaml from 'js-yaml';

export default (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.safeLoad(file);
  }
  throw new Error('Unknown format');
};
