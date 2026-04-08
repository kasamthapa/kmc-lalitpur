"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { IconChevronRight, IconClock, IconCheck, IconArrow, IconX } from "../components/icons";

// ─── Data ────────────────────────────────────────────────────────────────────

const streams: Record<string, string[]> = {
  Science: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
  Management: ["Accountancy", "Economics", "Business Studies", "Mathematics"],
  Law: ["Constitutional Law", "Criminal Law", "Legal Studies"],
};

type Question = {
  id: number;
  q: string;
  options: string[];
  answer: number;
};

const questionBank: Record<string, Question[]> = {
  Physics: [
    { id: 1, q: "The SI unit of force is:", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1 },
    { id: 2, q: "Which law states F = ma?", options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Hooke's Law"], answer: 1 },
    { id: 3, q: "The speed of light in vacuum is approximately:", options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], answer: 1 },
    { id: 4, q: "Energy stored in a stretched spring is:", options: ["Kinetic energy", "Potential energy", "Thermal energy", "Chemical energy"], answer: 1 },
    { id: 5, q: "Which of the following is a vector quantity?", options: ["Mass", "Temperature", "Velocity", "Speed"], answer: 2 },
    { id: 6, q: "The unit of electrical resistance is:", options: ["Ampere", "Volt", "Ohm", "Watt"], answer: 2 },
    { id: 7, q: "Total internal reflection occurs when:", options: ["Light goes from rare to dense medium", "Light goes from dense to rare medium at critical angle", "Angle of incidence equals angle of refraction", "The medium is transparent"], answer: 1 },
    { id: 8, q: "The work done by gravity on a horizontally moving object is:", options: ["Positive", "Negative", "Zero", "Depends on mass"], answer: 2 },
    { id: 9, q: "Wavelength of visible light ranges approximately from:", options: ["10–100 nm", "100–400 nm", "400–700 nm", "700–1000 nm"], answer: 2 },
    { id: 10, q: "Ohm's Law states that V = IR. What is I?", options: ["Voltage", "Resistance", "Current", "Power"], answer: 2 },
    { id: 11, q: "Which lens is used to correct myopia?", options: ["Convex lens", "Concave lens", "Plano-convex", "Bifocal"], answer: 1 },
    { id: 12, q: "The escape velocity from Earth's surface is approximately:", options: ["7.9 km/s", "11.2 km/s", "15.4 km/s", "9.8 km/s"], answer: 1 },
    { id: 13, q: "Sound waves are:", options: ["Transverse waves", "Electromagnetic waves", "Longitudinal waves", "Light waves"], answer: 2 },
    { id: 14, q: "Boyle's Law relates pressure to:", options: ["Temperature (constant volume)", "Volume (constant temperature)", "Density", "Molecular speed"], answer: 1 },
    { id: 15, q: "The half-life of Carbon-14 is approximately:", options: ["1,000 years", "5,730 years", "10,000 years", "100 years"], answer: 1 },
  ],
  Chemistry: [
    { id: 1, q: "The atomic number of Carbon is:", options: ["4", "6", "8", "12"], answer: 1 },
    { id: 2, q: "Which gas is produced when zinc reacts with dilute H₂SO₄?", options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"], answer: 2 },
    { id: 3, q: "pH of pure water at 25°C is:", options: ["0", "7", "14", "1"], answer: 1 },
    { id: 4, q: "The molecular formula of glucose is:", options: ["C₆H₁₂O₅", "C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "CH₂O"], answer: 1 },
    { id: 5, q: "NaCl is an example of:", options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"], answer: 1 },
    { id: 6, q: "The noble gas configuration makes an element:", options: ["Very reactive", "Chemically inert", "A good conductor", "Magnetic"], answer: 1 },
    { id: 7, q: "Avogadro's number is:", options: ["6.022 × 10²¹", "6.022 × 10²³", "6.022 × 10²⁵", "6.022 × 10²²"], answer: 1 },
    { id: 8, q: "The most electronegative element is:", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], answer: 2 },
    { id: 9, q: "A reducing agent:", options: ["Gains electrons", "Loses electrons", "Neither gains nor loses", "Accepts a proton"], answer: 1 },
    { id: 10, q: "Organic compounds always contain:", options: ["Nitrogen", "Carbon", "Oxygen", "Hydrogen"], answer: 1 },
  ],
  Biology: [
    { id: 1, q: "The powerhouse of the cell is:", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"], answer: 2 },
    { id: 2, q: "DNA stands for:", options: ["Deoxyribonucleic acid", "Dinitrogen acid", "Deoxyribose amino acid", "Dynamic nitrogen acid"], answer: 0 },
    { id: 3, q: "Photosynthesis takes place in:", options: ["Mitochondria", "Nucleus", "Chloroplast", "Vacuole"], answer: 2 },
    { id: 4, q: "The basic unit of life is:", options: ["Tissue", "Organ", "Cell", "Organism"], answer: 2 },
    { id: 5, q: "Human blood type AB is called:", options: ["Universal donor", "Universal recipient", "Rh positive", "None of the above"], answer: 1 },
    { id: 6, q: "The process by which plants lose water is called:", options: ["Osmosis", "Diffusion", "Transpiration", "Absorption"], answer: 2 },
    { id: 7, q: "Insulin is produced by the:", options: ["Liver", "Kidney", "Pancreas", "Thyroid"], answer: 2 },
    { id: 8, q: "The number of chromosomes in a human cell is:", options: ["23", "46", "44", "24"], answer: 1 },
    { id: 9, q: "Meiosis produces:", options: ["2 identical cells", "4 genetically diverse cells", "8 cells", "1 cell"], answer: 1 },
    { id: 10, q: "Which vitamin is produced by the skin in sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: 3 },
  ],
  Mathematics: [
    { id: 1, q: "The derivative of sin(x) is:", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], answer: 0 },
    { id: 2, q: "∫x dx equals:", options: ["x²", "x²/2 + C", "2x + C", "x + C"], answer: 1 },
    { id: 3, q: "The value of sin(90°) is:", options: ["0", "0.5", "1", "√2/2"], answer: 2 },
    { id: 4, q: "The quadratic formula solves equations of the form:", options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ = 0", "a/x = b"], answer: 1 },
    { id: 5, q: "The value of log₁₀(1000) is:", options: ["2", "3", "4", "10"], answer: 1 },
    { id: 6, q: "π is approximately equal to:", options: ["3.14159", "2.71828", "1.61803", "1.41421"], answer: 0 },
    { id: 7, q: "The sum of angles in a triangle is:", options: ["90°", "180°", "270°", "360°"], answer: 1 },
    { id: 8, q: "The slope of y = 3x + 5 is:", options: ["5", "3", "3/5", "8"], answer: 1 },
    { id: 9, q: "A prime number is divisible by:", options: ["Any integer", "Only 1 and itself", "2 and itself", "All odd numbers"], answer: 1 },
    { id: 10, q: "The Pythagorean theorem: a² + b² =", options: ["c", "c²", "2c", "c³"], answer: 1 },
  ],
  Accountancy: [
    { id: 1, q: "The accounting equation is:", options: ["Assets = Liabilities – Equity", "Assets = Liabilities + Equity", "Equity = Assets + Liabilities", "Liabilities = Assets + Equity"], answer: 1 },
    { id: 2, q: "Depreciation is:", options: ["Gain in asset value", "Loss in asset value", "Cash expense", "Revenue"], answer: 1 },
    { id: 3, q: "A credit entry in accounts payable means:", options: ["Money owed decreases", "Money owed increases", "Asset increases", "Revenue decreases"], answer: 1 },
    { id: 4, q: "Which financial statement shows profitability?", options: ["Balance Sheet", "Cash Flow Statement", "Income Statement", "Trial Balance"], answer: 2 },
    { id: 5, q: "FIFO stands for:", options: ["First In, First Out", "Fast Input, First Output", "Final Inventory First Out", "Fixed Interest Fixed Operations"], answer: 0 },
  ],
  Economics: [
    { id: 1, q: "When price increases and demand falls, this illustrates:", options: ["Supply law", "Demand law", "Elasticity paradox", "Market equilibrium"], answer: 1 },
    { id: 2, q: "GDP stands for:", options: ["General Domestic Product", "Gross Domestic Product", "Global Development Plan", "Government Domestic Plan"], answer: 1 },
    { id: 3, q: "Inflation means:", options: ["Falling prices", "Rising unemployment", "Rising price levels", "Increasing GDP"], answer: 2 },
    { id: 4, q: "A monopoly has:", options: ["Many sellers", "Only one seller", "Two sellers", "No sellers"], answer: 1 },
    { id: 5, q: "Opportunity cost is:", options: ["The monetary cost of a good", "The value of the next best alternative forgone", "The total cost of production", "Fixed cost"], answer: 1 },
  ],
};

// Fallback questions for subjects not in bank
const fallbackQuestions: Question[] = [
  { id: 1, q: "This is a sample question for this subject.", options: ["Option A", "Option B", "Option C", "Option D"], answer: 0 },
  { id: 2, q: "Another sample question in this topic area.", options: ["First", "Second", "Third", "Fourth"], answer: 1 },
  { id: 3, q: "Choose the correct answer below:", options: ["Wrong", "Correct", "Also wrong", "Also wrong"], answer: 1 },
  { id: 4, q: "Which of the following is true?", options: ["Statement A", "Statement B", "Statement C", "Statement D"], answer: 2 },
  { id: 5, q: "The final sample question.", options: ["Yes", "No", "Maybe", "None"], answer: 0 },
];

type Stage = "select" | "test" | "result";

function getQuestions(subject: string, count: number): Question[] {
  const pool = questionBank[subject] ?? fallbackQuestions;
  return pool.slice(0, Math.min(count, pool.length));
}

function useTimer(seconds: number, running: boolean) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, [running, remaining]);
  return remaining;
}

export default function MockTestPage() {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedStream, setSelectedStream] = useState("Science");
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [questionCount, setQuestionCount] = useState(10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timerRunning, setTimerRunning] = useState(false);
  const remaining = useTimer(questionCount * 60 * 2, timerRunning);

  function startTest() {
    const qs = getQuestions(selectedSubject, questionCount);
    setQuestions(qs);
    setCurrent(0);
    setAnswers({});
    setTimerRunning(true);
    setStage("test");
  }

  function submitTest() {
    setTimerRunning(false);
    setStage("result");
  }

  function restart() {
    setStage("select");
    setTimerRunning(false);
  }

  const score = questions.filter((q) => answers[q.id] === q.answer).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 50;

  const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");

  // ── Selection Screen ────────────────────────────────────────────────────────
  if (stage === "select") {
    return (
      <main className="bg-white">
        <Header />
        <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
              <Link href="/" className="hover:text-amber-400 transition">Home</Link>
              <IconChevronRight size={14} />
              <span className="text-amber-400 font-semibold">Mock Test</span>
            </div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">Practice Exams</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Mock Test</h1>
            <p className="text-xl text-[#8ba7c7]">Prepare for your NEB exams with subject-wise practice tests.</p>
          </div>
        </section>

        <section className="py-20 bg-[#f7f5f0]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl border border-[#eae6de] shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-8">Configure Your Test</h2>

              {/* Stream */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">Select Stream</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.keys(streams).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedStream(s);
                        setSelectedSubject(streams[s][0]);
                      }}
                      className={`py-3 rounded-xl text-sm font-semibold transition border-2 ${
                        selectedStream === s
                          ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                          : "border-[#eae6de] bg-[#f7f5f0] text-[#374151] hover:border-[#0B1F3A]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">Select Subject</label>
                <div className="flex flex-wrap gap-3">
                  {streams[selectedStream].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                        selectedSubject === sub
                          ? "border-amber-400 bg-amber-400 text-[#0B1F3A]"
                          : "border-[#eae6de] bg-[#f7f5f0] text-[#374151] hover:border-amber-300"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">Number of Questions</label>
                <div className="flex gap-3">
                  {[10, 20, 30].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition border-2 ${
                        questionCount === n
                          ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                          : "border-[#eae6de] bg-[#f7f5f0] text-[#374151] hover:border-[#0B1F3A]"
                      }`}
                    >
                      {n} Questions
                      <span className="block text-xs opacity-70 font-normal">{n * 2} min</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#f7f5f0] rounded-xl p-5 mb-8 border border-[#eae6de]">
                <h3 className="text-sm font-semibold text-[#6b7280] mb-3 uppercase tracking-wider">Test Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-[#0B1F3A]">{selectedStream}</div>
                    <div className="text-xs text-[#6b7280]">Stream</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0B1F3A]">{selectedSubject}</div>
                    <div className="text-xs text-[#6b7280]">Subject</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0B1F3A]">{questionCount * 2} min</div>
                    <div className="text-xs text-[#6b7280]">Duration</div>
                  </div>
                </div>
              </div>

              <button
                onClick={startTest}
                className="w-full py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d54] transition flex items-center justify-center gap-2 text-lg"
              >
                Start Test
                <IconArrow size={20} />
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  // ── Test Screen ─────────────────────────────────────────────────────────────
  if (stage === "test") {
    const q = questions[current];
    const answered = Object.keys(answers).length;

    return (
      <main className="bg-[#f7f5f0] min-h-screen">
        {/* Test Header */}
        <div className="bg-[#0B1F3A] text-white px-4 py-4 fixed top-0 left-0 right-0 z-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8ba7c7]">{selectedStream} · {selectedSubject}</p>
              <p className="font-bold">Mock Test</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg ${remaining < 60 ? "bg-red-500" : "bg-white/10"}`}>
              <IconClock size={18} />
              {mm}:{ss}
            </div>
            <div className="text-sm text-right">
              <p className="text-[#8ba7c7]">Answered</p>
              <p className="font-bold">{answered} / {questions.length}</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Panel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#eae6de] shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    Question {current + 1} of {questions.length}
                  </span>
                  {answers[q.id] !== undefined && (
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                      Answered
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#f7f5f0] rounded-full h-1.5 mb-8">
                  <div
                    className="bg-amber-400 h-1.5 rounded-full transition-all"
                    style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <h2 className="text-xl font-bold text-[#0B1F3A] mb-8 leading-snug">{q.q}</h2>

                <div className="space-y-3">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers({ ...answers, [q.id]: i })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition font-medium ${
                        answers[q.id] === i
                          ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                          : "border-[#eae6de] bg-[#f7f5f0] text-[#374151] hover:border-[#0B1F3A] hover:bg-white"
                      }`}
                    >
                      <span className={`inline-block w-7 h-7 rounded-full text-xs font-bold mr-3 text-center leading-7 ${
                        answers[q.id] === i ? "bg-white/20 text-white" : "bg-white text-[#374151]"
                      }`}>
                        {["A", "B", "C", "D"][i]}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Nav */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#eae6de]">
                  <button
                    onClick={() => setCurrent(Math.max(0, current - 1))}
                    disabled={current === 0}
                    className="px-5 py-2.5 rounded-xl border border-[#eae6de] text-sm font-semibold text-[#374151] disabled:opacity-40 hover:bg-[#f7f5f0] transition"
                  >
                    ← Previous
                  </button>
                  {current < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrent(current + 1)}
                      className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#162d54] transition"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={submitTest}
                      className="px-6 py-2.5 rounded-xl bg-amber-400 text-[#0B1F3A] font-bold text-sm hover:bg-amber-300 transition"
                    >
                      Submit Test
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Map */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#eae6de] shadow-sm p-5 sticky top-24">
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-4">Question Map</h3>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {questions.map((qs, i) => (
                    <button
                      key={qs.id}
                      onClick={() => setCurrent(i)}
                      className={`h-9 rounded-lg text-xs font-bold transition ${
                        i === current
                          ? "bg-[#0B1F3A] text-white"
                          : answers[qs.id] !== undefined
                          ? "bg-amber-400 text-[#0B1F3A]"
                          : "bg-[#f7f5f0] text-[#374151] hover:bg-[#eae6de]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#0B1F3A]" />
                    <span className="text-[#6b7280]">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-400" />
                    <span className="text-[#6b7280]">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#f7f5f0] border" />
                    <span className="text-[#6b7280]">Not visited</span>
                  </div>
                </div>
                <button
                  onClick={submitTest}
                  className="mt-6 w-full py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition text-sm"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Result Screen ───────────────────────────────────────────────────────────
  return (
    <main className="bg-[#f7f5f0] min-h-screen">
      <Header />
      <div className="pt-28 pb-16 max-w-3xl mx-auto px-4">
        {/* Score Card */}
        <div className="bg-white rounded-2xl border border-[#eae6de] shadow-lg overflow-hidden mb-8">
          <div className={`px-8 py-12 text-center text-white ${passed ? "bg-[#0B1F3A]" : "bg-red-700"}`}>
            <div className="text-7xl font-bold mb-2">{pct}%</div>
            <div className="text-xl font-semibold mb-1">{passed ? "🎉 Passed!" : "📚 Keep Practicing"}</div>
            <div className="text-[#8ba7c7] text-sm">
              {score} correct out of {questions.length} questions
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-3 gap-6 text-center mb-8">
              <div>
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-[#6b7280]">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">{questions.length - score}</div>
                <div className="text-sm text-[#6b7280]">Incorrect</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0B1F3A]">{questions.length}</div>
                <div className="text-sm text-[#6b7280]">Total</div>
              </div>
            </div>

            {/* Answer Review */}
            <h3 className="font-bold text-[#0B1F3A] mb-4 text-lg">Answer Review</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {questions.map((q, i) => {
                const userAns = answers[q.id];
                const correct = userAns === q.answer;
                return (
                  <div key={q.id} className={`p-4 rounded-xl border ${correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                    <p className="text-sm font-semibold text-[#0B1F3A] mb-2">Q{i + 1}. {q.q}</p>
                    {userAns !== undefined ? (
                      <p className="text-xs text-[#374151]">
                        Your answer: <span className={correct ? "text-green-600 font-bold" : "text-red-500 font-bold"}>{q.options[userAns]}</span>
                        {!correct && <span className="text-green-600 font-bold ml-2">· Correct: {q.options[q.answer]}</span>}
                      </p>
                    ) : (
                      <p className="text-xs text-[#6b7280]">Not answered · Correct: <span className="text-green-600 font-bold">{q.options[q.answer]}</span></p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={startTest}
            className="flex-1 py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d54] transition flex items-center justify-center gap-2"
          >
            Retry Same Test
          </button>
          <button
            onClick={restart}
            className="flex-1 py-4 border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#0B1F3A] hover:text-white transition flex items-center justify-center gap-2"
          >
            Choose Different Test
          </button>
        </div>
      </div>
    </main>
  );
}
