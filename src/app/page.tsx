import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/project/Projects";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
