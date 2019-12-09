import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
  {
    title: 'About ThisIsCode ',
    href: '/guides/configuration',
  },
  {
    title: 'Craft Academy',
    href: 'https://craftacademy.co',
  },
  {
    title: 'Learn at CA',
    href: 'https://learn.craftacademy.co',
  },

];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
