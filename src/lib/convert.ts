import { svgo } from './svgo';
import { getInterfaceDefinition, getSvgConstant, getTypeDefinition } from './definitions';
import camelCase from 'lodash.camelcase';
import * as prettier from 'prettier/standalone';
import chalk from 'chalk';
import typescriptParser from 'prettier/parser-typescript';

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
  srcDirectory: string;
  outputDirectory: string;
}

export const convert = async (convertionOptions: ConvertionOptions): Promise<void> => {
  let svgConstants = '';
  const directoryPath = path.join(convertionOptions.srcDirectory);
  let types = getTypeDefinition(convertionOptions.typeName);

  try {
    const files = await readdir(directoryPath);
    for (let i = 0; i < files.length; i++) {
      const fileNameWithEnding = files[i];
      const filenameWithoutEnding = fileNameWithEnding.split('.')[0];
      const rawSvg = await extractSvgContent(fileNameWithEnding, directoryPath);
      const optimizedSvg = await svgo.optimize(rawSvg);
      const variableName = getVariableName(convertionOptions, filenameWithoutEnding);
      i === files.length - 1 ? (types += `'${filenameWithoutEnding}';`) : (types += `'${filenameWithoutEnding}' | `);
      svgConstants += getSvgConstant(
        variableName,
        convertionOptions.interfaceName,
        filenameWithoutEnding,
        optimizedSvg.data
      );
    }
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
