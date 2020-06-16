import {
  generateExportStatement,
  generateInterfaceDefinition,
  generateSvgConstantWithImport,
  generateTypeDefinition
} from '../generators/code-snippet-generators';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import { deleteFiles, deleteFolder, writeFile } from '../helpers/file-helpers';
import { info, separatorEnd, separatorStart, success } from '../helpers/log-helper';
import { FileConversionOptions } from '../options/conversion-options';
import { compile } from '../compiler/typescript-compiler';
import { filesProcessor } from './shared.converter';

const writeFiles = async (outputDirectory, iconsFolderName, modelFileName, prefix, svgDefinitions) => {
  // Using Promise.all we are making all files be processed in parallel as they have no dependency on each other
  const fileContent = await Promise.all(
    svgDefinitions.map(async svgDefinition => {
      const svgConstant = generateSvgConstantWithImport(
        svgDefinition.variableName,
        svgDefinition.typeName,
        svgDefinition.interfaceName,
        modelFileName,
        svgDefinition.data
      );
      const generatedFileName = `${prefix}-${svgDefinition.filenameWithoutEnding}.icon`;
      await writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, svgConstant);
      info(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.ts`);
      return generateExportStatement(generatedFileName, iconsFolderName);
    })
  );
  return fileContent.join('');
};

export const convertToFiles = async (conversionOptions: FileConversionOptions): Promise<void> => {
  const {
    prefix,
    outputDirectory,
    modelFileName,
    additionalModelOutputPath,
    iconsFolderName,
    compileSources
  } = conversionOptions;

  try {
    await deleteFolder(`${outputDirectory}/${iconsFolderName}`);
    info(`deleting output directory: ${outputDirectory}/${iconsFolderName}`);

    separatorStart('File optimization');
    const svgDefinitions = await filesProcessor(conversionOptions);
    let indexFileContent = await writeFiles(outputDirectory, iconsFolderName, modelFileName, prefix, svgDefinitions);
    separatorEnd();
    indexFileContent += generateExportStatement(modelFileName, iconsFolderName);
    await writeFile(outputDirectory, 'index', indexFileContent);
    info(`write index.ts`);

    if (modelFileName) {
      const typeDefinition = generateTypeDefinition(conversionOptions, svgDefinitions);
      const interfaceDefinition = generateInterfaceDefinition(conversionOptions);
      const modelFile = `${typeDefinition}${interfaceDefinition}`;
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
