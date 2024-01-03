import React from 'react';
import { ArrowLeft, Rainbow, Sparkles } from 'lucide-react'
import Link from 'next/link';

const FindFriendsPage = () => {
  return (
    <>
      <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
        <div className="lg:flex lg:items-center lg:space-x-10">
          <img
            src="https://illustrations.popsy.co/white/resistance-band.svg"
            alt="question-mark"
            className="h-[400px] w-auto"
          />
          <div>
            <h1 className="flex flex-col justify-start mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              <div className='flex items-center'>
                <span>Whoopsie-daisy!&nbsp;</span>
                <Rainbow className='text-red-400' size={35} />
              </div>
              <span>I'm diligently working on it...</span>
            </h1>
            <p className="mt-4 text-gray-500">
              The page you were seeking is currently taking a break. It'll be back soon!
            </p>
            <p className="mt-6 text-xs w-96 font-semibold text-red-400">
              *If you find this application enchanting, shower it with stardust on my GitHub repo! If you possess magical ideas to enhance this project, weave a PR spell.
            </p>
            <div className="mt-6 flex items-center space-x-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-gray-500 hover:text-gray-500" 
              >
                <ArrowLeft size={16} className="mr-2" />
                <Link href="/">Go Back</Link>
              </button>
              <button
                type="button"
                className="inline-flex bg-black items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blackk"
              >
                <Sparkles size={16} className="mr-2" />
                <Link href="https://github.com/bhavesh1129/uniQuest-next">GitHub</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindFriendsPage;
