"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Download, Send } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

const HeroButtons = () => {
  return (
    <div className="mx-auto mb-12 flex w-full flex-col gap-3 xs:mb-0 lg:mb-12 lg:flex-row lg:justify-center xl:mx-0 xl:mb-5 xl:justify-start">
      <motion.div
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Link href="#contact">
          <Button className="w-44 gap-2 rounded-full text-base hover:scale-105">
            Contact Me <Send size={18} />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Link
          href="https://drive.google.com/uc?id=16ISbek2KoUqtkvyVkx18GNjWJx0IIBjQ"
          download
        >
          <Button
            variant={"secondary"}
            className="btn-secondary w-44 gap-2 rounded-full text-base"
          >
            Download CV <Download size={18} />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
