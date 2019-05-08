import program from 'commander';
//  import fs from 'fs';
import _ from 'lodash';

export default (firstConfig, secondConfig) => {
  program
    .description('Compare two configuration files and show a difference')
    .usage('[options] <firstConfig> <secondConfig>')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format');

  const generateJSONdifference = (firstJSON, secondJSON) => {
    const beforeJSON = JSON.parse(firstJSON);
    const afterJSON = JSON.parse(secondJSON);
    const mergedKeys = _.union(_.keys(beforeJSON), _.keys(afterJSON));
    const differenceJSON = mergedKeys.reduce((acc, key) => {
      const beforeJSONkeyValue = _.has(beforeJSON, key) ? `- ${key}: ${beforeJSON[key]}\n` : '';
      const afterJSONkeyValue = _.has(afterJSON, key) ? `+ ${key}: ${afterJSON[key]}\n` : '';
      if (beforeJSON[key] === afterJSON[key]) return `${acc}  ${key}: ${beforeJSON[key]}\n`;
      return acc + beforeJSONkeyValue + afterJSONkeyValue;
    }, '');
    return `{\n${differenceJSON}}`;
  };
  return generateJSONdifference(firstConfig, secondConfig);
};
