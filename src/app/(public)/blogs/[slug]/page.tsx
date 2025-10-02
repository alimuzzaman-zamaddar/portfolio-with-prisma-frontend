export const revalidate = 60; // ISR with revalidate

import { http } from "@/lib/http";
import { notFound } from "next/navigation";
import { FiCalendar } from "react-icons/fi";

type Blog = {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  createdAt?: string;
};

async function fetchBlog(slugOrId: string): Promise<Blog | null> {
  try {
    // Prefer slug route, fallback to ID
    try {
      const bySlug = await http.get(`/posts/slug/${slugOrId}`);
      return bySlug.data?.data ?? bySlug.data ?? null;
    } catch {
      const byId = await http.get(`/posts/${slugOrId}`);
      return byId.data?.data ?? byId.data ?? null;
    }
  } catch {
    return null;
  }
}

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await fetchBlog(params.slug);
  if (!blog) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 text-slate-800">
      {/* ---------- HERO SECTION ---------- */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent">
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600">
            {blog.excerpt}
          </p>
        )}

        {blog.createdAt && (
          <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <FiCalendar className="text-blue-600" size={14} />
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </header>

      {/* ---------- CONTENT SECTION ---------- */}
      <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:underline prose-img:rounded-lg dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
      </article>

      {/* ---------- CTA SECTION ---------- */}
      <section className="mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 sm:p-12 text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Enjoyed this article?
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-blue-100">
            I regularly share guides, insights, and stories from my journey as a
            developer. Let’s connect to exchange ideas and collaborate on
            exciting projects.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            Let’s Connect
          </a>
        </div>
      </section>
    </main>
  );
}
