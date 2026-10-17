import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML to /out, which Netlify serves.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
