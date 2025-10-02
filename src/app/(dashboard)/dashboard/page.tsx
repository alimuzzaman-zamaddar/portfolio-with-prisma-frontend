export const revalidate = 0; // dynamic

import { cookies } from "next/headers";
import Link from "next/link";
import { FiEdit, FiFolder, FiAlertTriangle } from "react-icons/fi";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const hasToken = Boolean(cookieStore.get("portfolio_auth_token")?.value);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 space-y-12 text-slate-800">
      {/* ---------- HERO SECTION ---------- */}
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Dashboard
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Manage your blogs and projects in one place. A simple and efficient
          control center for your portfolio.
        </p>
      </section>

      {/* ---------- AUTH ALERT ---------- */}
      {!hasToken && (
        <div className="mx-auto max-w-lg rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
          <FiAlertTriangle
            className="mt-0.5 flex-shrink-0 text-red-600"
            size={18}
          />
          <div>
            <p className="font-semibold">You are not authenticated.</p>
            <p>Please log in to manage your portfolio content.</p>
          </div>
        </div>
      )}

      {/* ---------- ACTION CARDS ---------- */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Blogs */}
          <Link
            href="/dashboard/blogs"
            className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white shadow-sm">
              <FiEdit size={22} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
              Manage Blogs
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Create, update, and organize your blog posts with ease.
            </p>
          </Link>

          {/* Projects */}
          <Link
            href="/dashboard/projects"
            className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-sm">
              <FiFolder size={22} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
              Manage Projects
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Showcase and maintain your project portfolio.
            </p>
          </Link>
        </div>
      </section>

      {/* ---------- CTA / TIP SECTION ---------- */}
      <section className="mt-12">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 text-center shadow-md">
          <h3 className="text-2xl font-bold text-white">
            Ready to grow your portfolio?
          </h3>
          <p className="mt-2 max-w-xl mx-auto text-sm text-blue-100">
            Keep your dashboard organized and up-to-date to showcase your best
            work to the world.
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition"
          >
            View Live Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
