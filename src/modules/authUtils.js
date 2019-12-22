import JtockAuth from 'j-tockauth'

const isSSR = typeof window === "undefined"

// const auth = () => {
//   if (!isSSR) {
//     return new JtockAuth({
//       host: "https://this-is-code-staging.herokuapp.com/",
//       // host: 'http://localhost:3000',
//       debug: false
//     });
//   } 
// }

const auth = new JtockAuth({
  host: "https://this-is-code-staging.herokuapp.com/",
  debug: false
});

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
  
  removeItem(key) {
    delete this.store[key];
  }
};


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

export  {auth, fieldTypes, LocalStorageMock, isSSR} 