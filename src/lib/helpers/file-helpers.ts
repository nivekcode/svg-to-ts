import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier/standalone';
import typescriptParser from 'prettier/parser-typescript';

const readfile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const extractSvgContent = async (filePath: string): Promise<string> => {
  const fileContentRaw = await readfile(filePath, 'utf-8');
  return fileContentRaw.replace(/\r?\n|\r/g, ' ');
};

export const writeIconsFile = async (outputDirectory: string, fileName: string, fileContent: string): Promise<void> => {
  const formatedFileContent = formatContent(fileContent);
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  await writeFile(path.join(outputDirectory, `${fileName}.ts`), formatedFileContent);
};

export const deleteFolder = async (directoryPath: string) => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((filePath: string) => {
      const curPath = directoryPath + '/' + filePath;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

const formatContent = (fileContent: string) =>
  prettier.format(fileContent, {
    parser: 'typescript',
    plugins: [typescriptParser],
    singleQuote: true
  });
