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
  | "research"
  | "academy";

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
  {
    heading: "Display preference",
    body: ["The light and dark theme switch saves your choice in your browser's local storage. It is not sent with contact messages."],
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
    variant?: "detailed";
    title: string;
    intro: string;
    topics: string[]; // options in the "What is this about?" dropdown
    queryTopics?: Record<string, string>; // short URL values mapped to topic labels
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
      "Coding Moves builds custom software for clients, publishes its own apps, explores new ideas, shares open-source code and teaches what it learns.",
    home: {
      eyebrow: "Build · Explore · Impact",
      title: "We build useful software, and we show our work.",
      intro:
        "Coding Moves is a small software team. We build for clients, publish our own apps, test new ideas, share open-source code and teach what we learn. Pick the part you came for.",
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
        "Services builds custom software for clients. The Lab tests ideas, Open Source shares code, Products publishes our own apps, Research writes down what we learn, and Academy teaches it step by step.",
        "We're building Coding Moves step by step. Each project page shows whether it is an idea, prototype, work in progress or available today.",
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
        { title: "Ownership agreed up front", text: "Code ownership and access are settled in writing before work starts." },
        { title: "Your data stays private", text: "No secrets in code, no client data shared, ever." },
        { title: "Plain-word updates", text: "You always know what's done and what's next." },
      ],
    },
    contact: {
      variant: "detailed",
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
      queryTopics: { fix: "Fix or improve existing software" },
      helpful: [
        "What your business does",
        "What you use today (paper, Excel, an old app…)",
        "What you want to be easier",
        "When you need it by, if you have a date",
      ],
    },
    terms: [
      { heading: "Projects and payment", body: ["We scope and quote each project in writing before work starts. Payment is made in the stages agreed for that project. Changes outside the agreed scope are quoted separately."] },
      { heading: "Code, data and support", body: ["Code ownership is agreed in writing for each project. We keep client data private. Support after handover is agreed separately."] },
    ],
    privacy: [
      {
        heading: "Contact messages",
        body: ["The Services contact form collects your name, email, chosen topic and message. You can also give us a phone number and choose how we reach you. We use this information only to reply. Netlify Forms handles submissions for us."],
      },
      PRIVACY_SECTIONS[1],
    ],
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
      "Coding Moves Open Source: public projects, developer tools and community learning. Check each repository's license for reuse terms.",
    home: {
      eyebrow: "Coding Moves Open Source",
      title: "Code we share, and code we help improve.",
      intro:
        "We share tools and learning projects in public. Check each repository's license and contribution guidance before reusing code or sending changes.",
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
        "We aim for clear READMEs and license terms. The beginner Python challenge is public while reuse terms for outside contributions are still being resolved.",
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
      { heading: "Repositories and contributions", body: ["Check each repository for its own license and contribution rules before reusing code or submitting changes. A public repository without a license does not grant general reuse rights."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "products",
    name: "Coding Moves Products",
    short: "Products",
    path: "/products",
    status: "live",
    accent: "#8B5CF6",
    accentSoft: "#C4B5FD",
    accentDeep: "#6D28D9",
    onAccent: "#ffffff",
    oneLiner: "Apps we build, own and look after, ready for you to use.",
    seoDescription: "Coding Moves Products creates its own mobile, web, desktop and private apps for everyday problems.",
    home: {
      eyebrow: "Coding Moves Products",
      title: "Ready-made apps for real everyday problems.",
      intro: "These are apps we build, own and look after ourselves. Some will be on the Play Store, some will run on the web or desktop, and some are private apps for invited users.",
      primaryCta: { label: "Explore the apps", href: "#work" },
      secondaryCta: { label: "Get notified", href: "/products/contact/" },
      pointsTitle: "Where you can use them",
      points: [
        { title: "Mobile apps", text: "Apps you can get on the Play Store when they're ready." },
        { title: "Web & desktop apps", text: "Tools you can use in your browser or on your computer." },
        { title: "Private apps", text: "Invite-only apps for a small group of users." },
      ],
      itemsTitle: "Our apps",
      itemsIntro: "Each app shows its real stage. Download and access links will appear when available.",
    },
    about: {
      title: "About Coding Moves Products",
      intro: "We make our own apps for everyday problems and look after them over time.",
      vision: "Useful apps that are simple to start and clear about what they can do today.",
      story: [
        "Some problems come up again and again. We build focused apps for those needs, then publish them when they're ready for real people to use.",
        "An app may be public on a store, available in a browser, downloadable for desktop, or private for an invited group. Each page says where it stands.",
      ],
      principles: [
        { title: "Useful first", text: "An app should solve one real problem well." },
        { title: "Clear status", text: "Ideas and prototypes are labelled honestly." },
        { title: "Looked after", text: "We explain updates and support for each released app." },
      ],
    },
    contact: {
      title: "Talk about our apps",
      intro: "Interested in an app, want to request access, or have feedback? Send us a short note.",
      topics: ["Get notified", "Request access", "Feedback on an app", "Suggest an app", "Something else"],
      helpful: ["Which app you mean", "What you'd like to do with it", "How we can reach you"],
    },
    terms: [
      { heading: "Apps and availability", body: ["Apps are provided as-is. Features may change. Any available updates and support will be described for each app."] },
      { heading: "Your data and app stores", body: ["We keep your app data private. If you get an app through a store, that store's policies also apply."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "research",
    name: "Coding Moves Research",
    short: "Research",
    path: "/research",
    status: "live",
    accent: "#C026D3",
    accentSoft: "#F0ABFC",
    accentDeep: "#A21CAF",
    onAccent: "#ffffff",
    oneLiner: "Research prototypes and notes, with honest limits.",
    seoDescription:
      "Coding Moves Research: current prototypes and technical notes, including the limits of experimental results.",
    home: {
      eyebrow: "Coding Moves Research",
      title: "What we test, written down.",
      intro:
        "Explore the research work we can describe today, including what the evidence does and does not show.",
      primaryCta: { label: "Explore the research", href: "#work" },
      secondaryCta: { label: "Suggest a topic", href: "/research/contact/" },
      pointsTitle: "How we present research",
      points: [
        { title: "Current work", text: "What a prototype does today, rather than what we hope it will do." },
        { title: "Methods", text: "The inputs and evaluation steps behind a result." },
        { title: "Limits", text: "Where a study ends and real-world reliability is still unknown." },
      ],
      itemsTitle: "Research projects",
      itemsIntro: "Each project page describes its scope and current limits.",
    },
    about: {
      title: "About Coding Moves Research",
      intro: "Research is where we document technical experiments and the evidence behind them.",
      vision: "Clear, honest work that others can understand and question.",
      story: ["Our current medical-triage prototype is a study, not a clinical tool. Future write-ups will be added as the work is ready to share."],
      principles: [{ title: "Plain words", text: "Explain methods and limitations so readers can follow them." }],
    },
    contact: {
      title: "Suggest a research topic",
      intro: "What would you like us to dig into or explain?",
      topics: ["Topic suggestion", "Feedback", "Something else"],
      helpful: ["The topic", "Why it matters to you"],
    },
    terms: [
      { heading: "Research material", body: ["Project pages describe experiments and do not replace professional advice. Check each linked repository for access and reuse terms."] },
    ],
    privacy: PRIVACY_SECTIONS,
  },
  {
    id: "academy",
    name: "Coding Moves Academy",
    short: "Academy",
    path: "/academy",
    status: "live",
    accent: "#F43F5E",
    accentSoft: "#FDA4AF",
    accentDeep: "#BE123C",
    onAccent: "#ffffff",
    oneLiner: "Learn by building with coursework and practice code.",
    seoDescription: "Coding Moves Academy shares coursework, React practice and beginner Python and algorithm projects.",
    home: {
      eyebrow: "Coding Moves Academy",
      title: "Learn by building, step by step.",
      intro: "Explore coursework and small coding exercises now. Courses and videos may come later, when they are ready.",
      primaryCta: { label: "Explore learning projects", href: "#work" },
      secondaryCta: { label: "Suggest a lesson", href: "/academy/contact/" },
      pointsTitle: "Ways to practice",
      points: [
        { title: "Coursework", text: "Browse semester projects with their own setup guides and credits." },
        { title: "Daily exercises", text: "Practice React and Python through small builds." },
        { title: "Algorithms", text: "Study Python solutions and the patterns behind them." },
      ],
      itemsTitle: "Learning projects",
      itemsIntro: "Start with a project overview, then follow its public repository when available.",
    },
    about: {
      title: "About Coding Moves Academy",
      intro: "We teach what we learn, one useful lesson at a time.",
      vision: "Make it easier for beginners to learn by building real things.",
      story: [
        "A good explanation can save someone hours. We want to share the steps, mistakes and decisions behind the software we build.",
        "The current Academy starts with coursework and code exercises. We will add structured courses only when they are ready to follow.",
      ],
      principles: [
        { title: "Start small", text: "One clear step before the next one." },
        { title: "Show the work", text: "Real examples, including the parts that took a second try." },
        { title: "Keep it friendly", text: "Questions are welcome, especially beginner ones." },
      ],
    },
    contact: {
      title: "Talk to the Academy",
      intro: "Suggest something you'd like to learn, ask about a course, or tell us how we can make a guide clearer.",
      topics: ["Suggest a tutorial", "Course interest", "Collaboration", "Something else"],
      helpful: ["What you'd like to learn", "Your starting point", "Any example that would help"],
    },
    terms: [
      { heading: "Learning resources", body: ["Current project pages link to learning repositories. We do not offer enrolment in a course on this site today."] },
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
