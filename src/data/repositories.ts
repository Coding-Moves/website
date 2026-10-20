import type { BrandId } from "./brands";

type RepositoryBase = {
  name: string;
  title: string;
  summary: string;
  areas: BrandId[];
};

export type Repository = RepositoryBase & (
  | { visibility: "public"; url: string }
  | { visibility: "private" }
);

// Public URLs are explicit so a private repository cannot accidentally gain a source link.
export const REPOSITORIES: Repository[] = [
  {
    name: "one-concept",
    title: "One Concept",
    summary: "Android app for learning one short technical concept each day.",
    areas: ["products"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/one-concept",
  },
  {
    name: "diskern",
    title: "Diskern",
    summary: "Desktop disk cleaner with evidence-based findings and reviewable cleanup.",
    areas: ["open-source"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/diskern",
  },
  {
    name: "dairy-farm",
    title: "Dairy Farm",
    summary: "Client-paid farm management service. Production data and source remain private.",
    areas: ["services"],
    visibility: "private",
  },
  {
    name: "maya-assistant",
    title: "Maya Assistant",
    summary: "Experimental WhatsApp study assistant; deadline reminders are planned.",
    areas: ["lab"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/maya-assistant",
  },
  {
    name: "Arion_OS",
    title: "Arion OS",
    summary: "Experimental operating-system development and learning project.",
    areas: ["lab"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/Arion_OS",
  },
  {
    name: "SmartGate-Cam",
    title: "SmartGate Cam",
    summary: "Concept design for camera-assisted entry; no working build is claimed.",
    areas: ["lab"],
    visibility: "private",
  },
  {
    name: "PixelGuard-AI",
    title: "PixelGuard AI",
    summary: "Experimental AI and media forensics demo; results are not definitive.",
    areas: ["lab"],
    visibility: "private",
  },
  {
    name: "ML_Predictor",
    title: "ML Predictor",
    summary: "Research prototype for Roman Urdu cardiac triage; not clinically validated.",
    areas: ["research"],
    visibility: "private",
  },
  {
    name: "BSAI-Projects",
    title: "BSAI Projects",
    summary: "University AI and computer-science projects, each with its own scope and credits.",
    areas: ["academy"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/BSAI-Projects",
  },
  {
    name: "Linear-Algebra",
    title: "Linear Algebra",
    summary: "Python exercises for matrix operations and AI-related mathematics.",
    areas: ["lab"],
    visibility: "private",
  },
  {
    name: "Renpy_Sandbox",
    title: "Ren'Py Sandbox",
    summary: "Private visual-novel starter and game-development experiment.",
    areas: ["lab"],
    visibility: "private",
  },
  {
    name: "30-Days-30-Python-Projects-Beginner-Contributions-Only",
    title: "30 Days, 30 Python Projects",
    summary: "Beginner-friendly community Python challenge. Public code; reuse terms are still being resolved for outside contributions.",
    areas: ["open-source", "academy"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/30-Days-30-Python-Projects-Beginner-Contributions-Only",
  },
  {
    name: "react-revision",
    title: "React Revision",
    summary: "Daily React practice exercises; the capstone is planned separately.",
    areas: ["academy", "lab"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/react-revision",
  },
  {
    name: "leetcode-solutions-by-codingmoves",
    title: "LeetCode Solutions",
    summary: "Python solutions for data-structure and algorithm practice.",
    areas: ["academy", "open-source"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/leetcode-solutions-by-codingmoves",
  },
  {
    name: ".github",
    title: "Organization profile",
    summary: "Coding Moves organization introduction and community documentation.",
    areas: ["main"],
    visibility: "public",
    url: "https://github.com/Coding-Moves/.github",
  },
  {
    name: "website",
    title: "Website source",
    summary: "Source code for this Coding Moves website.",
    areas: ["main"],
    visibility: "private",
  },
  {
    name: "demo-repository",
    title: "Demo repository",
    summary: "Private organization demo for trying GitHub workflows.",
    areas: ["main"],
    visibility: "private",
  },
];

export function publicRepositoryUrl(name: string): string | undefined {
  const repository = REPOSITORIES.find((item) => item.name === name);
  return repository?.visibility === "public" ? repository.url : undefined;
}

export function repositoriesFor(area: BrandId): Repository[] {
  if (area === "main") return REPOSITORIES;
  return REPOSITORIES.filter((item) => item.areas.includes(area));
}
