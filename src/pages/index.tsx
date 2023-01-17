import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';
import Head from 'next/head';

import { cleanString } from '../utils/cleanString';

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<{ [key: string]: string[] | null }>({});
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [responded, setResponded] = useState<boolean>(false);

  // eslint-disable-next-line
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line
    return;
  }, [error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const totalAnagrams = Object.values(result).reduce(
    (total, anagrams: any) => total + anagrams.length,
    0
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // cleanup query string to remove invalid characters.
      const qString = cleanString(inputValue.toLocaleLowerCase());
      if (qString && qString.length >= 3) {
        setLoading(true);
        const res = await fetch(`/api/anagram?str=${qString}`);
        const json = await res.json();
        setResult(json);
        setResponded(res.status === 200);
      } else {
        setError(new Error('Invalid input'));
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Anagram Solver</title>
        <meta name="description" content="Solve Anagrams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen relative pb-20 bg-slate-100 flex flex-col justify-center items-center">
        {/* Search section */}
        <section className="mx-auto max-w-3xl p-4 lg:px-8 ">
          <div className={!responded ? '-mt-16' : 'mt-0'}>
            <div>
              <h1 className="text-4xl py-1 font-bold tracking-tight text-center sm:text-6xl bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                Anagram Solver
              </h1>
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="flex flex-col gap-4"
              >
                <div className="mt-4 flex justify-center">
                  <input
                    autoComplete="off"
                    type="text"
                    name="anagram"
                    id="anagram"
                    data-testid="input-test"
                    className="rounded-md lg:rounded-l-md lg:rounded-r-none border-slate-400 focus:ring-0"
                    placeholder="Your text ..."
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="hidden lg:inline-flex items-center rounded-r-md border border-l-0 border-slate-400 bg-gray-50 py-3 px-3 text-sm text-slate-500 active:text-blue-500 hover:bg-blue-50 hover:text-slate-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  className="mx-auto px-5 lg:hidden font-semibold py-1 rounded-md bg-slate-200 border border-slate-500"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          {error && (
            <div
              id="error-toast"
              className="absolute flex items-center w-full max-w-xs p-4 space-x-4 ring-1 ring-red-500 text-gray-500 bg-red-200 divide-x divide-gray-200 rounded-lg shadow top-5 right-5"
              role="alert"
            >
              <div className="text-sm font-medium text-red-900">
                Error: {error?.message || 'Something went wrong!'}
              </div>
            </div>
          )}
          {loading && (
            <div className="text-center py-8">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </section>
        {/* Results Section */}
        {responded && isEmpty(result) && (
          <section className="p-4 w-max mx-auto">
            <div
              className="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">0 Results!</span> Change a few
                things up and try submitting again.
              </div>
            </div>
          </section>
        )}
        {!isEmpty(result) && (
          <section className="max-w-5xl p-4 w-full rounded-md shadow-sm mt-8 mx-auto bg-white">
            <h4 className="text-xl text-gray-700 font-semibold">
              {totalAnagrams} Results found
            </h4>
            <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500" />

            <dl className="w-full flex flex-col-reverse py-5 text-gray-900 gap-4">
              {Object.keys(result).map((key) => (
                <div
                  key={key}
                  className="flex flex-col pb-3 border-b-2 border-gray-200"
                >
                  <dt className="mb-1 text-black md:text-lg font-semibold">
                    {key} Letters:
                  </dt>
                  <dd className="flex flex-wrap gap-3 text-base text-gray-900">
                    {result[key]?.map((item: string, i: number) => (
                      <p key={i}>{item}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <footer className="absolute max-w-5xl px-4 flex bottom-0 justify-center sm:justify-end w-full">
          <h5 className="text-sm pt-8 pb-3">
            Made with 💜 by{' '}
            <a
              className="text-blue-900 underline underline-offset-2"
              href="https://twitter.com/_tittoh"
            >
              Tittoh
            </a>
          </h5>
        </footer>
      </main>
    </>
  );
}
