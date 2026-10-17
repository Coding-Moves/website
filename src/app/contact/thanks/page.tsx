import { MAIN } from "@/data/brands";
import { pageMeta } from "@/lib/seo";
import ThanksView from "@/views/ThanksView";

export const metadata = pageMeta({ brand: MAIN, title: "Thanks", description: "Message sent.", path: "/contact/thanks/", noindex: true });

export default function Page() {
  return <ThanksView brand={MAIN} />;
}
