"use client";

import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* ---------- Top Section ---------- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent"
            >
              Portfolio
            </Link>
            <p className="mt-3 text-sm text-slate-600">
              A showcase of my work as a full-stack developer. Building clean,
              performant, and user-friendly web apps.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/"
                  target="_blank"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-blue-600 transition"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-slate-600">
              Subscribe to receive updates about new projects and blogs.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm text-slate-700 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-fuchsia-600 px-4 text-sm font-medium text-white hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ---------- Divider ---------- */}
        <div className="my-10 h-px bg-slate-200" />

        {/* ---------- Bottom Section ---------- */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-slate-600">
            <a
              href="https://github.com/"
              target="_blank"
              aria-label="GitHub"
              className="hover:text-blue-600 transition"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              aria-label="Twitter"
              className="hover:text-blue-600 transition"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="mailto:example@email.com"
              aria-label="Email"
              className="hover:text-blue-600 transition"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
