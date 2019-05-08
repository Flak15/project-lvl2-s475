import fs from 'fs';
import genDiff from '..';
import _ from 'lodash';

const firstFilePath = '__tests__/__fixtures__/firstConf.json';
const secondFilePath = '__tests__/__fixtures__/secondConf.json';
const result = _.trim(fs.readFileSync('__tests__/__fixtures__/result1', 'utf-8'));
const answ = genDiff(firstFilePath, secondFilePath);
test('genDiff test 1', () => {
  expect(answ).toBe(result);
});
