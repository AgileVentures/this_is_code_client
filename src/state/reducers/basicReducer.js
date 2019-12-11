const fakeAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return (
        {
          ...state,
          user:
          {
            userName: 'Kalle',
            loggedIn: true,
          },
          displayAuthModal: false

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
          displayAuthModal: true
        }
      )
    case 'HIDE_AUTH_MODAL':
      return (
        {
          ...state,
          displayAuthModal: false
        }
      )
    default:
      return state
  }
}

export { fakeAuthReducer }

