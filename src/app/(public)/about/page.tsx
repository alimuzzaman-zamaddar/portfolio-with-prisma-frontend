export const revalidate = false; // SSG (build-time)

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 text-slate-800">
      {/* ---------- HERO / INTRO SECTION ---------- */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Hi, I’m a passionate full-stack developer committed to building
          modern, performant, and user-friendly web applications. My goal is to
          craft clean, efficient code that delivers high-quality solutions and
          memorable user experiences.
        </p>

        <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition p-8 text-left">
          <h2 className="text-2xl font-semibold text-slate-900">My Journey</h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            I began my coding journey with curiosity about how the web works.
            Over the years, I’ve honed my skills in both frontend and backend
            development, focusing on technologies like <strong>Next.js</strong>,{" "}
            <strong>React</strong>, and <strong>TypeScript</strong>. I strive to
            build products that are technically strong, accessible, and seamless
            for every user.
          </p>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            Outside of coding, I’m passionate about mentoring junior developers,
            contributing to open-source projects, and keeping up with the latest
            advancements in the JavaScript ecosystem.
          </p>
        </div>
      </section>

      {/* ---------- SKILLS & VALUES SECTION ---------- */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Skills & Core Values
        </h2>
        <p className="mt-3 text-center text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          A blend of technical expertise and guiding principles that drive
          everything I create.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Frontend Development",
              desc: "Expert at building responsive, accessible UIs with Next.js, React, and TailwindCSS.",
            },
            {
              title: "Backend & APIs",
              desc: "Hands-on experience with Node.js, Express, Prisma, and REST/GraphQL for scalable backends.",
            },
            {
              title: "Database & Cloud",
              desc: "Proficient with PostgreSQL, MySQL, and deploying apps on Vercel and AWS.",
            },
            {
              title: "Collaboration & Mentoring",
              desc: "Believe in teamwork, thoughtful code reviews, and helping peers grow through knowledge sharing.",
            },
            {
              title: "Continuous Learning",
              desc: "Stay up-to-date with modern JavaScript, performance optimizations, and accessibility best practices.",
            },
            {
              title: "User-First Approach",
              desc: "Focus on seamless experiences that add real value to users’ lives.",
            },
          ].map((skill) => (
            <div
              key={skill.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {skill.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="mt-24">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-fuchsia-600 p-8 sm:p-12 text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Let’s build something impactful together!
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-blue-100">
            I’m open to collaborations, freelance opportunities, and impactful
            projects where technology can make a difference.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
