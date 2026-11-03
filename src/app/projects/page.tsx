import Projects from "@/components/project/Projects";

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">Jay Elemar’s projects</h1>
      <Projects />
    </main>
  );
}
