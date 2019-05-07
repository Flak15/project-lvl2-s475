import program from 'commander';
import fs from 'fs';
import _ from 'lodash';

export default (firstConfig, secondConfig) => {
  program
  .description('Compare two configuration files and show a difference')
  .usage('[options] <firstConfig> <secondConfig>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format');

  const generateJSONdifference = (firstConfig, secondConfig) => {
    const beforeJSON = JSON.parse(firstConfig);
    const afterJSON = JSON.parse(secondConfig);
    const mergedKeys = _.union(_.keys(beforeJSON), _.keys(afterJSON));
    const differenceJSON = mergedKeys.reduce( (acc, key) => {
      const beforeJSONkeyValue = beforeJSON.hasOwnProperty(key) ? `- ${key}: ${beforeJSON[key]}\n` : '';
      const afterJSONkeyValue = afterJSON.hasOwnProperty(key) ? `+ ${key}: ${afterJSON[key]}\n` : '';
      if (beforeJSON[key] === afterJSON[key]) return `${acc}  ${key}: ${beforeJSON[key]}\n`
      else return acc + beforeJSONkeyValue + afterJSONkeyValue;
    }, '');
    return `{\n${differenceJSON}}`;
  }
  return generateJSONdifference(firstConfig, secondConfig);
}
