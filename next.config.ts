import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: "export" as const,
  // ...autres options
};

export default withMDX(nextConfig);