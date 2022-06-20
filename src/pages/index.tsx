import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import { useState } from "react";
import { useSetUrl } from "../utils/trpc";
import { formatDistanceToNow } from 'date-fns'
import {parse} from 'superjson'
import { ShortLink } from "@prisma/client";

type Props = { host: string | null };

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return { props: { host: ctx.req.headers.host } };
};

const Home: NextPage<Props> = ({ host }) => {
  const [form, setForm] = useState({
    url: "",
    ttl: 60,
  });
  const [newUrl, setNewUrl] = useState<ShortLink>({
    id: "",
    url: "",
    createdAt: new Date(),
    expiresAt: new Date(),
    slug: "",
  });

  const { setUrl, loading, success, error } = useSetUrl();
  const createUrl = async (value: typeof form) => {
    const { url, ttl } = value;
    const result = parse<ShortLink>(await setUrl(url, ttl));
    console.log('client side date and type', result.expiresAt, typeof result.expiresAt)
    setNewUrl(result);
  };

  return (
    <div>
      <Head>
        <title>lnk</title>
        <meta name="description" content="Create a shorter link" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center content-center"
          onSubmit={(e) => {
            e.preventDefault();
            createUrl(form);
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="url"
            >
              Paste in your URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="url"
              type="text"
              placeholder="http://example.com"
              value={form.url}
              onChange={(e) => setForm({...form, url: e.currentTarget.value})}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="ttl"
            >
              Time to live (minutes)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ttl"
              type="number"
              value={form.ttl}
              onChange={(e) => setForm({...form, ttl: parseInt(e.currentTarget.value)})}
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
        <div className="flex flex-col gap-4 items-center">
          {success && (
            <>
              <p>Link expires in {formatDistanceToNow(newUrl.expiresAt)}</p>
              <a href={`${host}/lnk/${newUrl.slug}`} target="_blank" rel="noreferrer">
                {host}/lnk/{newUrl.slug}
              </a>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  navigator.clipboard.writeText(`${host}/lnk/${newUrl.slug}`);
                }}
              >
                Copy link to clipboard
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
