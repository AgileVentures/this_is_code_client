import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import Video from 'gatsby-theme-carbon/src/components/Video'

const FirstLeftText = () => <h3>This IS Code!</h3>;

const FirstRightText = () => (
  <>
    <p>
      Learning happen everywhere. And it does so every day.
    </p>
    <p>
      In project work, in a hallway conversation, over coffe with a collegue, or on the commute - listening to a podcast or reading a blog post.
    </p>
    <p>
      Our curiosity is brought to life wherever we are and we all have a strong desire to know or learn new skills.
    </p>
    <p>
      Here's where continious learning happens.
    </p>
  </>
);

const SecondLeftText = () => <h3>Share what you excel in</h3>;

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

  </>
);

const customProps = {
  Banner:
    <Video
      src="/videos/tic_animated_logo_2_medium.mov"
      poster="/images/tic_poster.png"
      autoPlay
      muted
      playsinline
      loop />,
  // <HomepageBanner renderText={BannerText} image={'https://github.com/CraftAcademy/craft-assets/blob/gh-pages/images/backgrounds/splash_3.jpg?raw=true'} />,
  FirstCallout: (
    <HomepageCallout
      backgroundColor="white"
      color="darkgrey"
      leftText={FirstLeftText}
      rightText={FirstRightText}
    />
  ),
  SecondCallout: (
    <HomepageCallout
      leftText={SecondLeftText}
      rightText={SecondRightText}
      color="darkgrey"
      backgroundColor="white"
    />
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
