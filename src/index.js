import fs from 'fs';
import path from 'path';
import parse from './parsers';
import genDifferenceAst from './genDiffAst';
import render from './formatters/';

const getDataType = ext => ext.slice(1);

export default (firstFilePath, secondFilePath, format) => {
  const firstFileExtension = path.extname(firstFilePath);
  const secondFileExtension = path.extname(secondFilePath);
  const firstDataObject = parse(fs.readFileSync(firstFilePath, 'utf-8'), getDataType(firstFileExtension));
  const secondDataObject = parse(fs.readFileSync(secondFilePath, 'utf-8'), getDataType(secondFileExtension));
  const differenceAst = genDifferenceAst(firstDataObject, secondDataObject);
  return render(differenceAst, format);
};
