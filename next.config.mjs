import createMDX from "@next/mdx";

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/eva-ui" : "",
  assetPrefix: isProd ? "/eva-ui/" : "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
