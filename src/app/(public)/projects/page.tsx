export const revalidate = 60; // ISR

import Link from "next/link";
import { http } from "@/lib/http";

type Project = {
  id: string;
  title: string;
  slug?: string;
  thumbnail?: string;
  liveUrl?: string;
  description?: string;
};

async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await http.get("/projects");
    return res.data?.data ?? res.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 text-slate-800">
      {/* ---------- HERO SECTION ---------- */}
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          My Projects
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-sm sm:text-base text-slate-600">
          A curated selection of my featured works — from frontend experiences
          to full-stack applications. Each project reflects my focus on clean
          code, good UX, and performance.
        </p>
      </section>

      {/* ---------- PROJECTS GRID ---------- */}
      <section className="mt-12">
        {projects.length === 0 ? (
          <p className="text-center text-slate-600">
            No projects available yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Project Thumbnail */}
                {project.thumbnail ? (
                  <Link
                    href={
                      project.slug
                        ? `/projects/${project.slug}`
                        : `/projects/${project.id}`
                    }
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70 group-hover:opacity-50 transition" />
                    </div>
                  </Link>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-r from-blue-50 to-fuchsia-50 flex items-center justify-center text-slate-400 text-sm">
                    No Image
                  </div>
                )}

                {/* Project Info */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                    <Link
                      href={
                        project.slug
                          ? `/projects/${project.slug}`
                          : `/projects/${project.id}`
                      }
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {project.description || "No description available."}
                  </p>

                  {/* Actions */}
                  <div className="mt-auto pt-4 flex items-center gap-4">
                    <Link
                      href={
                        project.slug
                          ? `/projects/${project.slug}`
                          : `/projects/${project.id}`
                      }
                      className="inline-block text-sm font-medium text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium text-fuchsia-600 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 text-center shadow-md">
          <h3 className="text-2xl font-bold text-white">
            Have an idea for a project?
          </h3>
          <p className="mt-2 max-w-xl mx-auto text-sm text-blue-100">
            I’m always excited to collaborate and bring innovative products to
            life — from concept to deployment.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
