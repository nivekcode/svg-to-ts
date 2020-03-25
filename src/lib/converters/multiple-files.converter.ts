import * as path from 'path';

import {
  generateExportStatement,
  generateInterfaceDefinition,
  generateSvgConstantWithImport,
  generateTypeDefinition,
  generateTypeName,
  generateVariableName
} from '../generators/code-snippet-generators';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import { deleteFiles, deleteFolder, extractSvgContent, writeFile } from '../helpers/file-helpers';
import { info, separatorEnd, separatorStart, success } from '../helpers/log-helper';
import { generateSvgOptimizer } from '../helpers/svg-optimization';
import { MultiFileConvertionOptions } from '../options/convertion-options';
import { compile } from '../compiler/typescript-compiler';

const typesDelimitor = ' | ';

export const convertToMultipleFiles = async (convertionOptions: MultiFileConvertionOptions): Promise<void> => {
  const {
    typeName,
    interfaceName,
    prefix,
    delimiter,
    outputDirectory,
    srcFiles,
    modelFileName,
    additionalModelOutputPath,
    iconsFolderName,
    svgoConfig,
    compileSources
  } = convertionOptions;
  const svgOptimizer = generateSvgOptimizer(svgoConfig);

  let indexFileContent = '';
  let types = generateTypeDefinition(typeName);

  try {
    const filePaths = await getFilePathsFromRegex(srcFiles);
    await deleteFolder(`${outputDirectory}/${iconsFolderName}`);
    info(`deleting output directory: ${outputDirectory}/${iconsFolderName}`);

    separatorStart('File optimization');
    for (let i = 0; i < filePaths.length; i++) {
      const fileNameWithEnding = path.basename(filePaths[i]);
      const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');

      if (extension === 'svg') {
        const rawSvg = await extractSvgContent(filePaths[i]);
        info(`optimize svg: ${fileNameWithEnding}`);
        const optimizedSvg = await svgOptimizer.optimize(rawSvg);
        const variableName = generateVariableName(prefix, filenameWithoutEnding);
        const typeName = generateTypeName(filenameWithoutEnding, delimiter);
        const svgConstant = generateSvgConstantWithImport(
          variableName,
          typeName,
          interfaceName,
          modelFileName,
          optimizedSvg.data
        );
        const generatedFileName = `${prefix}-${filenameWithoutEnding}.icon`;
        indexFileContent += generateExportStatement(generatedFileName, iconsFolderName);
        await writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, svgConstant);
        info(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.ts`);
        types += i === filePaths.length - 1 ? `'${typeName}';` : `'${typeName}'${typesDelimitor}`;
      }
    }
    separatorEnd();
    indexFileContent += generateExportStatement(modelFileName, iconsFolderName);
    await writeFile(outputDirectory, 'index', indexFileContent);
    info(`write index.ts`);

    if (modelFileName) {
      const modelFile = (types += generateInterfaceDefinition(interfaceName, typeName));
      await writeFile(`${outputDirectory}/${iconsFolderName}`, modelFileName, modelFile);
      info(`model-file successfully generated under ${outputDirectory}/${iconsFolderName}/${modelFileName}.ts`);

      if (additionalModelOutputPath) {
        await writeFile(`${additionalModelOutputPath}`, modelFileName, modelFile);
        info(`additional model-file successfully generated under ${additionalModelOutputPath}/${modelFileName}.ts`);
      }
    }

    if (compileSources) {
      const generatedTypeScriptFilePaths = await getFilePathsFromRegex([
        `${outputDirectory}/${iconsFolderName}/*.ts`,
        `${outputDirectory}/index.ts`
      ]);
      compile(generatedTypeScriptFilePaths);
      info(`compile Typescript - generate JS and d.ts`);
      deleteFiles(generatedTypeScriptFilePaths);
      info(`delete Typescript files`);
    }

    success('========================================================');
    success(`your files were successfully created under: ${outputDirectory}`);
    success(
      `don't forget to copy this folder to your dist in a post build script - enjoy your tree-shakable icon library 😎`
    );
    success('========================================================');
  } catch (error) {
    error('Something went wrong', error);
  }
};
