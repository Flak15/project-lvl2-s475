import program from 'commander';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';

export default (firstFilePath, secondFilePath) => {
  const firstFileExtension = path.extname(firstFilePath);
  const secondFileExtension = path.extname(secondFilePath);
  const firstDataObject = parse(fs.readFileSync(firstFilePath, 'utf-8'), firstFileExtension);
  const secondDataObject = parse(fs.readFileSync(secondFilePath, 'utf-8'), secondFileExtension);
  const mergedKeys = _.union(_.keys(firstDataObject), _.keys(secondDataObject));
  const difference = mergedKeys.reduce((acc, key) => {
    if (firstDataObject[key] === secondDataObject[key]) return `${acc}  ${key}: ${firstDataObject[key]}\n`;
    const firstKeyValue = _.has(firstDataObject, key) ? `- ${key}: ${firstDataObject[key]}\n` : '';
    const secondKeyValue = _.has(secondDataObject, key) ? `+ ${key}: ${secondDataObject[key]}\n` : '';
    return acc + firstKeyValue + secondKeyValue;
  }, '');
  return `{\n${difference}}`;
};

export const makeDescription = () => {
  program
    .description('Compare two configuration files and show a difference')
    .usage('[options] <firstConfig> <secondConfig>')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format');
  return program;
};
