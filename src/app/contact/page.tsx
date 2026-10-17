import { MAIN } from "@/data/brands";
import { pageMeta } from "@/lib/seo";
import ContactView from "@/views/ContactView";

export const metadata = pageMeta({ brand: MAIN, title: "Contact", description: MAIN.contact.intro, path: "/contact/" });

export default function Page() {
  return <ContactView brand={MAIN} />;
}
