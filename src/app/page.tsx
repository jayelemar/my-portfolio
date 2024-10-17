"use client";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/project/Projects";
import { Suspense, useEffect } from "react";
import { Events, scrollSpy } from "react-scroll";
import { Toaster } from "@/components/ui/toaster";
import Spinner from "@/components/common/Spinner";

export default function Home() {
  useEffect(() => {
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <main>
      <Suspense>
        <Hero />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Contact />
      </Suspense>

      <Toaster />
    </main>
  );
}
