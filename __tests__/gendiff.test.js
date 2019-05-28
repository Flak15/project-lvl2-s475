import _ from 'lodash';
import fs from 'fs';
import genDiff from '..';
import path from 'path';

const fixuturesPath = path.join(__dirname, '__fixtures__');
console.log(fixuturesPath);
const result = _.trim(fs.readFileSync('__tests__/__fixtures__/result', 'utf-8'));
const deepDiffResult = _.trim(fs.readFileSync('__tests__/__fixtures__/deepResult', 'utf-8'));
const plainFormatResult = _.trim(fs.readFileSync('__tests__/__fixtures__/plainFormatResult', 'utf-8'));
const jsonFormatResult = _.trim(fs.readFileSync('__tests__/__fixtures__/jsonFormatResult', 'utf-8'));
test('JSON test', () => {
  expect(genDiff('__tests__/__fixtures__/firstConf.json', '__tests__/__fixtures__/secondConf.json')).toBe(result);
});
test('YAML test', () => {
  expect(genDiff('__tests__/__fixtures__/firstYAML.yml', '__tests__/__fixtures__/secondYAML.yaml')).toBe(result);
});
test('INI test', () => {
  expect(genDiff('__tests__/__fixtures__/firstINI.ini', '__tests__/__fixtures__/secondINI.ini')).toBe(result);
});
test('Deep differense JSON test', () => {
  expect(genDiff('__tests__/__fixtures__/firstDeepJson.json', '__tests__/__fixtures__/secondDeepJson.json')).toBe(deepDiffResult);
});
test('Plain format test', () => {
  expect(genDiff('__tests__/__fixtures__/firstDeepJson.json', '__tests__/__fixtures__/secondDeepJson.json', 'plain')).toBe(plainFormatResult);
});
test('JSON format test', () => {
  expect(genDiff('__tests__/__fixtures__/firstDeepJson.json', '__tests__/__fixtures__/secondDeepJson.json', 'json')).toBe(jsonFormatResult);
});
