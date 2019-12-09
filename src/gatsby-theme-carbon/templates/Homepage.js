import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import { calloutLink } from './Homepage.module.scss';


const FirstLeftText = () => <p>This IS Code!</p>;

const FirstRightText = () => (
  <p>
    Learning happen everywhere. And it does. Every day, in project work, in a hallway conversation, over coffe with a collegue, or on the commute - listening to a podcast or reading a blog post.
    Our curiosity is brought to life wherever we are and we all have a strong desire to know or learn new skills. Here's where continious learning happens.
  </p>
);

const SecondLeftText = () => <p>Share what you excel in</p>;

const SecondRightText = () => (
  <>
    <p>
      If you are good at what you do and would like to share as well as monetize on your talent, join our community of instructors!
      The TIC will help you every step of the way to provide an engaging way to present your topic of choice to developers eager to level up,
      making you an industry star and a valued member of an incredible community.
    </p>
  </>
);

const BannerText = () => (
  <>
    <h1>Learning CONTINUES Here</h1>
  </>
);

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={'https://github.com/CraftAcademy/craft-assets/blob/gh-pages/images/backgrounds/splash_3.jpg?raw=true'} />,
  FirstCallout: (
    <HomepageCallout
      backgroundColor="#f28e24"
      color="white"
      leftText={FirstLeftText}
      rightText={FirstRightText}
    />
  ),
  SecondCallout: (
    <HomepageCallout
      leftText={SecondLeftText}
      rightText={SecondRightText}
      color="white"
      backgroundColor="#f28e24"
    />
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
