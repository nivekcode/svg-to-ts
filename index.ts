import {convert, ConvertionOptions} from './src/convert';

const options: ConvertionOptions = {
    typeName: 'sampleIcons',
    prefix: 'sampleIcons',
    interfaceName: 'SampleIcon',
    srcDirectory: './inputfiles',
    outputDirectory: './dist'
};

convert(options);
