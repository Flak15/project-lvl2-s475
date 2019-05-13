import fs from 'fs';
import genDiff from '..';

const firstFilePath = '__tests__/__fixtures__/firstConf.json';
const secondFilePath = '__tests__/__fixtures__/secondConf.json';
const result = fs.readFileSync('__tests__/__fixtures__/result1', 'utf-8');
const answ = genDiff(firstFilePath, secondFilePath);
console.log(answ);
console.log(result);
test('genDiff test 1', () => {
  expect(answ).toBe(result);
});
