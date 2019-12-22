import React, { useState } from "react";
import { Modal, TextInput } from "carbon-components-react";
import { connect } from 'react-redux'
import { fieldTypes, auth, LocalStorageMock, isSSR } from '../modules/authUtils'


global.localStorage = isSSR ? new LocalStorageMock : window.localStorage

const AuthForm = (props) => {
  const intitialFormData = {};
  props.fields.forEach(formElement => {
    intitialFormData[formElement.name] = "";
  });
  const [formValues, setFormValues] = useState(intitialFormData);
  const handleFieldValueChange = (event) => {
    const formDataCopy = { ...formValues };
    formDataCopy[event.target.name] = event.target.value;
    setFormValues(formDataCopy);
  }

  const formSubmitHandler = () => {
    auth
      .signIn(formValues.email, formValues.password)
      .then(user => {
        props.dispatch({ type: 'LOGIN', payload: user })
      })
      .catch(error => {
        props.dispatch({ type: 'NOTIFY', payload: error.response.data.errors.toString() })
      });
  }

  const fieldsToRender = props.fields.map(item => (fieldTypes[item]))

  const formFields = fieldsToRender.map(formItem => {
    return (
      <>
        <TextInput
          disabled={false}
          helperText=""
          name={formItem.name}
          id={formItem.id}
          invalid={false}
          invalidText=""
          light={false}
          onBlur={handleFieldValueChange}
          labelText={formItem.text}
          placeholder={formItem.placeholder}
          type={formItem.type}
          required={formItem.required}
          pattern={() => formItem.type === 'password' && "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"}
        />
        <br />
      </>
    )
  })


  return (
    <>
      <Modal
        focusTrap={true}
        iconDescription="Close"
        modalHeading='Log in'
        open
        passiveModal={false}
        modalAriaLabel='Log in'
        primaryButtonText='Log in'
        secondaryButtonText="Cancel"
        primaryButtonDisabled={false}
        onRequestClose={() => props.dispatch({ type: 'HIDE_AUTH_MODAL' })}
        onRequestSubmit={() => formSubmitHandler()}
        selectorPrimaryFocus="input"
      >
        {props.notification &&
          <h1>{props.notification}</h1>
        }
        {formFields}
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => (
  {
    user: state.user,
    notification: state.notification
  }
)

export default connect(mapStateToProps)(AuthForm)
