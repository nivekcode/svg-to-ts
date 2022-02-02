export const toBoolean = (str: string, defaultValue: boolean): boolean => {
  let result = defaultValue;
  switch (str) {
    case 'false':
      result = false;
      break;
    case '':
    case 'true':
      result = true;
      break;
  }
  return result;
};
