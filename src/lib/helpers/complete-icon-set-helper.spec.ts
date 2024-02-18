import { generateCompleteIconSetContent } from './complete-icon-set.helper';
import { unformatedString } from './test-helpers';

describe('Complete Iconset-helper', () => {
  it('should import all the values and export them as an array', () => {
    let completeIconSetName = 'all-icons';
    const fileNamesWithDefinitions = [
      { variableName: 'foo', prefix: 'sampleIcon', filenameWithoutEnding: 'foo' },
      { variableName: 'bar', prefix: 'sampleIcon', filenameWithoutEnding: 'bar' },
      { variableName: 'baz', prefix: 'sampleIcon', filenameWithoutEnding: 'baz' },
    ] as any;
    const expectedContent = `
    import {foo} from './sampleIcon-foo.icon';
    import {bar} from './sampleIcon-bar.icon';
    import {baz} from './sampleIcon-baz.icon';
            
    export const allIcons = [foo, bar, baz];`;

    const generatedContent = generateCompleteIconSetContent(fileNamesWithDefinitions, completeIconSetName);
    expect(unformatedString(expectedContent)).toEqual(unformatedString(generatedContent));
  });
  it('should add interface when specified', () => {
    let completeIconSetName = 'all-icons';
    const fileNamesWithDefinitions = [
      { variableName: 'foo', prefix: 'sampleIcon', filenameWithoutEnding: 'foo' },
      { variableName: 'bar', prefix: 'sampleIcon', filenameWithoutEnding: 'bar' },
      { variableName: 'baz', prefix: 'sampleIcon', filenameWithoutEnding: 'baz' },
    ] as any;
    const expectedContent = `
    import {MyIcon} from './my-icons';
    import {foo} from './sampleIcon-foo.icon';
    import {bar} from './sampleIcon-bar.icon';
    import {baz} from './sampleIcon-baz.icon';
            
    export const allIcons:MyIcon[] = [foo as MyIcon, bar as MyIcon, baz as MyIcon];`;

    const generatedContent = generateCompleteIconSetContent(
      fileNamesWithDefinitions,
      completeIconSetName,
      'MyIcon',
      'my-icons',
      true,
    );
    expect(unformatedString(expectedContent)).toEqual(unformatedString(generatedContent));
  });
  it('should not add interface when generateType is false', () => {
    let completeIconSetName = 'all-icons';
    const fileNamesWithDefinitions = [
      { variableName: 'foo', prefix: 'sampleIcon', filenameWithoutEnding: 'foo' },
      { variableName: 'bar', prefix: 'sampleIcon', filenameWithoutEnding: 'bar' },
      { variableName: 'baz', prefix: 'sampleIcon', filenameWithoutEnding: 'baz' },
    ] as any;
    const expectedContent = `
    import {foo} from './sampleIcon-foo.icon';
    import {bar} from './sampleIcon-bar.icon';
    import {baz} from './sampleIcon-baz.icon';
            
    export const allIcons = [foo, bar, baz];`;

    const generatedContent = generateCompleteIconSetContent(
      fileNamesWithDefinitions,
      completeIconSetName,
      'MyIcon',
      'my-icons',
      false,
    );
    expect(unformatedString(expectedContent)).toEqual(unformatedString(generatedContent));
  });
});
