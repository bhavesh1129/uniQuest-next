import { Navbar, Footer } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="relative w-full">
      <Navbar />
      <div className="relative bg-white px-6 pt-14 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-24">
          <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <div>
              {/* <Image className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" src='/logo.png' width={1400} height={700} alt="uniQuest Logo" /> */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">uniQuest</h1>
              <p className="text-xl font-semibold mt-0.5 text-gray-500">Elevate Your University Journey!</p>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unlock the full potential of your university experience with uniQuest, where questions find answers, connections become opportunities, and your journey to success begins. Join the community that's shaping the future of education and professional growth.
              <br />
              <span className="font-semibold">uniQuest – Your Quest, Your Future!</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-2">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Link href='/about'>Learn More</Link>
              </button>
              <button
                type="button"
                className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Link href='/questions'>Get Started</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
