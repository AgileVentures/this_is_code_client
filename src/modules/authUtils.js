import JtockAuth from 'j-tockauth'

const auth = new JtockAuth({
  host: process.env.GATSBY_RAILS_API,
})

const fieldTypes = {
  email: {
    type: 'text',
    name: 'email',
    id: 'email',
    text: 'Email',
    placeholder: 'jack@mail.com',
    required: true,
  },
  password: {
    type: 'password',
    name: 'password',
    text: 'Password',
    required: true,
  },
  passwordConfirmation: {
    type: 'password',
    name: 'passwordConfirmation',
    text: 'Password Confirmation',
    required: true,
  },
  firstName: {
    type: 'text',
    name: 'firstName',
    id: 'first_name',
    text: 'First name',
    placeholder: 'Jack',
    required: true,
  },
  lastName: {
    type: 'text',
    name: 'lastName',
    id: 'last_name',
    text: 'Last name',
    placeholder: 'Doe',
    required: true,
  },
}

export { auth, fieldTypes }
