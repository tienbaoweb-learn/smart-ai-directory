// Plain data module (no "use client") — imported by both AIGlossaryClient
// (visible render) and page.tsx (DefinedTermSet schema), so the two can never
// drift and neither has to import a data export through a client-component
// boundary (which breaks production builds).

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
