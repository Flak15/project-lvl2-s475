#!/usr/bin/env node

import program from 'commander';

program
  .description('Compare two configuration files and show a difference')
  .usage('[options] <firstConfig> <secondConfig>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
