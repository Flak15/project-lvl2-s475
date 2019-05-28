#!/usr/bin/env node
import genDiff from '..';
import makeDescription from '../optionsParse';

makeDescription().parse(process.argv);
const [firstFilePath, secondFilePath] = makeDescription().args;

console.log(genDiff(firstFilePath, secondFilePath, makeDescription().format));
