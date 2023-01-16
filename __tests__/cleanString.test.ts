import { cleanString } from '../src/utils/cleanString';

test('cleanString removes non-alphabetic and non-accented characters', () => {
  const input = 'Hello World! 123 àèìòù';
  const expectedOutput = 'HelloWorldàèìòù';

  expect(cleanString(input)).toBe(expectedOutput);
});
