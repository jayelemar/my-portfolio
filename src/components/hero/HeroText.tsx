"use client";
import { fadeIn } from "@/lib/variant";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const HeroText = () => {
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "React JS Developer"],
    loop: false,
    deleteSpeed: 20,
  });

  return (
    <>
      <motion.p
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="absolute top-4 mb-4 whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-primary xs:top-0 xl:left-1 xl:top-6"
      >
        {text}
        <span className="text-primary">
          <Cursor />
        </span>
      </motion.p>
      <motion.h1
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="mb-4 pt-10 text-5xl font-bold tracking-tight md:max-w-lg xl:text-[72px] xl:leading-[80px]"
      >
        Hello, my{" "}
        <span className="inline xs:hidden">
          <br />
        </span>
        name is{" "}
        <span className="inline md:hidden">
          <br />
        </span>
        <span className="whitespace-nowrap">Jay Elemar</span>
      </motion.h1>
      <motion.p
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-lg text-center text-xl font-light  text-muted-foreground xl:text-left"
      >
        a software developer with passion for design, automation and
        technologies
      </motion.p>
    </>
  );
};

export default HeroText;
