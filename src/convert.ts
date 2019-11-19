import {svgo} from './svgo';
import {getInterfaceDefenition} from './interface-def';
import * as camelCase from 'lodash.camelcase';

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

export const convert = async (convertionOptions: ConvertionOptions) => {
    let fileContent = '';
    const directoryPath = path.join(convertionOptions.srcDirectory);
    try {
        const files = await readdir(directoryPath);
        let types = `type ${convertionOptions.typeName} = `;

        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const filenameWithoutEnding = fileName.split('.')[0];
            const rawSvg = await extractSvgContent(fileName, directoryPath);
            const optimizedSvg = await svgo.optimize(rawSvg);

            const fileNameUpperCase = filenameWithoutEnding[0].toUpperCase() + filenameWithoutEnding.slice(1);
            const variableName = `${convertionOptions.prefix}${camelCase(fileNameUpperCase)}`;

            if (i === files.length - 1) {
                types += `'${filenameWithoutEnding}'`;
            } else {
                types += `'${filenameWithoutEnding}' | `;
            }

            fileContent += `export const ${variableName}: ${convertionOptions.interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${optimizedSvg.data}'
            };`;
        }
        fileContent += types += getInterfaceDefenition(convertionOptions.interfaceName);
        if (!fs.existsSync(convertionOptions.outputDirectory)) {
            fs.mkdirSync(convertionOptions.outputDirectory);
        }
        console.log('FileContent', fileContent);
        await writeFile(path.join(convertionOptions.outputDirectory, 'icons.ts'), fileContent);
    } catch (error) {
        console.error('Error', error);
    }
};

const extractSvgContent = async (fileName: string, directoryPath: string): Promise<string> => {
    const fileContentRaw = await readfile(path.join(directoryPath, fileName), 'utf-8');
    return fileContentRaw.replace(/\r?\n|\r/g, " ");
};
