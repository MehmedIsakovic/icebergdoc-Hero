import React from "react";
import { motion } from "framer-motion";

const duration = 2.5; //default 2.5
const tightness = 25; //default 25
const letterStagger = 0.1; //default 0.1
const heightDiff = 0.8; //default 0.8

function StaggeredTextAnimation({ char, baseDelay = 0 }) {
  return (
    <div className="relative overflow-hidden w-min h-fit leading-none flex justify-center items-center -my-8">
      {/* invisible placeholder to reserve space */}
      <div className="opacity-0 font-bold bg-red-200 -mt-4 lg:-mt-12 text-[5rem] lg:text-[22rem] tracking-tighter uppercase z-30">
        {char === " " ? "\u00A0" : char}
      </div>

      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          initial={{ y: `${(idx * 100 + 200) * heightDiff}%` }}
          animate={{ y: `${(idx * 100 - 200) * heightDiff}%` }}
          transition={{
            duration: duration,
            delay: baseDelay + idx / tightness,
            ease: [0.25, 0.75, 0.25, 1.0],
          }}
          className="absolute inset-0 flex justify-center items-center -mt-4 lg:-mt-12 font-bold text-[5rem] lg:text-[22rem] tracking-tighter uppercase text-white"
        >
          {char === " " ? "\u00A0" : char}
        </motion.div>
      ))}
    </div>
  );
}

export function TextAnimation({ children }) {
  return (
    <div className="flex space-x-[0.1rem]">
      {children?.split("").map((char, i) => (
        <StaggeredTextAnimation
          key={i}
          char={char}
          baseDelay={i * letterStagger}
        />
      ))}
    </div>
  );
}
