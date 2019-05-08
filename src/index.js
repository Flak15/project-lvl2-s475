import program from 'commander';
import fs from 'fs';
import _ from 'lodash';

export default (firstFilePath, secondFilePath) => {
  const firstJSON = JSON.parse(fs.readFileSync(firstFilePath));
  const secondJSON = JSON.parse(fs.readFileSync(secondFilePath));
  const mergedKeys = _.union(_.keys(firstJSON), _.keys(secondJSON));
  const differenceJSON = mergedKeys.reduce((acc, key) => {
    const firstJSONkeyValue = _.has(firstJSON, key) ? `- ${key}: ${firstJSON[key]}\n` : '';
    const secondJSONkeyValue = _.has(secondJSON, key) ? `+ ${key}: ${secondJSON[key]}\n` : '';
    if (firstJSON[key] === secondJSON[key]) return `${acc}  ${key}: ${firstJSON[key]}\n`;
    return acc + firstJSONkeyValue + secondJSONkeyValue;
  }, '');
  return `{\n${differenceJSON}}`;
};

export const makeDescription = () => {
  program
    .description('Compare two configuration files and show a difference')
    .usage('[options] <firstConfig> <secondConfig>')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format');
  return program;
};
