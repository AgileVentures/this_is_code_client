import React from 'react';
import DefaultTemplate from 'gatsby-theme-carbon/src/templates/Default';
import AuthForm from '../components/AuthForm'
import { connect } from 'react-redux'

const ShadowedDefault = (props) => {
  return (
    <>
      {props.displayAuthModal ?
        <AuthForm />
        :
        <DefaultTemplate {...props} />
      }
    </>
  )
}

const mapStateToProps = (state) => (
  {
    displayAuthModal: state.displayAuthModal
  }
)

export default connect(mapStateToProps)(ShadowedDefault);