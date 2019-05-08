import fs from 'fs';
import genDiff from '..';

const json1 = fs.readFileSync('./__tests__/__fixtures__/firstConf.json');
const json2 = fs.readFileSync('./__tests__/__fixtures__/secondConf.json');

const result = `{
  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('genDiff test 1', () => {
  expect(genDiff(json1, json2)).toBe(result);
});
