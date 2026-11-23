import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const learningPaths = {
  primary: {
    name: "Primary School",
    icon: "🎒",
    introduction:
      "Build strong foundations with short practice sessions and clear explanations.",
    focus: ["Reading and vocabulary", "Number skills", "Science around us"],
    challenge: "Choose one new word you learned today and use it in a sentence.",
  },
  secondary: {
    name: "Secondary School",
    icon: "🏫",
    introduction:
      "Strengthen core subjects with active recall, worked examples, and regular review.",
    focus: ["Algebra and geometry", "Biology and chemistry", "Writing and analysis"],
    challenge: "Write three questions about a topic you are studying, then answer them from memory.",
  },
  college: {
    name: "College",
    icon: "🎓",
    introduction:
      "Connect classroom concepts to practical projects and prepare for assessments.",
    focus: ["Subject-specific practice", "Research and note-taking", "Exam preparation"],
    challenge: "Explain one difficult concept as if you were teaching it to a classmate.",
  },
  university: {
    name: "University",
    icon: "📖",
    introduction:
      "Plan independent study, evaluate sources, and deepen your understanding of complex ideas.",
    focus: ["Critical reading", "Research methods", "Independent revision"],
    challenge: "Summarize one research source and write down a question it leaves unanswered.",
  },
} as const;

type LearningLevel = keyof typeof learningPaths;

/** Converts one learning-path key into a parameter for the dynamic route. */
function createRouteParam(level: string) {
  return { level };
}

/** Checks whether a route segment names one of the supported learning paths. */
function isLearningLevel(level: string): level is LearningLevel {
  return Object.prototype.hasOwnProperty.call(learningPaths, level);
}

/** Renders one suggested focus area on an education-level page. */
function renderFocusItem(item: string) {
  return (
    <li key={item} className="rounded-xl bg-blue-50 p-4 font-medium text-blue-950">
      {item}
    </li>
  );
}

/** Generates a page variant for each education level in the learning-path data. */
export function generateStaticParams() {
  return Object.keys(learningPaths).map(createRouteParam);
}

/** Renders the education-level page selected by the dynamic route segment. */
async function LearningLevelContent({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  if (!isLearningLevel(level)) {
    notFound();
  }

  const path = learningPaths[level];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-extrabold text-blue-800">
            COMPA
          </Link>
          <Link href="/study" className="font-semibold text-blue-700 hover:text-blue-900">
            Study tools
          </Link>
        </nav>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-16">
        <span className="text-6xl" aria-hidden="true">
          {path.icon}
        </span>
        <p className="mt-6 font-semibold uppercase tracking-widest text-blue-700">
          Your learning path
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
          Learning at the {path.name} level
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {path.introduction}
        </p>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">Suggested areas to explore</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {path.focus.map(renderFocusItem)}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl bg-blue-800 p-7 text-white">
          <h2 className="text-xl font-bold">Try this learning challenge</h2>
          <p className="mt-3 leading-7 text-blue-100">{path.challenge}</p>
          <Link
            href="/study"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-blue-800 hover:bg-blue-50"
          >
            Practice with COMPA
          </Link>
        </section>

        <Link href="/" className="mt-8 inline-block font-semibold text-blue-700 hover:text-blue-900">
          ← All learning levels
        </Link>
      </article>
    </main>
  );
}

/** Keeps link-specific route params out of the shared navigation shell. */
export default function LearningLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900">
          <p className="mx-auto max-w-4xl px-6 py-16 text-slate-600">
            Loading learning path...
          </p>
        </main>
      }
    >
      <LearningLevelContent params={params} />
    </Suspense>
  );
}
