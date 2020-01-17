module.exports = {
  siteMetadata: {
    title: 'This Is Code',
  },
  plugins: [
    'gatsby-theme-carbon',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {

        name: 'This Is Code',
        short_name: 'This Is Code',
        start_url: '/',
        background_color: '#f28e24',
        theme_color: '#0062ff',
        display: 'browser',
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/svg/ // See below to configure properly
        }
      }
    }
  ],
};
