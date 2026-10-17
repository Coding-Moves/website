import { MAIN } from "@/data/brands";
import { pageMeta } from "@/lib/seo";
import LegalView from "@/views/LegalView";

export const metadata = pageMeta({ brand: MAIN, title: "Privacy", description: "Draft privacy information for Coding Moves.", path: "/privacy/" });

export default function Page() {
  return <LegalView brand={MAIN} kind="privacy" />;
}
