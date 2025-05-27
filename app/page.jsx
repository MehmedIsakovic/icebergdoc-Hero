"use client";

import { TextAnimation } from "@/components/text-animation";
import { cn } from "@/lib/utils";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Section />
      <VerticalLines />
    </>
  );
}

function Hero() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  return (
    <div
      className="grid grid-cols-6 relative h-screen md:h-[200vh] overflow-hidden -z-10"
      ref={scrollRef}
    >
      <div className="absolute md:fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute md:fixed inset-0 grid p-0 m-0 text-center place-items-center z-0 ">
        <TextAnimation>Iceberg</TextAnimation>
      </div>

      <div className="grid grid-cols-6 fixed inset-0 z-20 pointer-events-none invisible md:visible">
        {Array(6)
          .fill()
          .map((_, idx) => {
            const start = idx * 0.05;
            const end = start + 0.5;

            const scaleX = useTransform(scrollYProgress, [start, end], [0, 1], {
              clamp: true,
            });

            return (
              <motion.div
                key={idx}
                style={{ scaleX, transformOrigin: "left" }}
                className="h-screen bg-black col-span-1"
              />
            );
          })}
      </div>
    </div>
  );
}

function Section() {
  return <div className="bg-gray-100 h-[2000px] relative">placeholder</div>;
}

function VerticalLines() {
  return (
    <div className="fixed w-full h-full inset-0 z-40 pointer-events-none grid grid-cols-6">
      {Array(6)
        .fill()
        .map((_, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                "h-screen w-full",
                idx % 2 ? "border-l border-gray-200/10" : ""
              )}
            />
          );
        })}
    </div>
  );
}
