export const revalidate = 60; // ISR

import Link from "next/link";
import { http } from "@/lib/http";
import { FiArrowRight } from "react-icons/fi";

type Blog = {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  createdAt?: string;
};

async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await http.get("/posts");
    return res.data?.data ?? res.data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 text-slate-800">
      {/* ---------- HERO SECTION ---------- */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent">
          Insights & Stories
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-base text-slate-600">
          Dive into my personal thoughts, tips, and guides as I share my journey
          in web development — from hands-on tutorials to lessons learned in
          real-world projects.
        </p>
      </section>

      {/* ---------- BLOG LIST SECTION ---------- */}
      <section className="mt-16">
        {blogs.length === 0 ? (
          <p className="text-center text-slate-600">
            No blogs published yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-500 transition"
              >
                <div className="flex-1 p-6 flex flex-col">
                  <Link
                    href={
                      blog.slug ? `/blogs/${blog.slug}` : `/blogs/${blog.id}`
                    }
                  >
                    <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                      {blog.title}
                    </h2>
                  </Link>

                  {blog.excerpt && (
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  )}

                  {blog.createdAt && (
                    <p className="mt-auto pt-4 text-xs text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between">
                  <Link
                    href={
                      blog.slug ? `/blogs/${blog.slug}` : `/blogs/${blog.id}`
                    }
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition"
                  >
                    Read More <FiArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="mt-24">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 sm:p-12 text-center shadow-md">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Have a topic suggestion or want to collaborate?
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-blue-100">
            I’m always open to new ideas and collaboration opportunities.
            Together, we can create content that inspires and educates.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
