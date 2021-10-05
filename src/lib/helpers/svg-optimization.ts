const { loadConfig } = require('svgo');

export const getSvgoConfig = async (svgoConfig: any): Promise<string> => svgoConfig || (await loadConfig());
