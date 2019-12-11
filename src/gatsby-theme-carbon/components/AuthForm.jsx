import React, { useState } from "react";
import { Modal, Form, FormGroup, TextInput } from "carbon-components-react";
import { connect } from 'react-redux'
import axios from 'axios'

const AuthForm = (props) => {
  const loginHandler = () => {
    // axios.post('https://hooks.slack.com/services/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', 
    // { text: "Somebody just logged in to ThisIsCode" })
    //   .then(() => {
    //   }).catch((error)=>{
    //     debugger
    //   })
    props.dispatch({ type: 'LOGIN' })
  }
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
        onRequestClose={() => props.dispatch({ type: 'HIDE_AUTH_MODAL' })}
        onRequestSubmit={() => loginHandler()}
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
