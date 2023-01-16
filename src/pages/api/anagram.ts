// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';

const dictionary = require('../../utils/common-words.json');
const { wordFinder } = require('../../utils/wordFinder');

interface Solution {
  [key: number]: string[];
}

/**
 * Handles the API endpoint for finding all valid words that can be formed using the given letters
 * @param req - request object
 * @param res - response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Solution>
) {
  const inputStr: any = req.query.str;

  if (inputStr?.length >= 3) {
    console.log('searching: ', inputStr);
    
    const result = await wordFinder(inputStr, dictionary);
    const solution: Solution = result.reduce((acc: any, cur: string) => {
      const { length } = cur;
      if (!acc[length]) {
        acc[length] = [];
      }
      acc[length].push(cur);
      return acc;
    }, {});

    return res.status(200).json(solution);
  } else if (inputStr?.length < 3) {
    return res.status(500);
  }

  return res.status(500);
}
