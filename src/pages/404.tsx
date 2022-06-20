import { NextPage } from "next";
import Link from "next/link";
import React from "react";

type Props = {};

const Missing: NextPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center content-center">
          <div className="mb-4">
            <h1 className="text-gray-700 font-bold mb-2 text-2xl w-[20ch]">Looks like that link doesn{'\''}t exist, or it might be expired.</h1>
            <Link href='/'>
              <span className="text-blue-700 hover:underline cursor-pointer">Want to create a new link?</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missing;
