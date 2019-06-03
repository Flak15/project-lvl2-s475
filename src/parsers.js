import yaml from 'js-yaml';
import ini from 'ini';

const parsersSwitch = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, dataType) => parsersSwitch[dataType.slice(1)](data);
