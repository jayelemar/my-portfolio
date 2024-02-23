'use client';
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/project/Projects";
import { Suspense, useEffect } from "react";
import { Events, scrollSpy } from "react-scroll";
import { Toaster } from "@/components/ui/toaster"
import Spinner from "@/components/common/Spinner";
 


export default function Home() {

  useEffect(() => {
    
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return (
    <main>
      <Suspense>
        <Hero />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <About/>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Projects/>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Contact />
      </Suspense>

      <Toaster />
    </main>
  );
}
