/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // enable browser source map generation during the production build
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    // appDir: true,
  },
  // fix all before production. Now it slow the develop speed.
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
    ignoreBuildErrors: true,
  },

  webpack: (config) => {

    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.done.tap('RemoveCachePlugin', () => {
          const cacheDir = path.resolve('.next/cache');
          if (fs.existsSync(cacheDir)) {
            fs.rmdirSync(cacheDir, { recursive: true });
          }
        });
      },
    });

    return config;
  },
}

module.exports = nextConfig
