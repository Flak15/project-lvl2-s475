import yaml from 'js-yaml';
import ini from 'ini';

const parsersSwitch = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, extension) => {
  if (extension === '.json') {
    return parsersSwitch.json(data);
  }
  if (extension === '.yaml') {
    return parsersSwitch.yaml(data);
  }
  if (extension === '.yml') {
    return parsersSwitch.yaml(data);
  }
  if (extension === '.ini') {
    return parsersSwitch.ini(data);
  }
  throw new Error('Unknown format');
};
