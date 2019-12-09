module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Carbon',
  },
  plugins: [
    'gatsby-theme-carbon',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        repository: {
          baseUrl: 'https://github.com/carbon-design-system/gatsby-theme-carbon',
          subDirectory: '/packages/example',
          branch: 'master',
        },
        name: 'Carbon Design Gatsby Theme',
        short_name: 'Gatsby Theme Carbon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'browser',
      },
    },
  ],
};
