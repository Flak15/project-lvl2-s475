import yaml from 'js-yaml';
import ini from 'ini';

export default (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.safeLoad(file);
  }
  if (extension === '.ini') {
    return ini.parse(file);
  }
  throw new Error('Unknown format');
};
