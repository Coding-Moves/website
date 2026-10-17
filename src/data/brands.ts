// ONE list of every part of Coding Moves.
// Each brand automatically gets its own Home, About and Contact pages,
// its own logo, colour, menu and SEO tags.
//
// To add a new brand later:
//   1. Add an entry here (status: "in-progress" until it's ready).
//   2. Add its colours to scripts/logos.mjs (VARIANTS) and run `npm run logos`.
// That's it — pages, menus and sitemap pick it up.

export type BrandId =
  | "main"
  | "services"
  | "lab"
  | "open-source"
  | "products"
  | "research";

export type BrandStatus = "live" | "in-progress";
export type LegalSection = { heading: string; body: string[] };

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Contact messages",
    body: ["The contact form collects your name, email, chosen topic and message only so we can reply. Netlify Forms handles submissions for us."],
  },
  {
    heading: "Your information",
    body: ["We do not sell your data. To ask us to delete a contact message, use this site's Contact page."],
  },
];

export interface Brand {
  id: BrandId;
  name: string; // full name, e.g. "Coding Moves Lab"
  short: string; // short name, e.g. "Lab"
  path: string; // "" for main, "/lab" for Lab
  status: BrandStatus;
  accent: string; // main colour
  accentSoft: string; // lighter colour for text on dark
  accentDeep: string; // darker colour for text on light
  onAccent: string; // text colour on top of the accent (buttons)
  oneLiner: string; // used on cards + menus
  seoDescription: string;
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    pointsTitle: string;
    points: { title: string; text: string }[];
    steps?: { title: string; text: string }[];
    itemsTitle?: string; // heading above the projects / services list
    itemsIntro?: string;
  };
  about: {
    title: string;
    intro: string;
    vision: string;
    story: string[];
    principles: { title: string; text: string }[];
  };
  contact: {
    title: string;
    intro: string;
    topics: string[]; // options in the "What is this about?" dropdown
    helpful: string[]; // what to include in the message
  };
  terms: LegalSection[];
  privacy: LegalSection[];
}

