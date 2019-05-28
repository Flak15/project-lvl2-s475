import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import genDiff from '..';
import path from 'path';

const getFullFilePath = name => path.join(__dirname, '__fixtures__', name);

const getResultStringFromFile = fileName => _.trim(fs.readFileSync(getFullFilePath(fileName), 'utf-8'));

test('JSON test', () => {
  const result = getResultStringFromFile('result');
  expect(genDiff(getFullFilePath('firstConf.json'), getFullFilePath('secondConf.json'))).toBe(result);
});
test('YAML test', () => {
  const result = getResultStringFromFile('result');
  expect(genDiff(getFullFilePath('firstYAML.yml'), getFullFilePath('secondYAML.yaml'))).toBe(result);
});
test('INI test', () => {
  const result = getResultStringFromFile('result');
  expect(genDiff(getFullFilePath('firstINI.ini'), getFullFilePath('secondINI.ini'))).toBe(result);
});
test('Deep differense JSON test', () => {
  const deepDiffResult = getResultStringFromFile('deepResult');
  expect(genDiff(getFullFilePath('firstDeepJson.json'), getFullFilePath('secondDeepJson.json'))).toBe(deepDiffResult);
});
test('Plain format test', () => {
  const plainFormatResult = getResultStringFromFile('plainFormatResult');
  expect(genDiff(getFullFilePath('firstDeepJson.json'), getFullFilePath('secondDeepJson.json'), 'plain')).toBe(plainFormatResult);
});
test('JSON format test', () => {
  const jsonFormatResult = getResultStringFromFile('jsonFormatResult');
  expect(genDiff(getFullFilePath('firstDeepJson.json'), getFullFilePath('secondDeepJson.json'), 'json')).toBe(jsonFormatResult);
});
