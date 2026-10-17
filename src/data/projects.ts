// Every project / service page lives here. Each entry gets its own page at
//   /<brand>/<slug>/   e.g. /lab/whatsapp-assistant/
// To add a page: copy an entry, change the fields, done.
// Entries with `sample: true` are placeholders — replace or delete them before launch.

import type { BrandId } from "./brands";

export type ProjectStatus =
  | "available" // a service you can order today
  | "idea"
  | "prototype"
  | "in-progress"
  | "live"
  | "archived";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  available: "Available now",
  idea: "Idea",
  prototype: "Prototype",
  "in-progress": "In progress",
  live: "Live",
  archived: "Archived",
};

export interface Project {
  slug: string; // must not be "about" or "contact"
  brand: BrandId;
  name: string;
  status: ProjectStatus;
  summary: string; // one line for cards and SEO
  problem: string; // what's hard today
  vision: string; // where this is going
  idea: string; // how we approach it
  forWho?: string[];
  features: string[];
  tech?: string[];
  repoUrl?: string;
  demoUrl?: string;
  sample?: boolean;
}

export const PROJECTS: Project[] = [
  // ───────── Services ─────────
  {
    slug: "management-systems",
    brand: "services",
    name: "Business management systems",
    status: "available",
    summary: "Stock, sales, billing, customers and reports in one simple system built around your business.",
    problem:
      "Records are split across notebooks, Excel files and WhatsApp chats. Stock doesn't match, bills get missed, and month-end reports take days.",
    vision:
      "One place where you can see what's happening in your business today, without hunting through papers.",
    idea:
      "We learn how your business really runs, then build only the screens you need. We start small with the most painful part, and add more once that works well.",
    forWho: ["Retail and medical stores", "Dairy and livestock farms", "Small factories and workshops", "Service businesses"],
    features: [
      "Stock and inventory tracking",
      "Sales, billing and invoices",
      "Customer and supplier records",
      "Staff roles and permissions",
      "Daily, monthly and custom reports",
      "Export to Excel / PDF",
    ],
    tech: ["Next.js", "PostgreSQL", "GraphQL / REST"],
  },
  {
    slug: "websites-and-web-apps",
    brand: "services",
    name: "Websites & web apps",
    status: "available",
    summary: "Fast, clear websites and web apps that work well on phones and are easy to find on Google.",
    problem:
      "An old, slow or confusing website makes people leave, and a business with no website is hard to trust.",
    vision: "A website that explains what you do in seconds and turns visitors into conversations.",
    idea:
      "We write the words with you first, then design around them. Every page is fast, mobile-friendly and set up for search engines from day one.",
    forWho: ["New businesses", "Professionals and portfolios", "Products that need a landing page", "Teams needing an internal tool"],
    features: [
      "Business and portfolio websites",
      "Landing pages for products",
      "Dashboards and admin panels",
      "Customer portals",
      "Contact and booking forms",
      "SEO basics and speed tuning",
    ],
    tech: ["Next.js", "React", "Netlify / Vercel"],
  },
  {
    slug: "ai-and-automation",
    brand: "services",
    name: "AI & automation",
    status: "available",
    summary: "Practical AI features and automations that save your team real hours, tested honestly.",
    problem:
      "Your team repeats the same tasks every day: copying data, answering the same questions, sorting documents.",
    vision: "Let software do the boring parts so people can focus on the work that needs them.",
    idea:
      "We start with a small proof of concept to see if AI really fits the problem. We show you the results, including where it makes mistakes, before building it into your workflow.",
    forWho: ["Teams with repetitive admin work", "Businesses with lots of documents", "Products adding AI features"],
    features: [
      "AI assistants and chatbots on your own data",
      "Document reading and sorting",
      "Search that understands meaning",
      "Workflow automations and bots",
      "Connecting AI tools to your systems (MCP)",
      "Clear reports on accuracy and limits",
    ],
    tech: ["LLM APIs", "RAG & embeddings", "Python", "MCP"],
  },
  {
    slug: "apis-and-backend",
    brand: "services",
    name: "APIs, backend & fixes",
    status: "available",
    summary: "Backends, databases, integrations, and fixing or speeding up software you already have.",
    problem:
      "Your app is slow, breaks in strange ways, or can't talk to the other tools you use.",
    vision: "Software that runs quietly in the background and just works.",
    idea:
      "We read the existing code first, find the real cause, and fix it in small, safe steps with notes you can keep.",
    forWho: ["Startups with a growing product", "Teams with an older codebase", "Anyone connecting two systems"],
    features: [
      "REST and GraphQL APIs",
      "Database design and migrations",
      "Login, roles and permissions",
      "Third-party integrations and webhooks",
      "Bug fixing and performance work",
      "Deployment and handover docs",
    ],
    tech: ["Node.js", "PostgreSQL", "Hasura", "GraphQL"],
  },
];

export function projectsFor(brand: BrandId): Project[] {
  return PROJECTS.filter((p) => p.brand === brand);
}

export function getProject(brand: BrandId, slug: string): Project | undefined {
  return PROJECTS.find((p) => p.brand === brand && p.slug === slug);
}
