
import Link from "next/link";

const features = [
  {
    icon: "🧠",
    title: "Interactive Quizzes",
    description:
      "Answer questions, review explanations, and track your score as you practice.",
  },
  {
    icon: "📝",
    title: "Flashcards",
    description:
      "Reveal definitions and cycle through short cards to review key concepts.",
  },
  {
    icon: "💡",
    title: "Topic Study Suggestions",
    description:
      "Enter a subject and get a study strategy that matches the topic.",
  },
  {
    icon: "🎓",
    title: "Learning Paths",
    description:
      "Explore focus areas and a learning challenge for your education level.",
  },
  {
    icon: "🎯",
    title: "Knowledge Checks",
    description:
      "Get immediate feedback and explanations after selecting an answer.",
  },
  {
    icon: "📱",
    title: "Responsive Layout",
    description:
      "Use the learning activities and education-level pages on different screen sizes.",
  },
];

const levels = [
  { name: "Primary School", icon: "🎒", slug: "primary" },
  { name: "Secondary School", icon: "🏫", slug: "secondary" },
  { name: "College", icon: "🎓", slug: "college" },
  { name: "University", icon: "📖", slug: "university" },
];

async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

/** Renders one feature card on the landing page. */
function renderFeatureCard(feature: (typeof features)[number]) {
  return (
    <div
      key={feature.title}
      className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
        {feature.icon}
      </div>
      <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
    </div>
  );
}

/** Renders a link to the page for one education level. */
function renderLearningLevel(level: (typeof levels)[number]) {
  return (
    <Link
      key={level.name}
      href={`/learn/${level.slug}`}
      className="rounded-2xl border border-slate-200 bg-white p-7 text-center transition hover:border-blue-300 hover:shadow-lg"
    >
      <span className="text-5xl">{level.icon}</span>
      <h3 className="mt-5 font-bold">{level.name}</h3>
      <p className="mt-2 text-sm text-slate-500">
        View a learning path designed for this level.
      </p>
    </Link>
  );
}

/** Renders COMPA's landing page and links to the interactive learning tools. */
export default async function Home() {
  const copyrightYear = await getCopyrightYear();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-xl font-bold text-white">
              C
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-blue-800">
                COMPA
              </h1>
              <p className="text-[10px] font-medium tracking-widest text-slate-500">
                LEARN • GROW • ACHIEVE
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#home" className="hover:text-blue-700">Home</a>
            <a href="#features" className="hover:text-blue-700">Features</a>
            <a href="#levels" className="hover:text-blue-700">Students</a>
            <a href="#about" className="hover:text-blue-700">About</a>
          </div>

          <Link
            href="/study"
            className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Start Learning
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
              Your learning journey starts here
            </span>

            <h2 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Learn smarter.
              <span className="block text-blue-700">Achieve more.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Meet COMPA, your everyday learning companion. Explore knowledge,
              practice with quizzes, discover resources, and build better study
              habits, all in one place.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/study"
                className="rounded-xl bg-blue-700 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-800"
              >
                Start Learning →
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
              >
                Discover Features
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <span>✓ Learn at your own pace</span>
              <span>✓ Resources in one place</span>
            </div>
          </div>

          {/* Learning illustration */}
          <div className="relative">
            <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-indigo-200/60 blur-3xl" />

            <div className="relative rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-100 md:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Welcome to your</p>
                  <h3 className="text-2xl font-bold text-slate-900">Learning Space</h3>
                </div>
                <span className="rounded-xl bg-blue-100 p-3 text-2xl">🎓</span>
              </div>

              <div className="mt-8 rounded-2xl bg-blue-700 p-6 text-white">
                <p className="text-sm text-blue-100">Today's inspiration</p>
                <h3 className="mt-2 text-2xl font-bold">
                  Every expert was once a beginner.
                </h3>
                <p className="mt-3 text-sm text-blue-100">
                  Keep learning. Keep growing.
                </p>
              </div>

              <h4 className="mb-4 mt-8 font-bold">Explore your learning tools</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="text-2xl">🧠</span>
                  <p className="mt-2 font-semibold">Quizzes</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="text-2xl">📝</span>
                  <p className="mt-2 font-semibold">Flashcards</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="text-2xl">💡</span>
                  <p className="mt-2 font-semibold">Study Tips</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="text-2xl">🎓</span>
                  <p className="mt-2 font-semibold">Learning Paths</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-semibold uppercase tracking-widest text-blue-700">
            What COMPA offers
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
            Everything you need to learn better
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            Useful learning tools designed to make studying easier, more
            interesting, and more effective.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(renderFeatureCard)}
        </div>
      </section>

      {/* Educational Levels */}
      <section id="levels" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold uppercase tracking-widest text-blue-700">
              Learning for everyone
            </span>
            <h2 className="mt-4 text-4xl font-extrabold">
              Made for every stage of education
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Whether you are just starting school or pursuing higher
              education, COMPA supports your learning journey.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map(renderLearningLevel)}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24 text-center">
        <span className="font-semibold uppercase tracking-widest text-blue-700">
          About COMPA
        </span>
        <h2 className="mt-4 text-4xl font-extrabold">
          More than a learning platform
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          COMPA brings together interactive quizzes, flashcards, topic-based
          study suggestions, and learning paths for different education levels.
          Our mission is to make helpful study support accessible to every
          student.
        </p>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-blue-800 px-8 py-16 text-center text-white md:px-16">
          <h2 className="text-4xl font-extrabold">
            Your learning journey begins today.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            Discover new knowledge, challenge yourself, and become a better
            learner with COMPA.
          </p>
          <Link
            href="/study"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-blue-800 transition hover:bg-blue-50"
          >
            Try the Study Tools →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold text-blue-800">COMPA</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your Learning Partner. Beyond the Classroom.
            </p>
          </div>
          <p className="text-sm text-slate-500">
            © {copyrightYear} COMPA. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
