const path = require('path')

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  const { setWebpackConfig } = actions
  if (stage === 'build-html') {
    setWebpackConfig({
      externals: {
        // setting jquery like this makes support buttons in footer work more consistently
        jquery: 'jQuery', // important: 'Q' capitalized
      },
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const articles = await graphql(`
    {
      allNodeArticle {
        totalCount
        nodes {
          created(locale: "en")
          changed(locale: "en")
          id
          title
          path {
            alias
          }
        }
      }
    }
  `)

  // create pages
  articles.data.allNodeArticle.nodes.map(articleData => {
    createPage({
      path: articleData.path.alias,
      component: path.resolve(`src/templates/Article.tsx`),
      context: {
        ArticleId: articleData.id,
      },
    })
  })
}
