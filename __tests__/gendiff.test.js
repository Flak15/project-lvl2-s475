import _ from 'lodash';
import fs from 'fs';
import genDiff from '..';


const firstJSONPath = '__tests__/__fixtures__/firstConf.json';
const secondJSONPath = '__tests__/__fixtures__/secondConf.json';
const firstYAMLPath = '__tests__/__fixtures__/firstYAML.yml';
const secondYAMLPath = '__tests__/__fixtures__/secondYAML.yaml';
const firstINIPath = '__tests__/__fixtures__/firstINI.ini';
const secondINIPath = '__tests__/__fixtures__/secondINI.ini';
const result = _.trim(fs.readFileSync('__tests__/__fixtures__/result', 'utf-8'));
const deepDiffResult = _.trim(fs.readFileSync('__tests__/__fixtures__/deepResult', 'utf-8'));
test('JSON test', () => {
  expect(genDiff(firstJSONPath, secondJSONPath)).toBe(result);
});
test('YAML test', () => {
  expect(genDiff(firstYAMLPath, secondYAMLPath)).toBe(result);
});
test('INI test', () => {
  expect(genDiff(firstINIPath, secondINIPath)).toBe(result);
});
test('Deep differense JSON test', () => {
  expect(genDiff('__tests__/__fixtures__/firstDeepJson.json', '__tests__/__fixtures__/secondDeepJson.json')).toBe(deepDiffResult);
});
