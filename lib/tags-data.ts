export interface Tag {
  slug: string;
  name: string;
  description: string;
  isTrending: boolean;
}

export const tagsData: Tag[] = [
  {
    slug: "ai-agents",
    name: "AI Agents",
    description: "Autonomous AI systems that can plan, reason, and execute multi-step tasks with minimal human input.",
    isTrending: true,
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Techniques and best practices for writing effective prompts to get better results from AI models.",
    isTrending: true,
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    description: "Guides, tutorials, and use cases for getting the most out of OpenAI's ChatGPT.",
    isTrending: true,
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    description: "Resources for creating stunning AI-generated images and visuals with Midjourney.",
    isTrending: true,
  },
  {
    slug: "no-code",
    name: "No-code",
    description: "Build automations, workflows, and AI-powered apps without writing a single line of code.",
    isTrending: false,
  },
  {
    slug: "automation",
    name: "Automation",
    description: "Use AI to automate repetitive tasks, workflows, and business processes.",
    isTrending: true,
  },
  {
    slug: "ai-writing",
    name: "AI Writing",
    description: "AI tools and guides for content creation, copywriting, and editing at scale.",
    isTrending: false,
  },
  {
    slug: "workflow",
    name: "Workflow",
    description: "Step-by-step AI workflows for real tasks — from content creation to lead generation.",
    isTrending: false,
  },
  {
    slug: "ai-for-business",
    name: "AI for Business",
    description: "Practical AI applications and strategies for professionals and business teams.",
    isTrending: true,
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "AI tools and techniques that help you get more done in less time.",
    isTrending: true,
  },
  {
    slug: "ai-image-generation",
    name: "AI Image Generation",
    description: "Create photorealistic images, renders, and visuals with AI image generation tools.",
    isTrending: true,
  },
  {
    slug: "rag",
    name: "RAG",
    description: "Retrieval-Augmented Generation — connecting AI models to your own data and knowledge bases.",
    isTrending: false,
  },
];
