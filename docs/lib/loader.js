const matter = require('gray-matter')
const md = require('markdown-ast')

const mdxLayoutLoader = function (source) {
  const options = this.getOptions()
  const { data, content } = matter(source)
  const allNodes = md(content)
  allNodes.forEach((node) => {
    if (node.type === 'title') {
      console.log(`\nthe node is:`)
      console.log(node)
    }
  })

  // Here we convert frontmatter YAML to exported JS object,
  // and the layout as the default export as NextJS expects.

  const preparedSource = `

import { ${options.layout.component} } from '${options.layout.module}'

export const __frontMatter = JSON.parse('${JSON.stringify(data)}');

${content}

export default ({ children }) => (
    <${options.layout.component} ${
    options.layout.frontMatterProp
  }={__frontMatter}>
        {children}
    </${options.layout.component}>
)
`
  return preparedSource
}

module.exports = mdxLayoutLoader
