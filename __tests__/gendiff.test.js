import _ from 'lodash';
import fs from 'fs';
import genDiff from '..';

const result = _.trim(fs.readFileSync('__tests__/__fixtures__/result', 'utf-8'));
const deepDiffResult = _.trim(fs.readFileSync('__tests__/__fixtures__/deepResult', 'utf-8'));
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
