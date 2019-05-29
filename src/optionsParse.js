import program from 'commander';
import genDiff from '.';

export default () => {
  program
    .description('Compare two configuration files and show a difference')
    .usage('[options] <firstConfig> <secondConfig>')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format')
    .action((firstConfig, secondConfig, options) => {
      console.log(genDiff(firstConfig, secondConfig, options.format));
    });
  return program;
};
