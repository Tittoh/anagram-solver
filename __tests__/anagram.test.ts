/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next';

import anagram from '../src/pages/api/anagram';
import { wordFinder } from '../src/utils/wordFinder';

const dictionary = require('../src/utils/common-words.json');

const mockRequest = (str = 'cabatr'): NextApiRequest => {
  return {
    query: {
      str,
    },
  } as unknown as NextApiRequest;
};
const mockEmptyRequest = (): NextApiRequest => {
  return {
    query: {},
  } as unknown as NextApiRequest;
};

const mockResponse = (): NextApiResponse => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;
};

describe('anagram-solved', () => {
  test('returns valid words grouped by length', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const expectedWords = wordFinder(String(req.query.str), dictionary);
    const expectedSolution = expectedWords.reduce((acc: any, cur) => {
      const { length } = cur;
      if (!acc[length]) {
        acc[length] = [];
      }
      acc[length].push(cur);
      return acc;
    }, {});
    await anagram(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedSolution);
  });

  test('returns 500 if str is not provided', async () => {
    const req = mockEmptyRequest();
    const res = mockResponse();
    await anagram(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
