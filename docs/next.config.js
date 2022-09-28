// @ts-check

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [dothing, require('remark-frontmatter')],
//     // If you use `MDXProvider`, uncomment the following line.
//     // providerImportSource: "@mdx-js/react",
//   },
// })

const mdxPlugin = require('./lib/mdx')

const withFrontMatterMDX = mdxPlugin({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
  layout: {
    module: '@/components/MatterPage',
    component: 'MatterPage',
    frontMatterProp: 'metadata',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    esmExternals: true,
  },
}

module.exports = withFrontMatterMDX(nextConfig)
