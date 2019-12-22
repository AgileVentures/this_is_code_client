import JtockAuth from 'j-tockauth'

const auth = new JtockAuth({
  host: "https://this-is-code-staging.herokuapp.com/",
  debug: false
});



const fieldTypes = {
  email: {
    type: "text",
    name: "email",
    id: 'email',
    text: "Email",
    placeholder: "jack@mail.com",
    required: true
  },
  password: {
    type: "password",
    name: "password",
    text: "Password",
    required: true
  },
  passwordConfirmation: {
    type: "password",
    name: "passwordConfirmation",
    text: "Password Confirmation",
    required: true
  },

}

export  {auth, fieldTypes} 