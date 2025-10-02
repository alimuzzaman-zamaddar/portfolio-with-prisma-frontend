"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearAuthToken, getAuthToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ React Icons

export default function Navbar() {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getAuthToken()));
  }, [pathname]);

  const linkClasses = (path: string) =>
    `block text-sm font-medium transition-colors ${
      pathname === path ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* ---------- Brand ---------- */}
        <Link
          href="/"
          className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent hover:opacity-90 transition"
        >
          Portfolio
        </Link>

        {/* ---------- Desktop Links ---------- */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/projects" className={linkClasses("/projects")}>
            Projects
          </Link>
          <Link href="/blogs" className={linkClasses("/blogs")}>
            Blog
          </Link>
          <Link href="/about" className={linkClasses("/about")}>
            About
          </Link>
        </div>

        {/* ---------- Desktop Auth ---------- */}
        <div className="hidden md:flex items-center gap-3">
          {hasToken ? (
            <>
              <Link href="/dashboard" className={linkClasses("/dashboard")}>
                Dashboard
              </Link>
              <button
                onClick={() => {
                  clearAuthToken();
                  window.location.href = "/";
                }}
                className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Login
              </Link>
              {/* <Link
                href="/register"
                className="rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
              >
                Register
              </Link> */}
            </>
          )}
        </div>

        {/* ---------- Mobile Hamburger ---------- */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 transition"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>
      </nav>

      {/* ---------- Mobile Drawer Overlay ---------- */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* ---------- Mobile Drawer ---------- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200">
          <Link
            href="/"
            className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent"
            onClick={() => setDrawerOpen(false)}
          >
            Portfolio
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 transition"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col gap-4 p-4 bg-white h-full">
          <Link
            href="/projects"
            className={linkClasses("/projects")}
            onClick={() => setDrawerOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/blogs"
            className={linkClasses("/blogs")}
            onClick={() => setDrawerOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={linkClasses("/about")}
            onClick={() => setDrawerOpen(false)}
          >
            About
          </Link>

          <div className="mt-4 border-t border-slate-200 pt-4">
            {hasToken ? (
              <>
                <Link
                  href="/dashboard"
                  className={linkClasses("/dashboard")}
                  onClick={() => setDrawerOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    clearAuthToken();
                    window.location.href = "/";
                  }}
                  className="mt-3 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block mt-3 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  onClick={() => setDrawerOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block mt-3 rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
                  onClick={() => setDrawerOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </aside>
    </header>
  );
}
