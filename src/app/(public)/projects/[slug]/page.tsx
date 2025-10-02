export const revalidate = 60; // ISR

import { http } from "@/lib/http";
import { notFound } from "next/navigation";

type Project = {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  githubUrl?: string;
  liveUrl?: string;
};

async function fetchProject(slugOrId: string): Promise<Project | null> {
  try {
    // Prefer slug route, fallback to ID
    try {
      const bySlug = await http.get(`/projects/slug/${slugOrId}`);
      return bySlug.data?.data ?? bySlug.data ?? null;
    } catch {
      const byId = await http.get(`/projects/${slugOrId}`);
      return byId.data?.data ?? byId.data ?? null;
    }
  } catch {
    return null;
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await fetchProject(params.slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 text-slate-800">
      {/* ---------- HERO SECTION ---------- */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          A closer look at one of my featured works
        </p>
      </header>

      {/* ---------- CONTENT SECTION ---------- */}
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:underline dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: project.content || "" }} />
      </article>

      {/* ---------- LINKS SECTION ---------- */}
      <section className="mt-10 flex flex-wrap items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            View on GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition"
          >
            View Live Demo
          </a>
        )}
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 text-center shadow-md">
          <h3 className="text-2xl font-bold text-white">
            Want to build something similar?
          </h3>
          <p className="mt-2 max-w-xl mx-auto text-sm text-blue-100">
            I’d love to collaborate on new projects and bring your ideas to life
            with the same attention to detail and quality.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
