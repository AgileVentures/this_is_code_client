import {
  NOTIFY,
  AUTHENTICATE,
  LOGOUT,
  LOGIN,
  SIGN_UP,
  DISPLAY_AUTH_MODAL,
  HIDE_AUTH_MODAL
} from "../actions/actionTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_COURSE_DETAILS":
      return {
        ...state,
        displayCourse: {
          state: true,
          displayCourseInstance: action.payload
        }
      };
    case "COURSE_PURCHASED":
      return {
        ...state,
        user: {
          ...state.user,
          boughtCourses: [...state.user.boughtCourses, action.payload]
        },
        notification: {
          title: "Purchase successful",
          caption: `You have successfully purchased ${action.payload.title}!`
        }
      };

    case "HIDE_COURSE_DETAILS":
      return {
        ...state,
        displayCourse: {
          displayCourse: false,
          displayCourseInstance: {}
        }
      };
    case NOTIFY:
      return {
        ...state,
        notification: action.payload
      };
    case AUTHENTICATE:
      return {
        ...state,
        user: { ...action.payload, loggedIn: true },
        displayLoginModal: false,
        displaySignUpModal: false,
        notification: {
          title: "Welcome",
          caption: `Nice to see you ${action.payload.firstName}!`
        }
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: {
          userName: null,
          loggedIn: false
        },
        displayLoginModal: false,
        notification: {
          title: "Good bye",
          caption: `Your session has been terminated`
        }
      };
    case DISPLAY_AUTH_MODAL:
      switch (action.variant) {
        case LOGIN:
          return {
            ...state,
            displayLoginModal: true,
            notification: null
          };
        case SIGN_UP:
          return {
            ...state,
            displaySignUpModal: true,
            notification: null
          };
      }

    case HIDE_AUTH_MODAL:
      return {
        ...state,
        displayLoginModal: false,
        displaySignUpModal: false,
        notification: null
      };
    default:
      return state;
  }
};

export { authReducer };
