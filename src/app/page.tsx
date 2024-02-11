import About from "@/components/about/About";
import Contact from "@/components/common/Contact";
import Hero from "@/components/common/Hero";
import Projects from "@/components/project/Projects";


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
