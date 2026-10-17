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

interface ProjectBase {
  slug: string; // must not be "about" or "contact"
  name: string;
  status: ProjectStatus;
  summary: string; // one line for cards and SEO
  problem: string; // what's hard today
  vision: string; // where this is going
  idea: string; // how we approach it
  forWho?: string[];
  features: string[];
  steps?: string[];
  contactTopic?: string; // optional short query value for the contact form
  tech?: string[];
  repoUrl?: string;
  demoUrl?: string;
  sample?: boolean;
}

export type ProductPlatform = "android" | "ios" | "web" | "desktop" | "private";

export interface ProductProject extends ProjectBase {
  brand: "products";
  platforms?: ProductPlatform[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  webUrl?: string;
  downloadUrl?: string;
}

export interface OtherProject extends ProjectBase {
  brand: Exclude<BrandId, "products">;
}

export type Project = ProductProject | OtherProject;

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
    forWho: ["New businesses", "Professionals and portfolios", "Teams launching a new app", "Teams needing an internal tool"],
    features: [
      "Business and portfolio websites",
      "Landing pages for new apps",
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
    forWho: ["Teams with repetitive admin work", "Businesses with lots of documents", "Teams adding AI features"],
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
    forWho: ["Startups with a growing app", "Teams with an older codebase", "Anyone connecting two systems"],
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
  {
    slug: "bug-fixes",
    brand: "services",
    name: "Bug fixes & technical support",
    status: "available",
    summary: "Website slow or broken? App crashing? We find the problem and fix it, at a clear price.",
    problem: "Your website or app stopped working, loads slowly, or shows errors, and the developer who built it isn't available.",
    vision: "Software you can rely on, and someone to call when it breaks.",
    idea: "We look at the problem first, tell you what's wrong in simple words, give a fixed price, then fix and test it with you. You only pay when it works.",
    forWho: [
      "Shops and businesses with a website or app",
      "Owners whose old developer is unavailable",
      "Startups that need quick fixes",
      "Anyone with a slow or broken site",
    ],
    features: [
      "Broken pages, errors and crashes",
      "Slow websites and apps",
      "Login, payment and form problems",
      "WordPress, React, Next.js and Node.js fixes",
      "Database and API errors",
      "Hosting, domain and SSL issues",
      "Mobile layout problems",
      "Urgent fixes when your site is down",
    ],
    steps: [
      "Tell us the problem",
      "We check it",
      "You get a fixed price",
      "We fix and test",
      "You pay when it works",
    ],
    contactTopic: "fix",
    tech: ["Next.js", "React", "Node.js", "WordPress", "PostgreSQL"],
  },
  // ───────── Products ─────────
  {
    slug: "farm-manager",
    brand: "products",
    name: "Farm Manager",
    status: "idea",
    platforms: ["android", "web"],
    summary: "Animals, milk, feed, expenses and reports for small farms.",
    problem: "Farm records often live in notebooks and scattered messages. It is hard to see what each animal costs or how much milk the farm produced this month.",
    vision: "A small farm can see its daily work and costs in one clear place.",
    idea: "Start with quick daily entries for animals, milk, feed and expenses, then turn those records into useful reports.",
    features: ["Animal records", "Milk production logs", "Feed and expense tracking", "Simple farm reports"],
  },
  {
    slug: "shop-manager",
    brand: "products",
    name: "Shop Manager",
    status: "idea",
    platforms: ["android", "web"],
    summary: "Stock, billing and daily sales for small shops and medical stores.",
    problem: "A busy shop can lose track of stock and sales when everything is written in separate books or spreadsheets.",
    vision: "Shop owners can answer what sold, what is left and what needs restocking without extra paperwork.",
    idea: "Keep stock, bills and daily sales together in a simple app that works on a phone or in a browser.",
    features: ["Stock counts and low-stock alerts", "Simple bills", "Daily sales totals", "Basic reports"],
  },
  {
    slug: "khata",
    brand: "products",
    name: "Khata",
    status: "idea",
    platforms: ["android"],
    summary: "A simple digital ledger for money owed and payment reminders.",
    problem: "It is easy to forget who owes you, who you owe, and when a payment was made if the record stays in a notebook.",
    vision: "One clear place to see balances and follow up without awkward guesswork.",
    idea: "Record each amount as it happens and set gentle reminders for payments you want to check on.",
    features: ["People and balances", "Money-in and money-out entries", "Payment history", "Optional reminders"],
  },
  {
    slug: "maya",
    brand: "products",
    name: "Maya",
    status: "prototype",
    platforms: ["private"],
    summary: "A study assistant that spots quiz and assignment dates in group chats and reminds you.",
    problem: "Important class dates can disappear in a long group chat before you have time to add them to your calendar.",
    vision: "Students get a calm reminder of upcoming work without rereading every message.",
    idea: "With permission, Maya looks for dates in selected chats, lets you confirm what it found, and reminds you before a deadline.",
    features: ["Quiz and assignment date suggestions", "Review before saving", "Deadline reminders", "Private invite-only access"],
  },
  {
    slug: "diskern",
    brand: "products",
    name: "Diskern",
    status: "idea",
    platforms: ["desktop"],
    summary: "A safe disk cleaner that explains every action before it happens.",
    problem: "Disk cleanup tools can be hard to trust when they ask to delete files without saying what they are or why it is safe.",
    vision: "Free up space while staying in control of every change.",
    idea: "Show what could be cleaned, explain each item in plain words, and ask before removing anything.",
    features: ["Clear cleanup preview", "Plain-word explanations", "Choose what to keep", "Confirmation before deletion"],
  },
];

export function projectsFor(brand: BrandId): Project[] {
  return PROJECTS.filter((p) => p.brand === brand);
}

export function getProject(brand: BrandId, slug: string): Project | undefined {
  return PROJECTS.find((p) => p.brand === brand && p.slug === slug);
}
