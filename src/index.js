import program from 'commander';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import genDifferenceAst from './genDiffAst'; // (object, object)
import render from './render'; // (AST)

export default (firstFilePath, secondFilePath) => {
  const firstFileExtension = path.extname(firstFilePath);
  const secondFileExtension = path.extname(secondFilePath);
  const firstDataObject = parse(fs.readFileSync(firstFilePath, 'utf-8'), firstFileExtension);
  const secondDataObject = parse(fs.readFileSync(secondFilePath, 'utf-8'), secondFileExtension);
  const differenceAst = genDifferenceAst(firstDataObject, secondDataObject);
  return render(differenceAst);
};

export const makeDescription = () => {
  program
    .description('Compare two configuration files and show a difference')
    .usage('[options] <firstConfig> <secondConfig>')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format');
  return program;
};
