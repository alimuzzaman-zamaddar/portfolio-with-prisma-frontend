/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { http } from "@/lib/http";
import toast from "react-hot-toast";
import { FiEdit, FiEye, FiPlusCircle } from "react-icons/fi";

type Blog = { id: string; title: string; slug?: string };

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get("/posts");
        setBlogs(res.data?.data ?? res.data ?? []);
      } catch (e: any) {
        toast.error(e?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 text-slate-800">
      {/* ---------- HERO SECTION ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Manage Blogs
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            View, edit, and organize your blog posts.
          </p>
        </div>
        <Link
          href="/dashboard/blogs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
        >
          <FiPlusCircle size={18} />
          New Blog
        </Link>
      </div>

      {/* ---------- LOADING STATE ---------- */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-4 w-2/3 bg-slate-200 rounded mb-3" />
              <div className="h-3 w-1/2 bg-slate-200 rounded mb-2" />
              <div className="h-3 w-1/3 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-slate-600 mt-10">
          No blogs found. Click{" "}
          <Link
            href="/dashboard/blogs/new"
            className="text-blue-600 font-medium hover:underline"
          >
            New Blog
          </Link>{" "}
          to add your first one!
        </p>
      ) : (
        /* ---------- BLOG CARDS ---------- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition"
            >
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ID: {b.slug || b.id}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/blogs/${b.slug || b.id}`}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 transition"
                >
                  <FiEye size={14} /> View
                </Link>
                <Link
                  href={`/dashboard/blogs/${b.id}`}
                  className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:opacity-90 transition"
                >
                  <FiEdit size={14} /> Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
