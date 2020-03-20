import {
  NOTIFY,
  AUTHENTICATE,
  LOGOUT,
  LOGIN,
  SIGN_UP,
  DISPLAY_AUTH_MODAL,
  HIDE_AUTH_MODAL
} from '../actions/actionTypes'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'NODE_AUTH_OK':
      return {
        ...state,
        user: { ...state.user, nodeLoggedIn: true }
      }
    case 'UPDATE_EVENTS':
      // console.log(state, action.payload)
      const updatedCourses = state.user.boughtCourses.map(course => {
        let events = course.events.map(event => {
          let updatedEvent = action.payload.filter(
            receivedEvent => Number(receivedEvent.id) === Number(event.id)
          )
          return updatedEvent[1] ? updatedEvent[1] : updatedEvent[0]
        })
        course.events = events
        return course
      })
      return {
        ...state,
        user: { ...state.user, boughtCourses: updatedCourses }
      }
    case 'DISPLAY_COURSE_DETAILS':
      return {
        ...state,
        displayCourse: {
          state: true,
          displayCourseInstance: action.payload
        }
      }
    case 'DISPLAY_COURSE':
      return {
        ...state,
        displayCourseModal: action.payload
      }
    case 'DISPLAY_PAYMENT_MODAL':
      return {
        ...state,
        displayPaymentModal: action.payload
      }
    case 'COURSE_PURCHASED':
      return {
        ...state,
        user: {
          ...state.user,
          boughtCourses: [...state.user.boughtCourses, action.payload]
        }
      }

    case 'HIDE_COURSE_DETAILS':
      return {
        ...state,
        displayCourse: {
          displayCourse: false,
          displayCourseInstance: {}
        }
      }
    case 'NOTIFY':
      return {
        ...state,
        notification: action.payload
      }
    case 'AUTHENTICATE':
      return {
        ...state,
        user: { ...action.payload, loggedIn: true },
        displayLoginModal: false,
        displaySignUpModal: false,
        notification: {
          title: 'Welcome',
          caption: `Nice to see you ${action.payload.firstName}!`
        }
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        user: {
          userName: null,
          loggedIn: false
        },
        displayLoginModal: false,
        notification: {
          title: 'Good bye',
          caption: `Your session has been terminated`
        }
      }
    case 'DISPLAY_AUTH_MODAL':
      switch (action.variant) {
        case LOGIN:
          return {
            ...state,
            displayLoginModal: true,
            notification: null
          }
        case SIGN_UP:
          return {
            ...state,
            displaySignUpModal: true,
            notification: null
          }
      }

    case 'HIDE_AUTH_MODAL':
      return {
        ...state,
        displayLoginModal: false,
        displaySignUpModal: false,
        notification: null
      }
    case 'TOGGLE_LOADER':
      return {
        ...state,
        displayLoader: action.payload
      }
    default:
      return state
  }
}

export { authReducer }