export const BRANDS: Brand[] = [
  {
    id: "main",
    name: "Coding Moves",
    short: "Coding Moves",
    path: "",
    status: "live",
    accent: "#3B82F6",
    accentSoft: "#7DD3FC",
    accentDeep: "#1D4ED8",
    onAccent: "#ffffff",
    oneLiner: "A small software team that builds, experiments and shares.",
    seoDescription:
      "Coding Moves is a small software team. We build custom software for businesses, run experiments with AI and new tech, and share open-source code.",
    home: {
      eyebrow: "Build · Explore · Impact",
      title: "We build useful software, and we show our work.",
      intro:
        "Coding Moves is a small software team. We build systems for real businesses, test new ideas in our Lab, and share code with the open-source community. Pick the part you came for.",
      primaryCta: { label: "Get software built", href: "/services/" },
      secondaryCta: { label: "See what we're exploring", href: "/lab/" },
      pointsTitle: "How we work, in three lines",
      points: [
        {
          title: "Real problems first",
          text: "We start with what's slowing you down, not with a fancy tech list.",
        },
        {
          title: "Honest about progress",
          text: "Every project shows its real status: idea, prototype, in progress or live.",
        },
        {
          title: "Small steps, big moves",
          text: "We ship in small pieces you can see and use, then improve from there.",
        },
      ],
    },
    about: {
      title: "About Coding Moves",
      intro:
        "Coding Moves started as a place to build and try software ideas. It's growing into a home for client work, experiments, open-source code and our own products.",
      vision:
        "To be a software team people trust because the work is useful, clear and honest, not because the website is loud.",
      story: [
        "We're developers who like solving practical problems: a shop that can't track its stock, a farm that keeps records in notebooks, a team drowning in spreadsheets.",
        "Alongside client work, we keep learning in public. The Lab is where we test AI and new tools. Open Source is where we share code and help other projects. Products is where repeat problems turn into tools anyone can use.",
        "We're building Coding Moves step by step, and this site grows with it. If a section says \"in progress\", it really is.",
      ],
      principles: [
        { title: "Useful over flashy", text: "If it doesn't solve the problem, it doesn't ship." },
        { title: "Clear over clever", text: "Code and explanations that the next person can follow." },
        { title: "Secure by default", text: "Your data and passwords stay protected and private." },
        { title: "Respect for people", text: "Clear scope, fair communication, no surprises." },
      ],
    },
    contact: {
      title: "Talk to Coding Moves",
      intro:
        "Not sure which part of Coding Moves you need? That's fine. Tell us what's on your mind and we'll point you the right way.",
      topics: ["I need software built", "Collaboration", "Open source", "Something else"],
      helpful: ["Who you are", "What you'd like to do", "Any links that help us understand"],
    },
    terms: [
      { heading: "Using this site", body: ["This site introduces our work and gives you a way to contact us. Its content may change as the team and projects develop."] },
      { heading: "Working together", body: ["Any paid work needs a separate written agreement covering scope, timing, payment and ownership."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "services",
    name: "Coding Moves Services",
    short: "Services",
    path: "/services",
    status: "live",
    accent: "#F59E0B",
    accentSoft: "#FCD34D",
    accentDeep: "#B45309",
    onAccent: "#1C1104",
    oneLiner: "Custom software for businesses: systems, websites, AI and automation.",
    seoDescription:
      "Custom software for small and growing businesses: management systems, websites, web apps, APIs, AI features and automation. Explained in plain words.",
    home: {
      eyebrow: "Coding Moves Services",
      title: "Software that fits how your business actually works.",
      intro:
        "Still running stock, sales or bookings on paper, Excel and WhatsApp? We build simple, custom systems that keep everything in one place, and we explain every step in plain words.",
      primaryCta: { label: "Tell us what you need", href: "/services/contact/" },
      secondaryCta: { label: "See what we build", href: "#work" },
      pointsTitle: "Who we help",
      points: [
        {
          title: "Shops & stores",
          text: "Stock, billing, suppliers and daily sales: one screen instead of five notebooks.",
        },
        {
          title: "Farms & small factories",
          text: "Records, production, expenses and reports you can actually find later.",
        },
        {
          title: "Clinics & service businesses",
          text: "Appointments, customers, staff tasks and reminders that run themselves.",
        },
        {
          title: "Startups & teams",
          text: "Web apps, dashboards, APIs and AI features built cleanly from day one.",
        },
      ],
      steps: [
        { title: "Talk", text: "You explain the problem. We ask questions until we really get it." },
        { title: "Plan & price", text: "A clear list of what we'll build, what we won't, the time and the cost." },
        { title: "Build in small steps", text: "You see progress regularly and can steer early." },
        { title: "Test together", text: "We check the real workflows with you before going live." },
        { title: "Handover & support", text: "You get the code, access and a simple guide. Support is agreed separately." },
      ],
      itemsTitle: "What we build",
      itemsIntro: "Each service has its own page explaining who it's for and what you get.",
    },
    about: {
      title: "About Coding Moves Services",
      intro:
        "Coding Moves Services is the client side of Coding Moves. We take a business problem and turn it into working software.",
      vision:
        "Every small business should be able to have software that fits it, not the other way round, at a fair price and without the jargon.",
      story: [
        "Most businesses don't need \"digital transformation\". They need their stock to be correct, their bills to go out on time and their reports to be one click away.",
        "We work closely with you, show progress often and agree everything in writing first: what we'll build, who owns the code, and what support looks like after launch.",
        "We'd rather say \"we can't do that well\" than promise something we can't deliver.",
      ],
      principles: [
        { title: "Agreed scope", text: "Features, timeline and price are written down before we start." },
        { title: "You own what you pay for", text: "Code ownership and access are clear from day one." },
        { title: "Your data stays private", text: "No secrets in code, no client data shared, ever." },
        { title: "Plain-word updates", text: "You always know what's done and what's next." },
      ],
    },
    contact: {
      title: "Tell us about your project",
      intro:
        "No tech words needed. Just describe what's hard today and what you'd like to be easier. We'll reply with questions or a rough plan.",
      topics: [
        "Business / management system",
        "Website or web app",
        "AI or automation",
        "API / backend work",
        "Fix or improve existing software",
        "Not sure yet",
      ],
      helpful: [
        "What your business does",
        "What you use today (paper, Excel, an old app…)",
        "What you want to be easier",
        "Rough budget and timeline, if you have one",
      ],
    },
    terms: [
      { heading: "Projects and payment", body: ["We scope and quote each project in writing before work starts. Payment is made in the stages agreed for that project. Changes outside the agreed scope are quoted separately."] },
      { heading: "Code, data and support", body: ["Code ownership is agreed in writing for each project. We keep client data private. Support after handover is agreed separately."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "lab",
    name: "Coding Moves Lab",
    short: "Lab",
    path: "/lab",
    status: "live",
    accent: "#06B6D4",
    accentSoft: "#67E8F9",
    accentDeep: "#0E7490",
    onAccent: "#04161C",
    oneLiner: "Experiments with AI, automation and new tech, shared honestly.",
    seoDescription:
      "Coding Moves Lab: experiments and prototypes with AI, machine learning, automation and developer tools. What we tried, what worked, and what didn't.",
    home: {
      eyebrow: "Coding Moves Lab",
      title: "Where we try ideas before they're ready.",
      intro:
        "The Lab is our playground for AI, automation and new tools. Some experiments grow into products. Some teach us something and stop there. We share both.",
      primaryCta: { label: "See the experiments", href: "#work" },
      secondaryCta: { label: "Suggest an idea", href: "/lab/contact/" },
      pointsTitle: "What happens in the Lab",
      points: [
        {
          title: "AI & machine learning",
          text: "Assistants, classifiers, search and retrieval, tested on real problems.",
        },
        {
          title: "Automation",
          text: "Little tools that save hours: bots, sync jobs, smart reminders.",
        },
        {
          title: "System tools",
          text: "Low-level experiments where performance and safety really matter.",
        },
      ],
      itemsTitle: "Experiments",
      itemsIntro: "Each experiment has its own page with the idea behind it and its honest status.",
    },
    about: {
      title: "About the Lab",
      intro:
        "The Lab exists so we can learn fast without pretending every idea is a product.",
      vision:
        "Try ideas in the open, write down what we learn, and turn the best ones into tools people can rely on.",
      story: [
        "New tech moves fast. The only way to know if an idea works is to build a small version and test it.",
        "Every experiment here is labelled with its real stage, from rough idea to working prototype. If something failed, we say so, because that's useful too.",
        "Good experiments can grow into useful tools or teach us what to try next.",
      ],
      principles: [
        { title: "Honest labels", text: "Idea, prototype, in progress, released or archived. Always visible." },
        { title: "Learn in public", text: "Notes on what worked and what didn't." },
        { title: "Responsible AI", text: "We test outputs and say where the limits are." },
      ],
    },
    contact: {
      title: "Talk to the Lab",
      intro:
        "Have an idea to try together, feedback on an experiment, or want to use one of them? Send a note.",
      topics: ["Idea for an experiment", "Feedback on an experiment", "Want to collaborate", "Something else"],
      helpful: ["Which experiment (if any)", "What you'd like to try or change", "How we can reach you"],
    },
    terms: [
      { heading: "Experiments", body: ["Lab experiments are provided as-is. They may change or stop without notice and are not intended for production use."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "open-source",
    name: "Coding Moves Open Source",
    short: "Open Source",
    path: "/open-source",
    status: "live",
    accent: "#10B981",
    accentSoft: "#6EE7B7",
    accentDeep: "#047857",
    onAccent: "#03170F",
    oneLiner: "Code we share, and code we help improve.",
    seoDescription:
      "Coding Moves Open Source: public projects, developer tools and contributions to other open-source projects. Free to use, learn from and improve.",
    home: {
      eyebrow: "Coding Moves Open Source",
      title: "Code we share, and code we help improve.",
      intro:
        "Some of our work is public so anyone can use it, learn from it, or make it better. We also contribute fixes and documentation to open-source projects we rely on.",
      primaryCta: { label: "Browse projects", href: "#work" },
      secondaryCta: { label: "Contribute with us", href: "/open-source/contact/" },
      pointsTitle: "What you'll find here",
      points: [
        {
          title: "Our public projects",
          text: "Tools and libraries we built and keep maintaining.",
        },
        {
          title: "Contributions",
          text: "Bug fixes, features and docs we've sent to other projects.",
        },
        {
          title: "A way in",
          text: "Clear READMEs and \"good first issues\" so new people can join.",
        },
      ],
      itemsTitle: "Projects",
      itemsIntro: "Each project has its own page: what it does, why it exists, and how to help.",
    },
    about: {
      title: "About Open Source at Coding Moves",
      intro: "We use open-source software every day. This is how we give back.",
      vision:
        "Share useful code, make it easy for others to join, and be good neighbours in the projects we depend on.",
      story: [
        "Open source taught most of us how to code. Sharing our own tools and fixing things in other projects is how we say thanks.",
        "We only publish code we're allowed to share. Client work stays private unless the client agrees.",
        "Every public repo should have a clear README, a licence and an easy first step for new contributors.",
      ],
      principles: [
        { title: "Welcoming", text: "Beginners are welcome; we explain, not gatekeep." },
        { title: "Documented", text: "If it isn't written down, it doesn't really exist." },
        { title: "Respectful", text: "We follow each project's rules and licence." },
      ],
    },
    contact: {
      title: "Talk about open source",
      intro:
        "Found a bug, want to contribute, or want us to look at your project? Let's talk.",
      topics: ["Report a problem", "I want to contribute", "Review / help my project", "Something else"],
      helpful: ["Project name or link", "What happened, or what you'd like to do", "Your GitHub username (optional)"],
    },
    terms: [
      { heading: "Repositories and contributions", body: ["Each repository's own licence applies to its code. Contributions are made under that licence and should follow that repository's code of conduct."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "products",
    name: "Coding Moves Products",
    short: "Products",
    path: "/products",
    status: "in-progress",
    accent: "#8B5CF6",
    accentSoft: "#C4B5FD",
    accentDeep: "#6D28D9",
    onAccent: "#ffffff",
    oneLiner: "Our own tools, turning repeat problems into ready-made products.",
    seoDescription:
      "Coding Moves Products: software products we're building from real problems we keep seeing in client work.",
    home: {
      eyebrow: "Coding Moves Products",
      title: "Our own products. Coming together.",
      intro:
        "When we solve the same problem for different people, it's a sign it should be a product. We're shaping our first ones now. This page will grow as they get ready.",
      primaryCta: { label: "Get notified", href: "/products/contact/" },
      pointsTitle: "What a Coding Moves product should be",
      points: [
        { title: "Simple to start", text: "Useful in the first ten minutes, no long setup." },
        { title: "Built from real needs", text: "Born from problems we've actually solved." },
        { title: "Looked after", text: "Updated and supported, not abandoned." },
      ],
      itemsTitle: "In the works",
      itemsIntro: "Each product will get its own page with its idea, status and plan.",
    },
    about: {
      title: "About Coding Moves Products",
      intro: "Products is where our best ideas from client work and the Lab become tools anyone can use.",
      vision: "A small set of focused tools that people actually keep using.",
      story: [
        "Not every idea should be a product. We only move something here once we know people really need it.",
        "Until then, this section stays honest: \"in progress\" means in progress.",
      ],
      principles: [
        { title: "Focused", text: "Do one job really well." },
        { title: "Fair", text: "Clear pricing, your data stays yours." },
      ],
    },
    contact: {
      title: "Interested in our products?",
      intro: "Tell us what you'd want from a product like this, or ask to be told when it's ready.",
      topics: ["Notify me when ready", "I have a product idea", "Something else"],
      helpful: ["What problem you'd want solved", "How we can reach you"],
    },
    terms: [
      { heading: "Products in development", body: ["These tools are still in development. Features, availability and any future pricing will be published when ready."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "research",
    name: "Coding Moves Research",
    short: "Research",
    path: "/research",
    status: "in-progress",
    accent: "#C026D3",
    accentSoft: "#F0ABFC",
    accentDeep: "#A21CAF",
    onAccent: "#ffffff",
    oneLiner: "Notes, articles and deep dives on what we learn.",
    seoDescription:
      "Coding Moves Research: technical notes, articles and learning resources from our projects and experiments.",
    home: {
      eyebrow: "Coding Moves Research",
      title: "What we learn, written down.",
      intro:
        "Notes, write-ups and deep dives from our projects and experiments. We're collecting the first pieces now.",
      primaryCta: { label: "Suggest a topic", href: "/research/contact/" },
      pointsTitle: "What will live here",
      points: [
        { title: "Write-ups", text: "How we built something and why." },
        { title: "Experiments explained", text: "Results from the Lab, in plain words." },
        { title: "Learning notes", text: "Guides we wish we'd had." },
      ],
      itemsTitle: "Articles",
      itemsIntro: "Each article will get its own page.",
    },
    about: {
      title: "About Coding Moves Research",
      intro: "Research is our notebook: we write down what we learn so others can use it too.",
      vision: "Clear, honest technical writing that saves someone else a week.",
      story: ["We'll publish here once the first pieces are ready."],
      principles: [{ title: "Plain words", text: "Explain it so a beginner can follow." }],
    },
    contact: {
      title: "Suggest a research topic",
      intro: "What would you like us to dig into or explain?",
      topics: ["Topic suggestion", "Feedback", "Something else"],
      helpful: ["The topic", "Why it matters to you"],
    },
    terms: [
      { heading: "Research in development", body: ["Articles and notes are being prepared. Details about reuse and attribution will be added before publication."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
];

export const MAIN = BRANDS[0];
export const SUB_BRANDS = BRANDS.filter((b) => b.id !== "main");

export function isSubBrandHref(path: string): boolean {
  return SUB_BRANDS.some((b) => path === b.path || path.startsWith(`${b.path}/`));
}

export function getBrand(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id);
}

/** Build a link inside a brand: href(lab, "/about/") -> "/lab/about/" */
export function href(brand: Brand, sub = "/"): string {
  return `${brand.path}${sub}`;
}

export function logoSrc(brand: Brand, mark = false): string {
  return `/logos/${brand.id}${mark ? "-mark" : ""}.svg`;
}
