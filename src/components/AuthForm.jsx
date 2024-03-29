import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Modal, TextInput } from "carbon-components-react";
import { fieldTypes, auth } from "../modules/authUtils";
import { NOTIFY, AUTHENTICATE } from "../state/actions/actionTypes";
import { setCurrentCredentials } from "../helpers/localstorageHelper";
import Loader from "./Loader";

const AuthForm = props => {
  const intitialFormData = {};

  props.fields.forEach(formElement => {
    intitialFormData[formElement.name] = "";
  });

  const [formValues, setFormValues] = useState(intitialFormData);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleFieldValueChange = event => {
    const formDataCopy = { ...formValues };
    formDataCopy[event.target.name] = event.target.value;
    setFormValues(formDataCopy);
  };

  const formSubmitHandler = () => {
    setLoader(true);
    switch (props.variant) {
      case "login":
        auth
          .signIn(formValues.email, formValues.password)
          .then(response => {
            setCurrentCredentials(auth.tokenHeaders());
            dispatch({ type: AUTHENTICATE, payload: response.user });
          })
          .catch(error => {
            dispatch({
              type: NOTIFY,
              payload: {
                title: "Error",
                caption: error.response.data.errors.toString()
              }
            });
          });
          setLoader(false);
        break;
      case "register":
        let values = {
          email: formValues.email,
          password: formValues.password,
          password_confirmation: formValues.passwordConfirmation,
          first_name: formValues.firstName,
          last_name: formValues.lastName
        };

        auth
          .signUp(values)
          .then(response => {
            setCurrentCredentials(auth.tokenHeaders());
            dispatch({ type: AUTHENTICATE, payload: response.data.data });
          })
          .catch(error => {
            let errorMessage;
            try {
              errorMessage = error.response.data.errors.full_messages.toString();
            } catch {
              errorMessage = error.message;
            }
            dispatch({
              type: NOTIFY,
              payload: { title: "Error", caption: errorMessage }
            });
          });
        setLoader(false);
        break;
      default:
        return;
    }
  };

  const fieldsToRender = props.fields.map(item => fieldTypes[item]);

  const formFields = fieldsToRender.map(formItem => {
    return (
      <div key={formItem.id}>
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
          pattern={() =>
            formItem.type === ("password" || "passwordConfirmation") &&
            "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          }
        />
        <br />
      </div>
    );
  });

  return (
    <>
      <Modal
        focusTrap={true}
        iconDescription="Close"
        modalHeading={props.header}
        open
        passiveModal={false}
        modalAriaLabel={props.variant}
        primaryButtonText={props.header}
        secondaryButtonText="Cancel"
        primaryButtonDisabled={false}
        onRequestClose={() => props.dispatch({ type: "HIDE_AUTH_MODAL" })}
        onRequestSubmit={() => formSubmitHandler()}
        selectorPrimaryFocus="input"
      >
        {props.notification && (
          <h1 style={{ color: "red" }}>{props.notification.caption}</h1>
        )}
        {formFields}
        {loader && <Loader />}
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps)(AuthForm);
