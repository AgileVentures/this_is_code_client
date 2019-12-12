import React, { useState } from "react";
import { Modal, Form, FormGroup, TextInput } from "carbon-components-react";
import { connect } from 'react-redux'
import axios from 'axios'

const AuthForm = (props) => {
  // const fields = {
  //   email: {
  //     type: "text",
  //     name: "email",
  //     id: 'email',
  //     text: "Email",
  //     placeholder: "jack@mail.com",
  //     required: false
  //   },
  //   password: {
  //     type: "password",
  //     name: "password",
  //     text: "Password",
  //     validations: [],
  //     required: false
  //   },
  //   passwordConfirmation: {
  //     type: "password",
  //     name: "passwordConfirmation",
  //     text: "Password Confirmation",
  //     validations: [{ fn: passwordConfirmationRule }],
  //     required: false
  //   },

  // }
  const loginHandler = () => {
    props.dispatch({ type: 'LOGIN' })

    const url = 'https://hooks.slack.com/services/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'
    const data = {
      text: `${props.user.userName} just logged in to ThisIsCode`,
    }
    if (props.user.loggedIn) {
      axios.post(url, JSON.stringify(data), {
        withCredentials: false,
        transformRequest: [(data, headers) => {
          delete headers.post["Content-Type"]
          return data
        }]
      })
    }
  }


  return (
    <>
      <Modal
        focusTrap={true}
        // hasForm
        // hasScrollingContent={true}
        iconDescription="Close"
        modalHeading='Log in'
        open
        passiveModal={false}
        modalAriaLabel='Log in'
        // shouldCloseAfterSubmit={true}
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
  { user: state.user }
)

export default connect(mapStateToProps)(AuthForm)
