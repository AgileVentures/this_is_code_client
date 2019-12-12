import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';
import {
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react';

import { connect } from 'react-redux'

const links = [
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
const CustomResources = (props) => {
  if (props.message) {
    links.push({ title: props.message, href: '#' })
  }

  return (
    <>
      {props.user.loggedIn ?
        <>
          <SideNavMenu title={`Hello ${props.user.userName}`}>
            <SideNavMenuItem
              element={SideNavLink}

              children='Sign out'
              onClick={() => { props.dispatch({ type: 'LOGOUT' }) }} />
          </SideNavMenu>

        </> :
        <SideNavLink
          children='Login'
          onClick={() => { props.dispatch({ type: 'DISPLAY_AUTH_MODAL' }) }} />
      }
      <ResourceLinks shouldOpenNewTabs links={links} />
    </>
  )
}


const mapStateToProps = (state) => (
  { user: state.user }
)
export default connect(mapStateToProps)(CustomResources);
