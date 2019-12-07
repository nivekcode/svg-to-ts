import { svgo } from './svgo';
import {
  getInterfaceDefinition,
  getSvgConstant,
  getTypeDefinition
} from './definitions';
import camelCase from 'lodash.camelcase';
import * as prettier from 'prettier/standalone';
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
  interfaceName: string;
  srcDirectory: string;
  outputDirectory: string;
}

function getVariableName(
  convertionOptions: ConvertionOptions,
  filenameWithoutEnding
) {
  const fileNameUpperCase =
    filenameWithoutEnding[0].toUpperCase() + filenameWithoutEnding.slice(1);
  return `${convertionOptions.prefix}${camelCase(fileNameUpperCase)}`;
}

export const convert = async (convertionOptions: ConvertionOptions) => {
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
      const variableName = getVariableName(
        convertionOptions,
        filenameWithoutEnding
      );
      i === files.length - 1
        ? (types += `'${filenameWithoutEnding}';`)
        : (types += `'${filenameWithoutEnding}' | `);
      svgConstants += getSvgConstant(
        variableName,
        convertionOptions,
        filenameWithoutEnding,
        optimizedSvg
      );
    }
    const fileContent = generateFileContent(
      svgConstants,
      types,
      convertionOptions
    );
    await writeIconsFile(convertionOptions, fileContent);
  } catch (error) {
    console.error('Error', error);
  }
};

function generateFileContent(
  svgContstants: string,
  types: string,
  convertionOptions: ConvertionOptions
): string {
  const fileContent = (svgContstants += types += getInterfaceDefinition(
    convertionOptions.interfaceName,
    convertionOptions.typeName
  ));
  return prettier.format(fileContent, {
    parser: 'typescript',
    plugins: [typescriptParser]
  });
}

async function writeIconsFile(
  convertionOptions: ConvertionOptions,
  fileContent: string
) {
  if (!fs.existsSync(convertionOptions.outputDirectory)) {
    fs.mkdirSync(convertionOptions.outputDirectory);
  }
  await writeFile(
    path.join(convertionOptions.outputDirectory, 'icons.ts'),
    fileContent
  );
}

const extractSvgContent = async (
  fileName: string,
  directoryPath: string
): Promise<string> => {
  const fileContentRaw = await readfile(
    path.join(directoryPath, fileName),
    'utf-8'
  );
  return fileContentRaw.replace(/\r?\n|\r/g, ' ');
};
