import { MAIN } from "@/data/brands";
import { pageMeta } from "@/lib/seo";
import LegalView from "@/views/LegalView";

export const metadata = pageMeta({ brand: MAIN, title: "Terms", description: "Draft terms for Coding Moves.", path: "/terms/" });

export default function Page() {
  return <LegalView brand={MAIN} kind="terms" />;
}
