import { MAIN } from "@/data/brands";
import { pageMeta } from "@/lib/seo";
import HomeView from "@/views/HomeView";

export const metadata = pageMeta({
  brand: MAIN,
  title: "Coding Moves: software we build, explore and share",
  description: MAIN.seoDescription,
  path: "/",
});

export default function Page() {
  return <HomeView brand={MAIN} />;
}
