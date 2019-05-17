#!/usr/bin/env node
import genDiff, { makeDescription } from '..';


makeDescription().parse(process.argv);
const [firstFilePath, secondFilePath] = makeDescription().args;

if (makeDescription().format === 'plain') {
  console.log('plainRender');
}
console.log(genDiff(firstFilePath, secondFilePath));
