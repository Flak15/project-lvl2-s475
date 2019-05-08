import genDiff from '..';

const json1 = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;

const json2 = `{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}`;

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
