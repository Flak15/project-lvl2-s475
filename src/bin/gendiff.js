#!/usr/bin/env node
import genDiff, { makeDescription } from '..';


makeDescription().parse(process.argv);
const [firstFilePath, secondFilePath] = makeDescription().args;

console.log(genDiff(firstFilePath, secondFilePath, makeDescription().format));
