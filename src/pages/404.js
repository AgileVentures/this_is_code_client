import React from 'react';
import { FourOhFour } from 'gatsby-theme-carbon';

const links = [
  { href: '/navigation/enroll-in-a-session', text: 'Enroll in a session' },
  { href: '/navigation/request-a-session', text: 'Aside' },

];

const Custom404 = () => <FourOhFour links={links} />;

export default Custom404;