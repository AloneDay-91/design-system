import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: "export" as const,
  images: { unoptimized: true },
  // ...autres options
};

export default withMDX(nextConfig);