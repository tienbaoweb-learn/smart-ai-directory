"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  Brain,
  Layers,
  MessageSquare,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// ─── POPULAR TERM ICON THEMES ─────────────────────────────────────────────────

const TERM_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  purple: { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  blue:   { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  pink:   { iconBg: "bg-pink-50",   iconColor: "text-pink-600"   },
  green:  { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  orange: { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  red:    { iconBg: "bg-red-50",    iconColor: "text-red-500"    },
};

// ─── A-Z GLOSSARY DATA ────────────────────────────────────────────────────────

export const GLOSSARY_TERMS = [
  { term: "AI Agent",                      category: "AI Tools & Platforms",    def: "An AI system that can perform tasks autonomously, often by using tools or making decisions on its own." },
  { term: "API",                           category: "AI Tools & Platforms",    def: "A way for different software programs to communicate with each other, often used to connect AI tools." },
  { term: "Bias (AI Bias)",               category: "AI Ethics",               def: "Unfair or skewed results from an AI model, often caused by imbalanced training data." },
  { term: "Chatbot",                       category: "AI Tools & Platforms",    def: "A program that simulates conversation with users, often powered by AI." },
  { term: "Dataset",                       category: "Machine Learning Basics", def: "A collection of data used to train or test an AI model." },
  { term: "Diffusion Model",              category: "AI Models",               def: "A type of AI model commonly used to generate images by gradually refining random noise." },
  { term: "Fine-tuning",                  category: "Machine Learning Basics", def: "The process of further training an AI model on specific data to improve its performance for a particular task." },
  { term: "Generative AI",               category: "AI Models",               def: "AI that can create new content — text, images, audio, or video — based on patterns it has learned." },
  { term: "GPT",                          category: "AI Models",               def: "Generative Pre-trained Transformer — a type of AI model architecture used in tools like ChatGPT." },
  { term: "Hallucination",               category: "AI Models",               def: "When an AI generates information that sounds plausible but is factually incorrect or made up." },
  { term: "Inference",                    category: "Machine Learning Basics", def: "The process of an AI model generating output based on new input, after it has been trained." },
  { term: "LLM (Large Language Model)",  category: "AI Models",               def: "An AI model trained on massive amounts of text data to understand and generate human-like language." },
  { term: "Machine Learning",            category: "Machine Learning Basics", def: "A field of AI where systems learn patterns from data instead of being explicitly programmed." },
  { term: "Multimodal AI",              category: "AI Models",               def: "AI that can understand and work with multiple types of input, like text, images, and audio together." },
  { term: "No-code AI",                 category: "AI Tools & Platforms",    def: "Tools that let you build AI-powered apps or automations without writing code." },
  { term: "Open-source AI",            category: "AI Models",               def: "AI models whose code and/or weights are publicly available for anyone to use or modify." },
  { term: "Prompt",                       category: "Prompt Engineering",      def: "The input or instruction you give an AI tool to get a specific response or output." },
  { term: "Prompt Engineering",         category: "Prompt Engineering",      def: "The practice of crafting effective inputs to get better results from AI models." },
  { term: "RAG (Retrieval-Augmented Generation)", category: "AI Models",    def: "A technique where an AI model retrieves relevant information before generating a response, improving accuracy." },
  { term: "Synthetic Data",             category: "Machine Learning Basics", def: "Artificially generated data used to train AI models when real data is limited." },
  { term: "Token",                        category: "AI Models",               def: "A piece of text (word or part of a word) that an AI model processes — used to measure input/output length and cost." },
  { term: "Training Data",              category: "Machine Learning Basics", def: "The data used to teach an AI model how to perform a task." },
  { term: "Vector Database",            category: "AI Tools & Platforms",    def: "A database designed to store and search data based on meaning/similarity, often used with AI search and RAG." },
];

// Group terms by first letter
const GROUPED_TERMS = GLOSSARY_TERMS.reduce<Record<string, typeof GLOSSARY_TERMS>>((acc, t) => {
  const letter = t.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(t);
  return acc;
}, {});

const ACTIVE_LETTERS = new Set(Object.keys(GROUPED_TERMS));
const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ─── DATA ─────────────────────────────────────────────────────────────────────

const POPULAR_TERMS = [
  {
    term: "LLM (Large Language Model)",
    icon: Brain,
    theme: "purple",
    category: "AI Models",
    def: "An AI model trained on massive amounts of text data to understand and generate human-like language.",
  },
  {
    term: "Prompt",
    icon: MessageSquare,
    theme: "blue",
    category: "Prompt Engineering",
    def: "The input or instruction you give an AI tool to get a specific response or output.",
  },
  {
    term: "Generative AI",
    icon: Sparkles,
    theme: "pink",
    category: "AI Models",
    def: "AI that can create new content — text, images, audio, or video — based on patterns it has learned.",
  },
  {
    term: "AI Agent",
    icon: Bot,
    theme: "green",
    category: "AI Tools & Platforms",
    def: "An AI system that can perform tasks autonomously, often by using tools or making decisions on its own.",
  },
  {
    term: "Fine-tuning",
    icon: Settings2,
    theme: "orange",
    category: "Machine Learning Basics",
    def: "The process of further training an AI model on specific data to improve its performance for a particular task.",
  },
  {
    term: "Hallucination",
    icon: AlertTriangle,
    theme: "red",
    category: "AI Models",
    def: "When an AI generates information that sounds plausible but is factually incorrect or made up.",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AIGlossaryPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B] scroll-smooth">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">AI Glossary</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="py-10 sm:py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
              AI Terms Explained
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] mt-2">
            AI{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
            >
              Glossary
            </span>
          </h1>

          <p className="text-gray-600 mt-2 max-w-xl">
            Plain-English definitions of AI terms and concepts — no technical background required.
          </p>

          <div className="flex flex-wrap gap-6 mt-3">
            {[
              { icon: BookOpen,   label: "25+ Terms"          },
              { icon: Layers,     label: "8 Categories"       },
              { icon: RefreshCw,  label: "Updated Regularly"  },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-gray-500">
                <Icon size={15} className="text-blue-600 shrink-0" />
                {label}
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex gap-2 mt-4 max-w-xl">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search a term (e.g. LLM, prompt, fine-tuning...)"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Popular Terms ── */}
      <section className="py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Popular Terms</h2>
            <p className="text-sm text-gray-500 mt-1">The most searched AI terms, explained simply.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_TERMS.map(({ term, icon: Icon, theme, category, def }) => {
              const t = TERM_THEME[theme];
              return (
                <div key={term} className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${t.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon size={16} className={t.iconColor} />
                    </div>
                    <p className="font-semibold text-base text-[#1E293B] leading-snug">{term}</p>
                  </div>
                  <p className="text-xs text-blue-600 font-medium mb-1">{category}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{def}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: A-Z Glossary Index ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Browse All Terms</h2>
            <p className="text-sm text-gray-500 mt-1">Explore the full glossary from A to Z.</p>
          </div>

          {/* Sticky letter nav */}
          <div className="sticky top-16 z-10 bg-white/95 backdrop-blur border-b border-gray-100 py-3 mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-1 overflow-x-auto whitespace-nowrap pb-1">
              {ALL_LETTERS.map((letter) => {
                const active = ACTIVE_LETTERS.has(letter);
                return active ? (
                  <a
                    key={letter}
                    href={`#letter-${letter}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0"
                  >
                    {letter}
                  </a>
                ) : (
                  <span
                    key={letter}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-gray-300 cursor-default shrink-0"
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Terms grouped by letter */}
          {ALL_LETTERS.filter((l) => ACTIVE_LETTERS.has(l)).map((letter) => (
            <div key={letter}>
              <h3
                id={`letter-${letter}`}
                className="text-2xl font-bold text-gray-300 border-b border-gray-100 pb-2 mb-3 mt-6 scroll-mt-32"
              >
                {letter}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GROUPED_TERMS[letter].map(({ term, category, def }) => (
                  <div key={term} className="border-b border-gray-100 pb-3">
                    <div className="flex items-baseline flex-wrap gap-x-2">
                      <p className="font-semibold text-base text-gray-900">{term}</p>
                      <span className="text-xs text-blue-600 font-medium">{category}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{def}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
