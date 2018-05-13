module.exports = {
  siteMetadata: {
    title: 'Garrett Watson Portfolio',
    tags: 'tech, programming, javascript, js, react, reactjs, gatsbyjs, gaming, tabletop, pc',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/img/projects`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `headers`,
        path: `${__dirname}/src/img/headers`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};

