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
  repositoryName?: string; // resolves visibility and URL from the repository catalog
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
    slug: "dairy-farm",
    brand: "services",
    name: "Dairy Farm",
    status: "in-progress",
    summary: "A client-paid farm management app with a public demo using invented records.",
    problem: "Milk, animal, customer and expense records are difficult to reconcile when they live in separate notebooks and messages.",
    vision: "Give farm staff a clear view of daily operations and monthly balances.",
    idea: "Keep farm records in one Roman Urdu web app, with a separate demo database so real client data stays private.",
    features: ["Animal and milk-shift records", "Customer balances, bills and payments", "Expenses, salaries and account ledger", "Reports and exports"],
    repositoryName: "dairy-farm",
    demoUrl: "https://demo-dairy-app.netlify.app/",
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
    name: "APIs & backend",
    status: "available",
    summary: "APIs, databases and integrations that keep your app and tools working together.",
    problem:
      "Your app needs reliable data and a way to share it with the other tools your team uses.",
    vision: "A dependable backend that moves the right data to the right place.",
    idea:
      "We map the data and connections you need, then build a clear API and database foundation you can maintain.",
    forWho: ["Startups with a growing app", "Teams with an older codebase", "Anyone connecting two systems"],
    features: [
      "REST and GraphQL APIs",
      "Database design and migrations",
      "Login, roles and permissions",
      "Third-party integrations and webhooks",
      "Background jobs and data sync",
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
    slug: "one-concept",
    brand: "products",
    name: "One Concept",
    status: "live",
    platforms: ["android"],
    summary: "A short technical concept each day, with examples, reminders and a learning streak.",
    problem: "It is hard to keep learning when every lesson feels too long to fit into the day.",
    vision: "Make steady technical learning possible in a few minutes a day.",
    idea: "Deliver one focused concept with a concrete example, then let learners track what they have learned.",
    features: ["One new concept each day", "Short explanations with examples", "Optional reminders", "Streaks and learning history"],
    repositoryName: "one-concept",
    downloadUrl: "https://github.com/Coding-Moves/one-concept/releases/download/apk-latest/one-concept.apk",
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
  // ───────── Lab ─────────
  {
    slug: "qirat",
    brand: "lab",
    name: "Qirat",
    status: "idea",
    summary: "An early idea for AI-assisted Quran memorization practice; no app is built yet.",
    problem: "Learners practising alone may want timely feedback and a clear record of their memorization progress.",
    vision: "Explore whether careful recitation feedback can support learners alongside guidance from a teacher.",
    idea: "Investigate recitation review and progress tracking, then evaluate feedback accuracy and audio privacy before any release.",
    features: ["Proposed recitation review", "Proposed mistake feedback", "Proposed Hifz progress tracking"],
    repositoryName: "Qirat",
  },
  {
    slug: "maya",
    brand: "lab",
    name: "Maya Assistant",
    status: "prototype",
    summary: "An experimental WhatsApp study assistant; deadline reminders are planned.",
    problem: "Class updates get buried in busy group chats.",
    vision: "Help students keep track of useful information from their chats.",
    idea: "Explore a personal assistant that processes selected messages with the user's permission.",
    features: ["WhatsApp message processing prototype", "Personal assistant experiments", "Reminder workflow planned"],
    repositoryName: "maya-assistant",
  },
  {
    slug: "arion-os",
    brand: "lab",
    name: "Arion OS",
    status: "in-progress",
    summary: "An experimental desktop operating-system project built while studying Haiku's architecture.",
    problem: "Operating-system internals are hard to learn from descriptions alone.",
    vision: "Explore how a desktop system boots, renders applications and manages its components.",
    idea: "Study and adapt a Haiku-based source tree, build an image, and document what each subsystem does.",
    features: ["Kernel and boot source exploration", "Desktop and application-server code", "Custom branding and build instructions"],
    repositoryName: "Arion_OS",
  },
  {
    slug: "smartgate-cam",
    brand: "lab",
    name: "SmartGate Cam",
    status: "idea",
    summary: "An early design for camera-assisted entry, with no working security device yet.",
    problem: "Hands-free entry is convenient, but face matching can make unsafe mistakes.",
    vision: "Test whether an entry system can be both practical and safe before any physical deployment.",
    idea: "Prototype detection and recognition first, then evaluate thresholds, spoofing, privacy and failure behavior before connecting a lock.",
    features: ["Conceptual camera and controller design", "Planned person registration and live view", "Security and privacy questions to resolve"],
    repositoryName: "SmartGate-Cam",
  },
  {
    slug: "pixelguard-ai",
    brand: "lab",
    name: "PixelGuard AI",
    status: "prototype",
    summary: "A media-forensics demo combining metadata, fingerprints and error-level analysis.",
    problem: "One signal cannot establish whether an image was generated or edited.",
    vision: "Present inspectable evidence and uncertainty instead of a definitive authenticity claim.",
    idea: "Run metadata and compression checks in the hosted demo without an AI key; model-assisted analysis requires a key in a local setup.",
    features: ["Metadata and provenance inspection", "Error-level analysis heatmap", "Evidence report with explicit limitations"],
    repositoryName: "PixelGuard-AI",
    demoUrl: "https://pixel-guard-ai-nine.vercel.app/",
  },
  {
    slug: "linear-algebra",
    brand: "lab",
    name: "Linear Algebra",
    status: "in-progress",
    summary: "Private Python exercises implementing matrix operations to practice AI-related mathematics.",
    problem: "Libraries can hide the mechanics of basic matrix operations while learning them.",
    vision: "Build intuition for the operations used in data science and machine learning.",
    idea: "Write matrix routines directly and document the logic behind them.",
    features: ["Matrix addition and multiplication", "Transpose and rank exercises", "Learning notes alongside code"],
    repositoryName: "Linear-Algebra",
  },
  {
    slug: "renpy-sandbox",
    brand: "lab",
    name: "Ren'Py Sandbox",
    status: "prototype",
    summary: "A private visual-novel starter for experimenting with stories and choices.",
    problem: "A new game idea needs a small place to try scenes before becoming a complete game.",
    vision: "Learn visual-novel scripting through short, editable scenes.",
    idea: "Use a Ren'Py project with a starter script and launcher as a game-development sandbox.",
    features: ["Editable story script", "Choice menu example", "Local Ren'Py launch instructions"],
    repositoryName: "Renpy_Sandbox",
  },
  // ───────── Open Source ─────────
  {
    slug: "diskern",
    brand: "open-source",
    name: "Diskern",
    status: "live",
    summary: "A desktop disk cleaner that explains its findings and lets you review changes before cleanup.",
    problem: "Disk cleanup tools can be hard to trust when they ask to delete files without saying what they are or why it is safe.",
    vision: "Free up space while staying in control of every change.",
    idea: "Use auditable rules to assess files, explain the evidence, and move selected items to a reviewable quarantine.",
    features: ["Read-only scans by default", "Evidence behind every finding", "Reviewable quarantine instead of hard deletion", "Separate purge step"],
    repositoryName: "diskern",
    demoUrl: "https://coding-moves.github.io/diskern/",
  },
  {
    slug: "python-challenge",
    brand: "open-source",
    name: "30 Days, 30 Python Projects",
    status: "live",
    summary: "A public beginner contribution challenge with one small Python project per day.",
    problem: "Beginners need approachable exercises and a first contribution they can understand.",
    vision: "Make a small Python project and a friendly pull request a practical first step.",
    idea: "Organize each beginner project in its own folder with code and a short README.",
    features: ["Simple Python exercises", "Community pull requests", "Public code; reuse terms for outside contributions are not yet settled"],
    repositoryName: "30-Days-30-Python-Projects-Beginner-Contributions-Only",
  },
  {
    slug: "leetcode-solutions",
    brand: "open-source",
    name: "LeetCode Solutions",
    status: "live",
    summary: "Original Python solutions for data-structure and algorithm practice.",
    problem: "A passing answer alone does not explain the pattern behind an algorithm.",
    vision: "Keep solution code organized so learners can compare approaches and review patterns.",
    idea: "Publish Python solutions with problem links, summaries and explanatory comments.",
    features: ["Solutions grouped by difficulty", "Algorithm practice notes", "Check the repository's current license for reuse terms"],
    repositoryName: "leetcode-solutions-by-codingmoves",
  },
  // ───────── Research ─────────
  {
    slug: "medical-triage-research",
    brand: "research",
    name: "Roman Urdu Medical Triage Research",
    status: "prototype",
    summary: "A private, offline research prototype for classifying Roman Urdu cardiac complaints.",
    problem: "Roman Urdu complaints are difficult to process consistently in a research workflow.",
    vision: "Study a reproducible language-and-classification pipeline while reporting its limits honestly.",
    idea: "Combine local translation, clinical text embeddings and structured inputs, then compare models on a fixed research dataset.",
    features: ["Local research interface and batch processing", "Documented model comparison", "No clinical validation or patient-care use"],
    repositoryName: "ML_Predictor",
  },
  // ───────── Academy ─────────
  {
    slug: "bsai-projects",
    brand: "academy",
    name: "BSAI Projects",
    status: "live",
    summary: "A public collection of university AI and computer-science coursework.",
    problem: "Course projects are hard to learn from when their scope, setup and authorship are unclear.",
    vision: "Make semester work easier to explore and learn from, with contributor credits preserved.",
    idea: "Keep each project in its own folder with a README covering setup and purpose.",
    features: ["AI, data structures, IoT and web projects", "Project-specific setup guides", "Team credits in individual project documentation"],
    repositoryName: "BSAI-Projects",
  },
  {
    slug: "react-revision",
    brand: "academy",
    name: "React Revision",
    status: "in-progress",
    summary: "Hands-on React practice exercises; the separate capstone is planned.",
    problem: "Reading React concepts without building can leave gaps in practical understanding.",
    vision: "Refresh modern React one small exercise at a time.",
    idea: "Use daily examples to revisit hooks, components and patterns before a future capstone.",
    features: ["Daily React practice folders", "Short build exercises", "Capstone project planned separately"],
    repositoryName: "react-revision",
  },
];

export function projectsFor(brand: BrandId): Project[] {
  return PROJECTS.filter((p) => p.brand === brand);
}

export function getProject(brand: BrandId, slug: string): Project | undefined {
  return PROJECTS.find((p) => p.brand === brand && p.slug === slug);
}

export function projectForRepository(name: string): Project | undefined {
  return PROJECTS.find((p) => p.repositoryName === name);
}
