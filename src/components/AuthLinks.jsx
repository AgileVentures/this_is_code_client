import React from 'react'
import { connect } from 'react-redux'
import AuthForm from './AuthForm'


const AuthLinks = (props) => {
  return (
    <>
      {props.displayLoginModal &&
        <AuthForm variant='login' header="Log in" fields={['email', 'password']} />}

      {props.displaySignUpModal &&
        <AuthForm variant='register' header="Register" fields={['email', 'firstName', 'lastName', 'password', 'passwordConfirmation']} />}
    </>
  )
}

const mapStateToProps = (state) => (
  {
    displayLoginModal: state.displayLoginModal,
    displaySignUpModal: state.displaySignUpModal
  }
)

export default connect(mapStateToProps)(AuthLinks);
