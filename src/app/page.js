"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Footer, Navbar } from "@/components";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen bg-slate-950 flex justify-center overflow-hidden flex-col">
        <BackgroundCellCore />
        <div className="relative z-40 mt-20 pointer-events-none select-none">
          <h1 className="-mt-24 text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pointer-events-none">
            uniQuest</h1>
          <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pointer-events-none">Elevate Your University Journey!</p>
        </div>

        <div className="relative z-40 mt-10 pointer-events-none select-none">
          <p className="max-w-2xl text-center font-semibold md:text-lg lg:text-base mx-auto bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pointer-events-none">Unlock the full potential of your university experience with uniQuest, where questions find answers, connections become opportunities, and your journey to success begins. Join the community that&apos;s shaping the future of education and professional growth.
            <br />
            <span className="font-semibold">uniQuest – Your Quest, Your Future!</span></p>
        </div>
        <div className="z-10 mt-10 flex items-center justify-center gap-x-2">
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Link href='/about'>Learn More</Link>
          </button>
          <button
            type="button"
            className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:text-gray-200 hover:border-gray-200"
          >
            <Link href='/questions'>Get Started</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const ref = useRef(null);

  const handleMouseMove = (event) => {
    const rect = ref.current && ref.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const size = 300;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full absolute inset-0"
    >
      <div className="absolute h-[20rem] inset-y-0  overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-slate-950 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(
            ${size / 4}px circle at center,
           white, transparent
          )`,
            WebkitMaskImage: `radial-gradient(
          ${size / 4}px circle at center,
          white, transparent
        )`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2
              }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-blue-600 relative z-[100]" />
        </div>
        <Pattern className="opacity-[0.5]" cellClassName="border-neutral-700" />
      </div>
    </div>
  );
};

// const Pattern = ({
//   className,
//   cellClassName,
// }) => {
//   const x = new Array(47).fill(0);
//   const y = new Array(30).fill(0);
//   const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
//   const [clickedCell, setClickedCell] = useState(null);

//   return (
//     <div className={cn("flex flex-row  relative z-30", className)}>
//       {matrix.map((row, rowIdx) => (
//         <div
//           key={`matrix-row-${rowIdx}`}
//           className="flex flex-col  relative z-20 border-b"
//         >
//           {row.map((column, colIdx) => {
//             const controls = useAnimation();

//             useEffect(() => {
//               if (clickedCell) {
//                 const distance = Math.sqrt(
//                   Math.pow(clickedCell[0] - rowIdx, 2) +
//                   Math.pow(clickedCell[1] - colIdx, 2)
//                 );
//                 controls.start({
//                   opacity: [0, 1 - distance * 0.1, 0],
//                   transition: { duration: distance * 0.2 },
//                 });
//               }
//             }, [clickedCell]);

//             return (
//               <div
//                 key={`matrix-col-${colIdx}`}
//                 className={cn(
//                   "bg-transparent border-l border-b border-neutral-600",
//                   cellClassName
//                 )}
//                 onClick={() => setClickedCell([rowIdx, colIdx])}
//               >
//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                   }}
//                   whileHover={{
//                     opacity: [0, 1, 0.5],
//                   }}
//                   transition={{
//                     duration: 0.5,
//                     ease: "backOut",
//                   }}
//                   animate={controls}
//                   className="bg-[rgba(14,165,233,0.3)] h-12 w-12" //  rgba(14, 165, 233, 0.15) for a more subtle effect
//                 ></motion.div>
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

const PatternCell = ({ rowIdx, colIdx, cellClassName, clickedCell, handleCellClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (clickedCell) {
      const distance = Math.sqrt(
        Math.pow(clickedCell[0] - rowIdx, 2) +
        Math.pow(clickedCell[1] - colIdx, 2)
      );

      controls.start({
        opacity: [0, 1 - distance * 0.1, 0],
        transition: { duration: distance * 0.2, ease: "easeOut" },
      });
    }
  }, [rowIdx, colIdx, controls, clickedCell]);

  return (
    <div
      key={`matrix-col-${colIdx}`}
      className={cn(
        "bg-transparent border-l border-b border-neutral-600",
        cellClassName
      )}
      onClick={() => handleCellClick(rowIdx, colIdx)}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: [0, 1, 0.5],
        }}
        transition={{
          duration: 0.5,
          ease: "backOut",
        }}
        animate={controls}
        className="bg-[rgba(14,165,233,0.3)] h-12 w-12"
      ></motion.div>
    </div>
  );
};

const Pattern = ({ className, cellClassName }) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState(null);

  const handleCellClick = (rowIdx, colIdx) => {
    setClickedCell([rowIdx, colIdx]);
  };

  return (
    <div className={cn("flex flex-row  relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col  relative z-20 border-b"
        >
          {row.map((_, colIdx) => (
            <PatternCell
              key={`matrix-col-${colIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              cellClassName={cellClassName}
              clickedCell={clickedCell}
              handleCellClick={handleCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};


export default HomePage;