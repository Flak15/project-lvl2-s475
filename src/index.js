import fs from 'fs';
import path from 'path';
import parse from './parsers';
import genDifferenceAst from './genDiffAst';
import render from './formatters/';

export default (firstFilePath, secondFilePath, format) => {
  const firstFileExtension = path.extname(firstFilePath);
  const secondFileExtension = path.extname(secondFilePath);
  const firstDataObject = parse(fs.readFileSync(firstFilePath, 'utf-8'), firstFileExtension);
  const secondDataObject = parse(fs.readFileSync(secondFilePath, 'utf-8'), secondFileExtension);
  const differenceAst = genDifferenceAst(firstDataObject, secondDataObject);
  return render(differenceAst, format);
};
