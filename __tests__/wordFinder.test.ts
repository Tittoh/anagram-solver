import { wordFinder } from '../src/utils/wordFinder';

describe('wordFinder', () => {
  const scrabbleWords = ['cat', 'rat', 'bat', 'car', 'arc', 'art', 'tab'];

  test('finds valid words', () => {
    const letters = 'cabatr';
    const expectedWords = ['cat', 'car', 'arc', 'art', 'bat', 'tab', 'rat'];
    expect(wordFinder(letters, scrabbleWords)).toEqual(expectedWords);
  });

  test('returns empty array if no valid words', () => {
    const letters = 'zxy';
    expect(wordFinder(letters, scrabbleWords)).toEqual([]);
  });
});
