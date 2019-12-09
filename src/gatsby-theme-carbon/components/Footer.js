import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const Content = () => (
  <>
    <p>
      By importing the <strong>Footer</strong> component from
      gatsby-theme-carbon, we can supply our own props.
    </p>
    <p>
      The default export from a shadowed component will replace that component
      in the theme.
    </p>
    <p>
      <a href="https://www.gatsbyjs.org/docs/themes/api-reference/#component-shadowing">
        More about component shadowing
      </a>
    </p>
  </>
);

const links = {
  firstCol: [
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
  ],
  secondCol: [
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
    { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
  ],
};

const CALogo = () => (
  <svg preserveAspectRatio="xMinYMid meet"  x="25"  y="0"  viewBox="0 0 100 100" width="150"  height="70">
    <defs>
      <style>
        {`.cls-1 {
          fill: white;
        }`}
       </style>
    </defs>
    <path className="cls-1" d="M9.78,83.61a5.74,5.74,0,0,1-2.39-.49A5.63,5.63,0,0,1,5.5,81.79a6.11,6.11,0,0,1-1.27-2,6.62,6.62,0,0,1-.45-2.45v0a6.62,6.62,0,0,1,.45-2.45,6.4,6.4,0,0,1,1.26-2A5.93,5.93,0,0,1,9.87,71a7.34,7.34,0,0,1,1.47.14,7,7,0,0,1,1.22.39,6.16,6.16,0,0,1,1,.6,9.27,9.27,0,0,1,.89.77L13.15,74.5a6.37,6.37,0,0,0-1.5-1.09A3.79,3.79,0,0,0,9.85,73a3.56,3.56,0,0,0-1.56.34,3.72,3.72,0,0,0-1.23.92,4.13,4.13,0,0,0-.81,1.36A4.84,4.84,0,0,0,6,77.28v0A4.84,4.84,0,0,0,6.25,79a4.27,4.27,0,0,0,.81,1.39,3.89,3.89,0,0,0,1.23.93,3.71,3.71,0,0,0,1.56.34,3.8,3.8,0,0,0,1.85-.43,6.87,6.87,0,0,0,1.53-1.16l1.33,1.39a7.26,7.26,0,0,1-1,.9,6.25,6.25,0,0,1-1.07.68,5.42,5.42,0,0,1-1.25.43A7,7,0,0,1,9.78,83.61Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M16.72,71.23H22a5.63,5.63,0,0,1,2,.32,4,4,0,0,1,1.43.9,3.51,3.51,0,0,1,.73,1.16,4,4,0,0,1,.25,1.46v0a4.07,4.07,0,0,1-.21,1.35,3.51,3.51,0,0,1-.58,1.06,3.88,3.88,0,0,1-.88.78,4.32,4.32,0,0,1-1.14.49l3.18,4.61H24.27l-2.9-4.24h-2.6V83.4H16.72Zm5.09,6a2.71,2.71,0,0,0,1.77-.55,1.86,1.86,0,0,0,.66-1.5v0a1.83,1.83,0,0,0-.64-1.51,2.79,2.79,0,0,0-1.81-.52h-3v4.11Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M33.05,71.15H35L40.15,83.4H38l-1.2-2.94H31.2L30,83.4H27.87Zm3,7.42L34,73.7l-2,4.87Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M42.17,71.23h8.75v1.93H44.23v3.36h5.94v1.93H44.23v5H42.17Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M56.11,73.21H52.37v-2h9.56v2H58.19V83.4H56.11Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M73.33,71.15h1.92L80.44,83.4H78.25l-1.2-2.94H71.48L70.27,83.4H68.15Zm3,7.42-2-4.87-2,4.87Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M87.94,83.61a5.87,5.87,0,0,1-4.29-1.82,6.25,6.25,0,0,1-1.26-2,6.43,6.43,0,0,1-.46-2.45v0a6.62,6.62,0,0,1,.45-2.45,6.4,6.4,0,0,1,1.26-2,6.11,6.11,0,0,1,1.93-1.35A6,6,0,0,1,88,71a7.52,7.52,0,0,1,1.48.14,7,7,0,0,1,1.22.39,5.7,5.7,0,0,1,1,.6,8.19,8.19,0,0,1,.89.77L91.3,74.5a6.53,6.53,0,0,0-1.49-1.09A3.79,3.79,0,0,0,88,73a3.56,3.56,0,0,0-1.56.34,3.75,3.75,0,0,0-1.24.92,4.29,4.29,0,0,0-.8,1.36,4.84,4.84,0,0,0-.29,1.67v0A4.84,4.84,0,0,0,84.41,79a4.44,4.44,0,0,0,.8,1.39,3.93,3.93,0,0,0,1.24.93,3.71,3.71,0,0,0,1.56.34,3.86,3.86,0,0,0,1.85-.43,7.36,7.36,0,0,0,1.53-1.16l1.33,1.39a7.26,7.26,0,0,1-1,.9A6.25,6.25,0,0,1,90.7,83a5.42,5.42,0,0,1-1.25.43A7.09,7.09,0,0,1,87.94,83.61Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M99.05,71.15H101l5.19,12.25H104l-1.2-2.94H97.19L96,83.4H93.86Zm3,7.42-2-4.87-2,4.87Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M108.17,71.23h4.39a6.9,6.9,0,0,1,2.53.46,6,6,0,0,1,2,1.28,5.7,5.7,0,0,1,1.29,1.92,6.28,6.28,0,0,1,.46,2.39v0a6.41,6.41,0,0,1-.46,2.4,5.64,5.64,0,0,1-1.29,1.93,6,6,0,0,1-2,1.28,6.7,6.7,0,0,1-2.53.47h-4.39Zm4.37,10.24a4.49,4.49,0,0,0,1.68-.3,3.65,3.65,0,0,0,1.29-.86,3.83,3.83,0,0,0,.82-1.31,4.4,4.4,0,0,0,.3-1.65v0a4.49,4.49,0,0,0-.3-1.66,3.88,3.88,0,0,0-.82-1.32,3.65,3.65,0,0,0-1.29-.86,4.3,4.3,0,0,0-1.68-.32h-2.32v8.31Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M121.32,71.23H130v1.93h-6.66v3.13h5.9v1.93h-5.9v3.25h6.74V83.4h-8.8Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M132.6,71.23h2.2L138.38,77,142,71.23h2.2V83.4h-2V74.67l-3.72,5.74h-.07l-3.68-5.7V83.4H132.6Z" transform="translate(-3.78 -3.85)" />
    <path className="cls-1" d="M150.67,78.6,146,71.23h2.44l3.3,5.39,3.33-5.39h2.37l-4.68,7.32V83.4h-2.08Z" transform="translate(-3.78 -3.85)" />
    <rect className="cls-1" x="1.5" y="11.71" width="9.93" height="9.93" />
    <rect className="cls-1" x="1.5" y="23.59" width="9.93" height="9.93" />
    <rect className="cls-1" x="1.5" y="35.3" width="9.93" height="9.93" />
    <rect className="cls-1" x="13.21" width="9.93" height="9.93" />
    <rect className="cls-1" x="13.21" y="11.71" width="9.93" height="9.93" />
    <rect className="cls-1" x="13.21" y="23.59" width="9.93" height="9.93" />
    <rect className="cls-1" x="13.21" y="35.3" width="9.93" height="9.93" />
    <rect className="cls-1" x="13.21" y="47.01" width="9.93" height="9.93" />
    <rect className="cls-1" x="24.92" width="9.93" height="9.93" />
    <rect className="cls-1" x="24.92" y="47.01" width="9.93" height="9.93" />
    <rect className="cls-1" x="36.62" width="9.94" height="9.93" />
    <rect className="cls-1" x="36.62" y="47.01" width="9.94" height="9.93" />
    <rect className="cls-1" x="48.51" width="9.93" height="9.93" />
    <rect className="cls-1" x="48.51" y="47.01" width="9.93" height="9.93" />
    <rect className="cls-1" x="60.22" width="9.94" height="9.93" />
    <rect className="cls-1" x="60.22" y="11.71" width="9.94" height="9.93" />
    <rect className="cls-1" x="60.22" y="35.3" width="9.94" height="9.93" />
    <rect className="cls-1" x="60.22" y="47.01" width="9.94" height="9.93" />
    <rect className="cls-1" x="71.93" y="11.71" width="9.94" height="9.93" />
    <rect className="cls-1" x="71.93" y="35.3" width="9.94" height="9.93" />
    <rect className="cls-1" x="83.44" y="0.03" width="9.93" height="9.93" />
    <rect className="cls-1" x="83.44" y="23.62" width="9.93" height="9.93" />
    <rect className="cls-1" x="83.44" y="35.33" width="9.93" height="9.93" />
    <rect className="cls-1" x="83.44" y="47.04" width="9.93" height="9.93" />
    <rect className="cls-1" x="95.15" y="0.03" width="9.93" height="9.93" />
    <rect className="cls-1" x="95.15" y="23.62" width="9.93" height="9.93" />
    <rect className="cls-1" x="95.15" y="47.04" width="9.93" height="9.93" />
    <rect className="cls-1" x="106.86" y="0.03" width="9.94" height="9.93" />
    <rect className="cls-1" x="106.86" y="23.62" width="9.94" height="9.93" />
    <rect className="cls-1" x="106.86" y="47.04" width="9.94" height="9.93" />
    <rect className="cls-1" x="118.74" y="0.03" width="9.93" height="9.93" />
    <rect className="cls-1" x="118.74" y="23.62" width="9.93" height="9.93" />
    <rect className="cls-1" x="118.74" y="47.04" width="9.93" height="9.93" />
    <rect className="cls-1" x="130.45" y="0.03" width="9.94" height="9.93" />
    <rect className="cls-1" x="130.45" y="11.74" width="9.94" height="9.93" />
    <rect className="cls-1" x="130.45" y="23.62" width="9.94" height="9.93" />
    <rect className="cls-1" x="130.45" y="35.33" width="9.94" height="9.93" />
    <rect className="cls-1" x="130.45" y="47.04" width="9.94" height="9.93" />
    <rect className="cls-1" x="142.16" y="11.74" width="9.94" height="9.93" />
    <rect className="cls-1" x="142.16" y="23.62" width="9.94" height="9.93" />
    <rect className="cls-1" x="142.16" y="35.33" width="9.94" height="9.93" />
  </svg>
);

const CustomFooter = () => <Footer links={links} Content={Content} Logo={CALogo} />;

export default CustomFooter;
