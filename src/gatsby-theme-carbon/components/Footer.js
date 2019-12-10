import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';
import CALogo from '../../images/svg/ca_logo.svg'
import TICLogo from '../../images/svg/tic_logo.svg'
const Content = () => (
  <>
    <TICLogo />
    <p>
      Learning can occur everywhere. And it does so every day.
        </p>
    <p>
      Our curiosity is brought to life wherever we are and we all have a strong desire to know or learn new skills.    </p>
    <p>
      Here at TIS is where continuous learning happens.
    </p>
  </>
);

const links = {
  firstCol: [
    { href: 'getting-started/the-mission', linkText: 'Privacy Policy' },
    { href: 'getting-started/the-mission', linkText: 'Terms and conditions' },
  ],
  secondCol: [
    { href: 'https://craftacademy.co', linkText: 'Craft Academy' },
    { href: 'https://learn.craftacademy.co', linkText: 'Learn at CA' },

  ],
};



const CustomFooter = () => <Footer links={links} Content={Content} Logo={CALogo} />;

export default CustomFooter;
