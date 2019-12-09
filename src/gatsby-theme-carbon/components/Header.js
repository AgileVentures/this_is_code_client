import React, { useContext } from 'react';
import { Link } from 'gatsby';
import {
  Header as ShellHeader,
  HeaderMenuButton,
  SkipToContent,
  HeaderGlobalBar,
} from 'carbon-components-react/lib/components/UIShell';
import cx from 'classnames';

import GlobalSearch from 'gatsby-theme-carbon/src/components/GlobalSearch';
import NavContext from 'gatsby-theme-carbon/src/util/context/NavContext';
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata';

import {
  header,
  skipToContent,
  headerName,
  collapsed,
  headerButton,
} from 'gatsby-theme-carbon/src/components/Header/Header.module.scss';

import TICLogo from '../../images/svg/tic_logo.svg'

// const CALogo2 = () => (
//   <svg preserveAspectRatio="xMinYMid meet" x="25" y="0" viewBox="0 0 100 400" width="500" height="300">
//     <defs>
//       <style>{
//         `.cls-1{
//       fill:none;
//       stroke:#fdfdfd;
//       stroke-miterlimit:10;
//       stroke-width:7px;
//     }
//     .cls-2{
//       fill:#fff;
//     }`}</style>
//     </defs>
//     <rect className="cls-1" x="3.5" y="3.5" width="818.37" height="123.28" />
//     <path className="cls-2" d="M95.23,51.57V64.41L83.39,76.25,95.23,88v12.84L70.75,76.25h.1l-.1-.1Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M159,48.46H139.36V113h-9V48.46H110.17v-9H159Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M222.72,39.44V113h-9V81.06H182.9V113h-9V39.44h9V72h30.79V39.44Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M250.4,48.46h-9v-9h9Zm0,64.5h-9V57.49h9Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M290.22,48.46a11.35,11.35,0,0,0-4.51.9,11.42,11.42,0,0,0-6.12,6.1,11.22,11.22,0,0,0-.9,4.49v.2a10.88,10.88,0,0,0,.9,4.44,12.23,12.23,0,0,0,2.46,3.65,11.13,11.13,0,0,0,3.66,2.5,11.52,11.52,0,0,0,4.51.89h4.42a18.78,18.78,0,0,1,6.92,1.26,25.37,25.37,0,0,1,5.91,3.27,20.31,20.31,0,0,1,5.57,7,20.09,20.09,0,0,1,2.06,9v.2a20.19,20.19,0,0,1-1.61,8,21.1,21.1,0,0,1-4.36,6.59,20.32,20.32,0,0,1-14.49,6h-25v-9h25a11.35,11.35,0,0,0,4.51-.9,11.56,11.56,0,0,0,3.66-2.46,11.48,11.48,0,0,0,3.36-8.17v-.2a11.05,11.05,0,0,0-.9-4.47,12.27,12.27,0,0,0-2.46-3.66,11.26,11.26,0,0,0-8.17-3.41h-4.82a20.34,20.34,0,0,1-7.92-1.75,20.48,20.48,0,0,1-10.69-10.84,20,20,0,0,1-1.55-7.87V60a20.13,20.13,0,0,1,1.6-8,20.56,20.56,0,0,1,11-11,20.08,20.08,0,0,1,8-1.6H315.1v9Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M360.52,48.46h-9v-9h9Zm0,64.5h-9V57.49h9Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M400.34,48.46a11.39,11.39,0,0,0-4.51.9,11.7,11.7,0,0,0-3.66,2.45,11.4,11.4,0,0,0-2.46,3.65,11.22,11.22,0,0,0-.9,4.49v.2a10.88,10.88,0,0,0,.9,4.44,12.23,12.23,0,0,0,2.46,3.65,11.34,11.34,0,0,0,3.66,2.5,11.56,11.56,0,0,0,4.51.89h4.42a18.78,18.78,0,0,1,6.92,1.26,25.64,25.64,0,0,1,5.92,3.27,20.4,20.4,0,0,1,5.56,7,20.09,20.09,0,0,1,2.06,9v.2a20.36,20.36,0,0,1-1.6,8,21.3,21.3,0,0,1-4.37,6.59,20.32,20.32,0,0,1-14.49,6h-25v-9h25A11.48,11.48,0,0,0,416.29,92.4v-.2a11.05,11.05,0,0,0-.9-4.47,12.27,12.27,0,0,0-2.46-3.66,11.26,11.26,0,0,0-8.17-3.41h-4.82A20.34,20.34,0,0,1,392,78.91a20.7,20.7,0,0,1-6.42-4.42,20.34,20.34,0,0,1-4.26-6.42,19.85,19.85,0,0,1-1.56-7.87V60a20.14,20.14,0,0,1,1.61-8,20.86,20.86,0,0,1,4.41-6.57A20.63,20.63,0,0,1,392.37,41a20.12,20.12,0,0,1,8-1.6h24.88v9Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M508.88,113H491.12a36.25,36.25,0,0,1-14-2.76,36.46,36.46,0,0,1-20-20,37.09,37.09,0,0,1,0-28.08,36.52,36.52,0,0,1,20-20,36.42,36.42,0,0,1,14-2.75h17.76v9H491.12a26.73,26.73,0,0,0-10.78,2.21,28.33,28.33,0,0,0-8.83,6,27.66,27.66,0,0,0-5.91,8.83,28,28,0,0,0,0,21.56,27.4,27.4,0,0,0,14.74,14.75,27.37,27.37,0,0,0,10.78,2.15h17.76Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M558.73,113A36.62,36.62,0,0,1,522,76.25a36.85,36.85,0,0,1,2.76-14.14,36,36,0,0,1,8-11.94,36.74,36.74,0,1,1,51.86,52.06A36.11,36.11,0,0,1,558.73,113Zm0-64.5A27.17,27.17,0,0,0,548,50.62,27.46,27.46,0,0,0,533.2,65.37a28.23,28.23,0,0,0,0,21.66A27.46,27.46,0,0,0,548,101.78a28.1,28.1,0,0,0,21.56,0,27.69,27.69,0,0,0,8.83-5.92,28.33,28.33,0,0,0,6-8.83,27.76,27.76,0,0,0,0-21.66,28.33,28.33,0,0,0-6-8.83,27.69,27.69,0,0,0-8.83-5.92A27.2,27.2,0,0,0,558.73,48.46Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M612.59,103.93h17.56a27.64,27.64,0,0,0,19.71-8.07,28.47,28.47,0,0,0,6-8.83,27.4,27.4,0,0,0,0-21.56A28,28,0,0,0,641,50.67a27,27,0,0,0-10.88-2.21H612.59v-9h17.56a37.06,37.06,0,0,1,14.14,2.75,36.18,36.18,0,0,1,11.94,8,36.35,36.35,0,0,1,10.83,26.08,36.09,36.09,0,0,1-2.76,14,37,37,0,0,1-8.07,11.94,36.15,36.15,0,0,1-11.94,8A36.88,36.88,0,0,1,630.15,113H612.59Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M731.76,48.46H682.91v-9h48.85ZM712.1,80.76H682.91v-9H712.1ZM731.76,113H682.91v-9h48.85Z" transform="translate(-7.78 -11.05)" />
//     <path className="cls-2" d="M770.67,76.25h.1L746.3,100.82V88l11.84-11.73L746.3,64.41V51.57l24.47,24.58Z" transform="translate(-7.78 -11.05)" />
//   </svg>
// )
const Header = ({ children }) => {
  const {
    leftNavIsOpen,
    toggleNavState,
    searchIsOpen,
  } = useContext(NavContext);
  const { isSearchEnabled } = useMetadata();

  return (
    <>
      <ShellHeader aria-label="Header" className={header}>
        <SkipToContent className={skipToContent} />
        <HeaderMenuButton
          className={cx('bx--header__action--menu', headerButton)}
          aria-label="Open menu"
          onClick={() => {
            toggleNavState('leftNavIsOpen');
            toggleNavState('switcherIsOpen', 'close');
          }}
          isActive={leftNavIsOpen}
        />
        <Link
          className={cx(headerName, {
            [collapsed]: searchIsOpen,
          })}
          to="/"
        >
          {children}
        </Link>
        <HeaderGlobalBar>
          {isSearchEnabled && <GlobalSearch />}

        </HeaderGlobalBar>
      </ShellHeader>
    </>
  );
};

const DefaultHeaderText = () => (
  <>
    <TICLogo />
    {/* <img src={CALogo2} alt="This Is Code"/> */}
    {/* This Is&nbsp;<span>Code</span> */}
  </>
);

Header.defaultProps = {
  children: <DefaultHeaderText />,
};

export default Header;
