import type { CSSProperties, ReactNode } from "react";
import type { Brand } from "@/data/brands";
import Header from "./Header";
import Footer from "./Footer";

export default function BrandShell({
  brand,
  page,
  children,
}: {
  brand: Brand;
  page: "home" | "about" | "contact" | "project";
  children: ReactNode;
}) {
  const vars = {
    "--accent": brand.accent,
    "--accent-soft": brand.accentSoft,
    "--accent-deep": brand.accentDeep,
    "--on-accent": brand.onAccent,
  } as CSSProperties;

  return (
    <div className="brand-scope" style={vars} data-brand={brand.id}>
      <a href="#main" className="skip">Skip to content</a>
      <Header brand={brand} page={page} />
      <main id="main">{children}</main>
      <Footer brand={brand} />
    </div>
  );
}
