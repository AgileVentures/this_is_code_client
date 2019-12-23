import React from 'react';
import DefaultTemplate from 'gatsby-theme-carbon/src/templates/Default';
import AuthForm from '../../components/AuthForm'
import AuthLinks from '../../components/AuthLinks'

import { connect } from 'react-redux'

const ShadowedDefault = (props) => {
  return (
    <>
      {props.displaySignUpModal || props.displayLoginModal ?
        <AuthLinks />
        :
        <DefaultTemplate {...props} />
      }
    </>
  )
}

const mapStateToProps = (state) => (
  {
    displayLoginModal: state.displayLoginModal,
    displaySignUpModal: state.displaySignUpModal
  }
)

export default connect(mapStateToProps)(ShadowedDefault);