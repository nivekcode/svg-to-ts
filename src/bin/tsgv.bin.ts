#!/usr/bin/env node
import * as packgeJSON from '../../package.json';
import commander from 'commander';
import {convert} from '../lib/convert';

commander
    .version(packgeJSON.version)
    .option('-t --typeName <string>', 'name of the generated type')
    .option('-p --prefix <string>', 'prefix for the generated svg constants')
    .option('-i --interfaceName <string>', 'name for the generated interface')
    .option('-s --srcDirectory <string>', 'name of the source directory', '.')
    .option('-o --outputDirectory <string>', 'name of the output directory', './dist')
    .parse(process.argv);

const {typeName, prefix, interfaceName, srcDirectory, outputDirectory} = commander;
const convertionOptions = {typeName, prefix, interfaceName, srcDirectory, outputDirectory};

convert(convertionOptions);
