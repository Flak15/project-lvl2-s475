import yaml from 'js-yaml';
import ini from 'ini';

const parsersSwitch = {
  json: data => JSON.parse(data),
  yaml: data => yaml.safeLoad(data),
  ini: data => ini.parse(data),
}

export default (data, extension) => {
  if (extension === '.json') {
    return parsersSwitch.json(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return parsersSwitch.yaml(data);
  }
  if (extension === '.ini') {
    return parsersSwitch.ini(data);
  }
  throw new Error('Unknown format');
};
