import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const repo = "claim-cermatej";
const isProd = process.env.NODE_ENV === "production";
const useBasePath = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd && useBasePath ? `/${repo}` : undefined,
  assetPrefix: isProd && useBasePath ? `/${repo}/` : undefined,
};

export default withNextIntl(nextConfig);
