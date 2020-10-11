// import-conductor-skip
import Svgo = require('svgo');

import { readFile } from './file-helpers';

export const generateSvgOptimizer = config => new Svgo(config);

export const getSvgoConfig = async (svgoConfig: any): Promise<string> => {
  if (typeof svgoConfig === 'string') {
    return JSON.parse(await readFile(svgoConfig));
  }
  return svgoConfig;
};
