import React, { useState } from "react";
import { Modal, Form, FormGroup, TextInput } from "carbon-components-react";
import { connect } from 'react-redux'

const AuthForm = (props) => {
  return (
    <>
      <Modal
        focusTrap={true}
        hasForm
        hasScrollingContent
        iconDescription="Close"
        modalHeading='Log in'
        open
        passiveModal={false}
        shouldCloseAfterSubmit
        primaryButtonText='Log in'
        secondaryButtonText="Cancel"
        primaryButtonDisabled={false}
        onRequestClose={() => props.dispatch({type: 'HIDE_AUTH_MODAL'})}      
        onRequestSubmit={() => props.dispatch({type: 'LOGIN'})}
        selectorPrimaryFocus="input"
      >
        <h2>We will log you in as Kalle ;-)</h2>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => (
  { ...state }
)

export default connect(mapStateToProps)(AuthForm)
