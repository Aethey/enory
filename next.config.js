const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // 禁用 Source Maps，减小构建体积

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // 自定义页面扩展名

  experimental: {
    runtime: 'edge', // 启用 Edge Runtime
  },

  eslint: {
    ignoreDuringBuilds: true, // 忽略构建时的 ESLint 错误
  },

  typescript: {
    ignoreBuildErrors: true, // 忽略构建时的 TypeScript 错误
  },

  webpack: (config) => {
    // 配置代码分割以减少单个文件大小
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 200000, // 设置最大 chunk 大小为 200KB
    };

    // 自动删除 .next/cache 文件夹以避免上传过大体积
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

  outputFileTracing: false, // 减少输出文件
};

module.exports = nextConfig;