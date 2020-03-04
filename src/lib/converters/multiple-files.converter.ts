import chalk from 'chalk';
import * as path from 'path';
import { svgo } from '../svgo';

import {
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition,
  generateTypeName,
  generateUntypedSvgConstant,
  generateVariableName
} from '../generators/generators';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import { deleteFolder, extractSvgContent, writeIconsFile } from '../helpers/file-helpers';
import { ConvertionOptions } from '../../bin/svg-to-ts';
import { compileSources } from '../compiler/typescript-compiler';

const typesDelimitor = ' | ';

export const convertToMultipleFiles = async (convertionOptions: ConvertionOptions): Promise<void> => {
  const { typeName, prefix, delimiter, interfaceName, outputDirectory, srcFiles, fileName } = convertionOptions;

  try {
    const filePaths = await getFilePathsFromRegex(srcFiles);
    await deleteFolder(`${outputDirectory}/icons`);
    for (let i = 0; i < filePaths.length; i++) {
      const fileNameWithEnding = path.basename(filePaths[i]);
      const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');

      if (extension === 'svg') {
        const rawSvg = await extractSvgContent(filePaths[i]);
        const optimizedSvg = await svgo.optimize(rawSvg);
        const variableName = generateVariableName(prefix, filenameWithoutEnding);
        const typeName = generateTypeName(filenameWithoutEnding, delimiter);
        const svgConstant = generateUntypedSvgConstant(variableName, typeName, optimizedSvg.data);

        await writeIconsFile(`${outputDirectory}/icons`, `${prefix}-${filenameWithoutEnding}.icon`, svgConstant);
      }
    }
    const outputFiles = await getFilePathsFromRegex([`${outputDirectory}/icons/*.ts`]);
    compileSources(outputFiles);

    /*
            if (svgConstants !== '') {
                const fileContent = (svgConstants += types += generateInterfaceDefinition(interfaceName, typeName));
                await writeIconsFile(outputDirectory, fileName, fileContent);
                console.log(
                    chalk.blue.bold('svg-to-ts:'),
                    chalk.green('Icons file successfully generated under'),
                    chalk.green.underline(outputDirectory)
                );
            }
             */
  } catch (error) {
    console.log(chalk.blue.bold('svg-to-ts:'), chalk.red('Something went wrong', error));
  }
};
