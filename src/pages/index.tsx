import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useSetUrl } from "../utils/trpc";

type Props = {host: string | null};

export const getServerSideProps: Partial<GetServerSideProps<Props>> = async (ctx: GetServerSidePropsContext) => {
  return {props: {host: ctx.req.headers.host}}
}

const Home: NextPage<Props> = ({host}) => {
  const [urlString, setUrlString] = useState("");
  const [newUrl, setNewUrl] = useState('');

  
  const {setUrl, loading, success, error} = useSetUrl();
  const createUrl = async (url:string) => {
    const result = await setUrl(url)
    setNewUrl(result.slug)
  }

  return (
    <div>
      <Head>
        <title>lnk</title>
        <meta name="description" content="Create a short link" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            createUrl(urlString)
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              Paste in your URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="url"
              type="text"
              placeholder="http://example.com"
              value={urlString}
              onChange={(e) => setUrlString(e.currentTarget.value)}
            />
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>Something went wrong...</div>}
        {success && <p>{host}/lnk/{newUrl}</p>}
      </main>
    </div>
  );
};

export default Home;
