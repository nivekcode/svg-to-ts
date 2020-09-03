import { generateCompleteIconSetContent } from './complete-icon-set.helper';
import { unformatedString } from './test-helpers';

describe('Complete icon set helper', () => {
  it('should import all the values and export them as an array', () => {
    const fileNamesWithDefinitions = [
      { variableName: 'foo', prefix: 'sampleIcon', filenameWithoutEnding: 'foo' },
      { variableName: 'bar', prefix: 'sampleIcon', filenameWithoutEnding: 'bar' },
      { variableName: 'baz', prefix: 'sampleIcon', filenameWithoutEnding: 'baz' }
    ] as any;
    const expectedContent = `
    import {foo} from './foo.icon';
    import {bar} from './bar.icon';
    import {baz} from './baz.icon';
            
    export const completeIconSet = [foo, bar, baz];`;

    const generatedContent = generateCompleteIconSetContent(fileNamesWithDefinitions);
    expect(unformatedString(expectedContent)).toEqual(unformatedString(generatedContent));
  });
});
