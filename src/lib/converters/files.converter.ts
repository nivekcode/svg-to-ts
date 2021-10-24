import { compile } from '../compiler/typescript-compiler';

import {
  generateEnumDefinition,
  generateExportStatement,
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition,
  generateTypeHelperWithImport
} from '../generators/code-snippet-generators';

import { generateCompleteIconSetContent } from '../helpers/complete-icon-set.helper';
import { deleteFiles, deleteFolder, writeFile } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { callAndMonitor, callAndMonitorAsync } from '../helpers/monitor';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import { FileConversionOptions } from '../options/conversion-options';
import { filesProcessor, SvgDefinition } from './shared.converter';

const completeIconSetFileName = 'complete-icon-set';

const generateSVGConstants = async (
  svgDefinitions: SvgDefinition[],
  outputDirectory: string,
  iconsFolderName: string
): Promise<string[]> => {
  const generatedFileNames: string[] = [];
  await Promise.all(
    svgDefinitions.map(async svgDefinition => {
      const svgConstant = generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data);
      const generatedFileName = `${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`;
      generatedFileNames.push(generatedFileName);
      await writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, svgConstant);
      Logger.verboseInfo(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.ts`);
    })
  );
  return generatedFileNames;
};

const generateCompleteIconSet = async (
  svgDefinitions: SvgDefinition[],
  outputDirectory: string,
  iconsFolderName: string
): Promise<void> => {
  const completeIconSetContent = generateCompleteIconSetContent(svgDefinitions);
  await writeFile(`${outputDirectory}/${iconsFolderName}`, completeIconSetFileName, completeIconSetContent);
};

const generateModelFile = async (
  conversionOptions: FileConversionOptions,
  svgDefinitions: SvgDefinition[]
): Promise<string> => {
  const { outputDirectory, modelFileName, additionalModelOutputPath, iconsFolderName } = conversionOptions;

  const typeDefinition = generateTypeDefinition(conversionOptions, svgDefinitions);
  const enumDefinition = generateEnumDefinition(conversionOptions, svgDefinitions);
  const interfaceDefinition = generateInterfaceDefinition(conversionOptions);
  const modelFile = `${typeDefinition}${interfaceDefinition}${enumDefinition}`;
  await writeFile(`${outputDirectory}/${iconsFolderName}`, modelFileName, modelFile);
  Logger.verboseInfo(
    `model-file successfully generated under ${outputDirectory}/${iconsFolderName}/${modelFileName}.ts`
  );

  if (additionalModelOutputPath) {
    await writeFile(`${additionalModelOutputPath}`, modelFileName, modelFile);
    Logger.verboseInfo(
      `additional model-file successfully generated under ${additionalModelOutputPath}/${modelFileName}.ts`
    );
  }
  return modelFile;
};

const compileTypeScriptToJS = async (
  outputDirectory: string,
  iconsFolderName: string,
  barrelFileName: string
): Promise<void> => {
  const generatedTypeScriptFilePaths = await getFilePathsFromRegex([
    `${outputDirectory}/${iconsFolderName}/*.ts`,
    `${outputDirectory}/${barrelFileName}.ts`
  ]);
  compile(generatedTypeScriptFilePaths);
  deleteFiles(generatedTypeScriptFilePaths);
};

export const convertToFiles = async (conversionOptions: FileConversionOptions): Promise<void> => {
  const {
    outputDirectory,
    modelFileName,
    additionalModelOutputPath,
    iconsFolderName,
    interfaceName,
    compileSources,
    exportCompleteIconSet,
    barrelFileName
  } = conversionOptions;
  await callAndMonitorAsync<void>(
    deleteFolder.bind({}, `${outputDirectory}/${iconsFolderName}`),
    'Deleting the output folder'
  );
  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );

  const generatedFileNames = await callAndMonitorAsync<string[]>(
    generateSVGConstants.bind({}, svgDefinitions, outputDirectory, iconsFolderName),
    'Generate SVG constants'
  );

  if (exportCompleteIconSet) {
    await callAndMonitorAsync<void>(
      generateCompleteIconSet.bind({}, svgDefinitions, outputDirectory, iconsFolderName),
      'Export complete icon set'
    );
    generatedFileNames.push(completeIconSetFileName);
  }

  let indexFileContent = callAndMonitor<string>(
    generateTypeHelperWithImport.bind({}, interfaceName, iconsFolderName, modelFileName),
    'Generate Type Helper'
  );

  indexFileContent += generatedFileNames
    .map((generatedFileName: string) => generateExportStatement(generatedFileName, iconsFolderName))
    .join('');

  indexFileContent += generateExportStatement(modelFileName, iconsFolderName);
  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, barrelFileName, indexFileContent),
    'Generate barrel file'
  );

  if (modelFileName) {
    const modelFile = await callAndMonitorAsync<void>(
      generateModelFile.bind({}, conversionOptions, svgDefinitions),
      'Generate model file'
    );

    if (additionalModelOutputPath) {
      await callAndMonitorAsync<void>(
        writeFile.bind({}, `${additionalModelOutputPath}`, modelFileName, modelFile),
        'Write model file to additional output path'
      );
    }
  }

  if (compileSources) {
    await callAndMonitorAsync<void>(
      compileTypeScriptToJS.bind({}, outputDirectory, iconsFolderName, barrelFileName),
      'Compile TypeScript to JavaScript'
    );
  }
  Logger.generationSuccess(outputDirectory);
};
