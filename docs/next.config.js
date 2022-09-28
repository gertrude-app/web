const withMarkdoc = require('@markdoc/next.js')
// const remarkFrontmatter = require('remark-frontmatter')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    remarkPlugins: [require('remark-frontmatter')],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
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
  options: {},
}

module.exports = withMarkdoc()(withMDX(nextConfig))
