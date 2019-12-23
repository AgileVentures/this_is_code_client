const authReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return (
        {
          ...state,
          notification: action.payload,
        }
      )
    case 'AUTHENTICATE':
      return (
        {
          ...state,
          user: { ...action.payload.data.data, loggedIn: true },
          displayLoginModal: false,
          displaySignUpModal: false,
          notification: `Welcome ${action.payload.data.data.firstName}!`
        }
      )
    case 'LOGOUT':
      return (
        {
          ...state,
          user:
          {
            userName: null,
            loggedIn: false,
          },
          displayLoginModal: false
        }
      )
    case 'DISPLAY_AUTH_MODAL':
      switch (action.variant) {
        case 'LOGIN':
          return (
            {
              ...state,
              displayLoginModal: true,
              notification: null
            }
          )
        case 'SIGN_UP':
          return (
            {
              ...state,
              displaySignUpModal: true,
              notification: null
            }
          )
      }

    case 'HIDE_AUTH_MODAL':
      return (
        {
          ...state,
          displayLoginModal: false,
          displaySignUpModal: false,
          notification: null
        }
      )
    default:
      return state
  }
}

export { authReducer }

