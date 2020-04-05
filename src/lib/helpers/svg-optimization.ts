const svgo = require('svgo');

import { readFile } from './file-helpers';

export const generateSvgOptimizer = config => new svgo(config);

export const getSvgoConfig = async (svgoConfig: any): Promise<string> => {
  if (typeof svgoConfig === 'string') {
    return readFile(svgoConfig);
  }
  return svgoConfig;
};
