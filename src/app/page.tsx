import About from "@/components/about/About";
import Hero from "@/components/common/Hero";
import Projects from "@/components/project/Projects";
import { Download, Send } from "lucide-react";
import { RiBriefcase4Fill, RiTeamFill, RiTodoFill, RiArrowDownLine } from 'react-icons/ri'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
