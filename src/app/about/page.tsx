import { MAIN } from "@/data/brands";
import { pageMeta } from "@/lib/seo";
import AboutView from "@/views/AboutView";

export const metadata = pageMeta({ brand: MAIN, title: "About", description: MAIN.about.intro, path: "/about/" });

export default function Page() {
  return <AboutView brand={MAIN} />;
}
