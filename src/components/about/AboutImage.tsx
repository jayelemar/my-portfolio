import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const portraitMask = [
  "radial-gradient(ellipse 65% 70% at 50% 35%, black 55%, transparent 85%)",
  "linear-gradient(to bottom, black 66%, rgba(0, 0, 0, 0.55) 78%, transparent 90%)",
].join(", ");

const AboutImage = () => {
  return (
    <div className="relative hidden flex-1 xl:flex">
      <motion.div
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative bottom-4 left-10 isolate h-[400px] w-[400px]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-12 -z-10 bg-[#ffeddf] dark:bg-[#222335]"
          style={{ borderRadius: "58% 42% 46% 54% / 42% 42% 58% 58%" }}
        />
        <Image
          src="/hero/jay-elemar-termulo-transparent.png"
          width={1254}
          height={1254}
          alt="Jay Elemar Termulo in a dark suit, looking to the side"
          sizes="400px"
          className="absolute inset-x-0 top-8 h-auto w-full object-contain"
          style={{
            clipPath: "ellipse(50% 50% at 50% 50%)",
            maskImage: portraitMask,
            maskComposite: "intersect",
            WebkitMaskImage: portraitMask,
            WebkitMaskComposite: "source-in",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AboutImage;
