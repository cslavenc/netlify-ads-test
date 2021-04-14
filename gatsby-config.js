const activeEnv = process.env.NODE_ENV || 'development'
console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://localhost:8000`,
    title: `Synaptor V5`,
  }
}
