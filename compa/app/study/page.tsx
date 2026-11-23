"use client";

import { useState, type FormEvent, type MouseEvent } from "react";

const questions = [
  {
    prompt: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars",
    explanation: "Iron minerals in the Martian soil give it a reddish color.",
  },
  {
    prompt: "What is 3/4 expressed as a percentage?",
    options: ["25%", "50%", "75%", "80%"],
    answer: "75%",
    explanation: "Divide 3 by 4 and multiply by 100 to get 75%.",
  },
  {
    prompt: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
    explanation: "Plants use carbon dioxide, water, and light to make sugars.",
  },
];

const flashcards = [
  {
    front: "What is evaporation?",
    back: "The process in which a liquid changes into a gas.",
  },
  {
    front: "What is a prime number?",
    back: "A whole number greater than 1 with exactly two factors: 1 and itself.",
  },
  {
    front: "What is the subject of a sentence?",
    back: "The person, place, thing, or idea that the sentence is about.",
  },
];

/** Returns a study suggestion that matches the topic entered by the student. */
function getStudySuggestion(topic: string): string {
  const normalizedTopic = topic.toLowerCase();

  if (normalizedTopic.includes("math") || normalizedTopic.includes("algebra")) {
    return "Work through one example slowly, write each step, then solve a similar problem without looking.";
  }

  if (
    normalizedTopic.includes("science") ||
    normalizedTopic.includes("biology") ||
    normalizedTopic.includes("chemistry") ||
    normalizedTopic.includes("physics")
  ) {
    return "Draw a simple diagram of the idea, label the parts, and explain how they connect in your own words.";
  }

  if (
    normalizedTopic.includes("history") ||
    normalizedTopic.includes("literature")
  ) {
    return "Create a short timeline or outline, then summarize the key events and ideas from memory.";
  }

  return "Break the topic into three smaller questions, study one at a time, and finish by explaining the idea without your notes.";
}

/** Renders interactive quiz, flashcard, and topic-guidance activities. */
export default function StudyPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [studySuggestion, setStudySuggestion] = useState("");
  const currentQuestion = questions[questionIndex];
  const currentCard = flashcards[cardIndex];

  /** Renders an answer choice with feedback for the current quiz question. */
  function renderAnswerOption(answer: string) {
    return (
      <button
        key={answer}
        value={answer}
        type="button"
        onClick={handleAnswer}
        disabled={selectedAnswer !== null}
        className={`rounded-lg border px-4 py-3 text-left transition disabled:cursor-default ${
          selectedAnswer === answer
            ? answer === currentQuestion.answer
              ? "border-green-600 bg-green-50 text-green-900"
              : "border-red-300 bg-red-50 text-red-900"
            : selectedAnswer !== null && answer === currentQuestion.answer
              ? "border-green-600 bg-green-50 text-green-900"
              : "border-slate-200 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        {answer}
      </button>
    );
  }

  /** Records the student's selected answer for the current quiz question. */
  function handleAnswer(event: MouseEvent<HTMLButtonElement>) {
    if (selectedAnswer !== null) {
      return;
    }

    const answer = event.currentTarget.value;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
  }

  /** Advances the quiz or displays the final score when it is complete. */
  function handleNextQuestion() {
    if (questionIndex === questions.length - 1) {
      setQuizComplete(true);
      return;
    }

    setQuestionIndex(questionIndex + 1);
    setSelectedAnswer(null);
  }

  /** Resets the quiz so the student can try it again. */
  function handleRestartQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizComplete(false);
  }

  /** Reveals or hides the current flashcard's definition. */
  function handleFlipCard() {
    setIsCardRevealed(!isCardRevealed);
  }

  /** Moves to the next flashcard and returns it to its question side. */
  function handleNextCard() {
    setCardIndex((cardIndex + 1) % flashcards.length);
    setIsCardRevealed(false);
  }

  /** Uses the submitted topic to show a matching study suggestion. */
  function handleTopicSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const topic = String(formData.get("topic") ?? "").trim();

    if (!topic) {
      return;
    }

    setSubmittedTopic(topic);
    setStudySuggestion(getStudySuggestion(topic));
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-extrabold text-blue-800">
            COMPA
          </a>
          <a href="/" className="font-semibold text-blue-700 hover:text-blue-900">
            Back to home
          </a>
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-12">
          <p className="font-semibold uppercase tracking-widest text-blue-700">
            Your learning space
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
            Practice, review, and plan
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Try a short quiz, review a flashcard, or enter a subject to get a
            study suggestion tailored to your topic.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Quick quiz
            </p>
            <h2 className="mt-2 text-2xl font-bold">Check your knowledge</h2>

            {quizComplete ? (
              <div className="mt-6" aria-live="polite">
                <p className="text-lg">
                  You scored{" "}
                  <strong>
                    {score} out of {questions.length}
                  </strong>
                  .
                </p>
                <p className="mt-2 text-slate-600">
                  Every attempt is a chance to learn something new.
                </p>
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <p className="mt-5 text-sm text-slate-500">
                  Question {questionIndex + 1} of {questions.length}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {currentQuestion.prompt}
                </h3>
                <div className="mt-5 grid gap-3">
                  {currentQuestion.options.map(renderAnswerOption)}
                </div>
                {selectedAnswer !== null && (
                  <div className="mt-4" aria-live="polite">
                    <p className="text-sm text-slate-600">
                      {currentQuestion.explanation}
                    </p>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="mt-4 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                    >
                      {questionIndex === questions.length - 1
                        ? "See my score"
                        : "Next question"}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Flashcards
            </p>
            <h2 className="mt-2 text-2xl font-bold">Review a concept</h2>
            <p className="mt-5 text-sm text-slate-500">
              Card {cardIndex + 1} of {flashcards.length}
            </p>
            <button
              type="button"
              onClick={handleFlipCard}
              aria-label={isCardRevealed ? "Show flashcard question" : "Reveal flashcard answer"}
              className="mt-2 flex min-h-44 w-full items-center justify-center rounded-xl bg-blue-50 p-6 text-center text-xl font-semibold text-blue-950 transition hover:bg-blue-100"
            >
              {isCardRevealed ? currentCard.back : currentCard.front}
            </button>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleFlipCard}
                className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
              >
                {isCardRevealed ? "Show question" : "Reveal answer"}
              </button>
              <button
                type="button"
                onClick={handleNextCard}
                className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Next card
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Study suggestion
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              What are you learning today?
            </h2>
            <form onSubmit={handleTopicSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="study-topic">
                Enter a subject or topic
              </label>
              <input
                id="study-topic"
                name="topic"
                required
                maxLength={80}
                placeholder="For example: algebra, biology, or history"
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Get a suggestion
              </button>
            </form>
            {studySuggestion && (
              <div className="mt-5 rounded-xl bg-blue-50 p-5" aria-live="polite">
                <h3 className="font-bold text-blue-950">
                  A study idea for “{submittedTopic}”
                </h3>
                <p className="mt-2 leading-7 text-blue-900">{studySuggestion}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
