const authReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return (
        {
          ...state,
          notification: action.payload,
        }
      )
    case 'LOGIN':
      return (
        {
          ...state,
          user: { ...action.payload.user, loggedIn: true },
          displayAuthModal: false,
          notification: `Welcome ${action.payload.user.firstName}!`
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
          displayAuthModal: false

        }
      )
    case 'DISPLAY_AUTH_MODAL':
      return (
        {
          ...state,
          displayAuthModal: true,
          notification: null
        }
      )
    case 'HIDE_AUTH_MODAL':
      return (
        {
          ...state,
          displayAuthModal: false,
          notification: null
        }
      )
    default:
      return state
  }
}

export { authReducer }

