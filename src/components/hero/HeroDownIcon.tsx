"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";
import { RiArrowDownSFill } from "react-icons/ri";

const HeroDownIcon = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.8)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="absolute -bottom-4 left-2/4 hidden animate-bounce xl:flex"
    >
      <RiArrowDownSFill className="text-3xl text-primary" />
    </motion.div>
  );
};

export default HeroDownIcon;
