#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

genDiff().parse(process.argv);
