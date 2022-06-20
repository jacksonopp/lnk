import { NextPage } from "next";
import React from "react";

type Props = {};

const Expired: NextPage = () => {
  return (
    <div>
      {/* A card using tailwindcss with content that says that the link expired */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center content-center">
          <div className="mb-4">
            <h1 className="text-gray-700 font-bold mb-2 text-2xl">Looks like that link doesn't exist, or it might be expired.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expired;
