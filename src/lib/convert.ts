import { svgo } from './svgo';
import { getInterfaceDefinition, getSvgConstant, getTypeDefinition } from './definitions';
import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
import * as prettier from 'prettier/standalone';
import chalk from 'chalk';
import typescriptParser from 'prettier/parser-typescript';
import { Dirent } from 'fs';

const util = require('util');
const path = require('path');
const fs = require('fs');

const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export interface ConvertionOptions {
  typeName: string;
  prefix: string;
  fileName: string;
  interfaceName: string;
  srcDirectories: string[];
  outputDirectory: string;
}

export const convert = async (convertionOptions: ConvertionOptions): Promise<void> => {
  let svgConstants = '';

  let types = getTypeDefinition(convertionOptions.typeName);

  try {
    const srcDirectories = convertionOptions.srcDirectories;
    const typesDelimitor = ' | ';
    let files: Dirent[] = [];
    let filesDirectoryPath = {};
    for (let i = 0; i < srcDirectories.length; i++) {
      const directoryPath: string = path.join(srcDirectories[i]);
      const directoryContent: Dirent[] = await readdir(directoryPath, { withFileTypes: true });

      files.push(...directoryContent);
      directoryContent.forEach(file => {
        filesDirectoryPath[file.name] = directoryPath;
      });
    }

    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        const fileNameWithEnding = files[i].name;
        const filenameWithoutEnding = fileNameWithEnding.split('.')[0];
        const directoryPath = filesDirectoryPath[fileNameWithEnding];
        const rawSvg = await extractSvgContent(fileNameWithEnding, directoryPath);
        const optimizedSvg = await svgo.optimize(rawSvg);
        const variableName = getVariableName(convertionOptions, filenameWithoutEnding);
        types += `'${snakeCase(filenameWithoutEnding)}'${typesDelimitor}`;
        svgConstants += getSvgConstant(
          variableName,
          convertionOptions.interfaceName,
          snakeCase(filenameWithoutEnding),
          optimizedSvg.data
        );
      }
    }
    types = types.substring(0, types.length - typesDelimitor.length) + ';';
    const fileContent = generateFileContent(svgConstants, types, convertionOptions);
    await writeIconsFile(convertionOptions, fileContent);
    console.log(
      chalk.blue.bold('svg-to-ts:'),
      chalk.green('Icons file successfully generated under'),
      chalk.green.underline(convertionOptions.outputDirectory)
    );
  } catch (error) {
    console.log(chalk.blue.bold('svg-to-ts:'), chalk.red('Something went wrong', error));
  }
};

const generateFileContent = (svgContstants: string, types: string, convertionOptions: ConvertionOptions): string => {
  const fileContent = (svgContstants += types += getInterfaceDefinition(
    convertionOptions.interfaceName,
    convertionOptions.typeName
  ));
  return prettier.format(fileContent, {
    parser: 'typescript',
    plugins: [typescriptParser],
    singleQuote: true
  });
};

const writeIconsFile = async (convertionOptions: ConvertionOptions, fileContent: string): Promise<void> => {
  if (!fs.existsSync(convertionOptions.outputDirectory)) {
    fs.mkdirSync(convertionOptions.outputDirectory);
  }
  await writeFile(path.join(convertionOptions.outputDirectory, `${convertionOptions.fileName}.ts`), fileContent);
};

const getVariableName = (convertionOptions: ConvertionOptions, filenameWithoutEnding): string => {
  return `${convertionOptions.prefix}${capitalize(camelCase(filenameWithoutEnding))}`;
};

const extractSvgContent = async (fileName: string, directoryPath: string): Promise<string> => {
  const fileContentRaw = await readfile(path.join(directoryPath, fileName), 'utf-8');
  return fileContentRaw.replace(/\r?\n|\r/g, ' ');
};

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
