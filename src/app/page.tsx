"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(900px 500px at 110% 10%, rgba(168,85,247,0.15) 0%, transparent 60%)",
        }}
      >
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                💻 Modern • ⚡ Fast • ✨ Elegant
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Build <span className="text-blue-600">beautiful</span>, launch
                <span className="text-fuchsia-600"> faster</span>.
              </h1>
              <p className="mt-4 max-w-xl text-slate-600">
                I’m Morol — a full-stack developer creating performant,
                aesthetic, and reliable digital products.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  View Projects →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Contact Me
                </Link>
              </div>

              <div className="mt-6 text-xs text-slate-500">
                Want to collaborate?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-blue-600 underline"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Now</span>
                    <span>Portfolio</span>
                  </div>
                  <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-50 to-fuchsia-50 p-4">
                    <div className="text-xs text-slate-500">Highlight</div>
                    <div className="text-sm font-semibold text-slate-900">
                      Full-stack Development
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      Tech Stack
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      Next.js • Tailwind
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Projects</span>
                      <span className="text-sm font-semibold text-slate-900">
                        25+
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                      <div className="text-[10px] text-slate-500">Clients</div>
                      <div className="text-sm font-semibold text-slate-900">
                        15+
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                      <div className="text-[10px] text-slate-500">Years</div>
                      <div className="text-sm font-semibold text-slate-900">
                        3+
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/projects"
                    className="mt-4 block w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 text-center"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-fuchsia-500/10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">
          What I Do
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
          Turning ideas into live, polished products with a clear process.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "🎨", title: "UI/UX", desc: "Clean, modern interfaces" },
            {
              emoji: "⚛️",
              title: "Frontend",
              desc: "React / Next.js expertise",
            },
            { emoji: "🛠️", title: "Backend", desc: "APIs & integrations" },
            { emoji: "🚀", title: "Optimization", desc: "Performance & SEO" },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-2xl">{s.emoji}</div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="container mx-auto rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-3">
            <Highlight
              title="Clean Code"
              desc="Readable, maintainable & scalable."
              icon="🧩"
            />
            <Highlight
              title="Performance Focus"
              desc="Fast, optimized sites & apps."
              icon="⚡"
            />
            <Highlight
              title="Reliable Delivery"
              desc="Transparent communication & timelines."
              icon="📦"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-fuchsia-50 p-6">
            <h3 className="text-lg font-bold text-slate-900">For Clients</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Bespoke, modern websites</li>
              <li>• Clear project timelines</li>
              <li>• Ongoing support</li>
              <li>• Focus on quality & performance</li>
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Work with Me
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
            <h3 className="text-lg font-bold text-slate-900">
              For Collaborators
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Open to OSS contributions</li>
              <li>• Dev-friendly workflows</li>
              <li>• Flexible & communicative</li>
              <li>• Collaborative problem-solving</li>
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Collaborate
            </Link>
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Client Feedback
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Hear from people I’ve worked with.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Ayesha",
                text: "A polished product and smooth process.",
              },
              {
                name: "Fahim",
                text: "Great communication and timely delivery.",
              },
              {
                name: "Nishat",
                text: "Modern design and seamless experience.",
              },
            ].map((t) => (
              <Testimonial key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 pb-20">
        <div className="container mx-auto rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold text-white">
            Ready to start your project?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Let’s collaborate to bring your vision to life.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm"
            >
              Contact Me
            </Link>
            <Link
              href="/projects"
              className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white/95 hover:bg-white/10"
            >
              View Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Highlight({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-700">“{text}”</p>
      <div className="mt-3 text-xs font-semibold text-slate-900">{name}</div>
    </div>
  );
}
