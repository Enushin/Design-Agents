/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@ddpo/core",
    "@ddpo/designers",
    "@ddpo/orchestrator",
    "@ddpo/qa",
    "@ddpo/image-gen",
  ],
};

module.exports = nextConfig;
