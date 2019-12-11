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
import { connect } from 'react-redux'

const Header = (props) => {
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
          {props.children}
        </Link>
        <h2>
          {props.message}
        </h2>
        <HeaderGlobalBar>
          {isSearchEnabled && <GlobalSearch />}

        </HeaderGlobalBar>
      </ShellHeader>
    </>
  );
};

const DefaultHeaderText = () => (
  <TICLogo />
);

Header.defaultProps = {
  children: <DefaultHeaderText />,
};

const mapStateToProps = (state) => (
  { message: state.message }
)

export default connect(mapStateToProps)(Header);
