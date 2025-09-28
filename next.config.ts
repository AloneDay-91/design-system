import mdx from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: { unoptimized: true },
  // Forcer un build non statique (server/standalone) — ne pas utiliser `output: 'export'`.
  output: 'standalone',
  // ...autres options
};

export default withMDX(nextConfig);