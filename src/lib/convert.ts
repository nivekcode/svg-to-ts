import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
import kebapCase from 'lodash.kebabcase';
import * as prettier from 'prettier/standalone';
import chalk from 'chalk';
import typescriptParser from 'prettier/parser-typescript';
import { Glob } from 'glob';
import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';

import { svgo } from './svgo';
import { getInterfaceDefinition, getSvgConstant, getTypeDefinition } from './definitions';

const readfile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const getFilesFromRegex = util.promisify(Glob);

export interface ConvertionOptions {
  delimiter: Delimiter;
  typeName: string;
  prefix: string;
  fileName: string;
  interfaceName: string;
  srcFiles: string[];
  outputDirectory: string;
}

export enum Delimiter {
  CAMEL = 'CAMEL',
  KEBAB = 'KEBAB',
  SNAKE = 'SNAKE'
}

export const convert = async (convertionOptions: ConvertionOptions): Promise<void> => {
  let svgConstants = '';
  let types = getTypeDefinition(convertionOptions.typeName);

  try {
    const typesDelimitor = ' | ';
    const srcFilesRegexExpressions = convertionOptions.srcFiles;
    const filePaths: string[] = [];

    for (const regex of srcFilesRegexExpressions) {
      const directoryFiles = await getFilesFromRegex(regex, {
        nodir: true
      });
      if (directoryFiles.length === 0) {
        console.log(chalk.blue.bold('svg-to-ts:'), chalk.yellow(`No matching files for regex: "${regex}"`));
      } else {
        filePaths.push(...directoryFiles);
      }
    }

    for (let i = 0; i < filePaths.length; i++) {
      const fileNameWithEnding = path.basename(filePaths[i]);
      const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');

      if (extension === 'svg') {
        const rawSvg = await extractSvgContent(filePaths[i]);
        const optimizedSvg = await svgo.optimize(rawSvg);
        const variableName = getVariableName(convertionOptions, filenameWithoutEnding);
        const typeName = getTypeName(filenameWithoutEnding, convertionOptions.delimiter);
        types += `'${typeName}'${typesDelimitor}`;
        svgConstants += getSvgConstant(variableName, convertionOptions.interfaceName, typeName, optimizedSvg.data);
      }
    }

    if (svgConstants !== '') {
      types = types.substring(0, types.length - typesDelimitor.length) + ';';
      const fileContent = generateFileContent(svgConstants, types, convertionOptions);
      await writeIconsFile(convertionOptions, fileContent);
      console.log(
        chalk.blue.bold('svg-to-ts:'),
        chalk.green('Icons file successfully generated under'),
        chalk.green.underline(convertionOptions.outputDirectory)
      );
    }
  } catch (error) {
    console.log(chalk.blue.bold('svg-to-ts:'), chalk.red('Something went wrong', error));
  }
};

const getTypeName = (filenameWithoutEnding, delimiter: Delimiter): string => {
  if (delimiter === Delimiter.CAMEL) {
    return `${camelCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.KEBAB) {
    return `${kebapCase(filenameWithoutEnding)}`;
  }
  return `${snakeCase(filenameWithoutEnding)}`;
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

const extractSvgContent = async (filePath: string): Promise<string> => {
  const fileContentRaw = await readfile(filePath, 'utf-8');
  return fileContentRaw.replace(/\r?\n|\r/g, ' ');
};

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
