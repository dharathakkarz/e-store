

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,LOGIN_SUCCESS ,LOGOUT_SUCCESS} from '../../constant/ActionType';

const initialState = {
  loading: false,
  error: null,
  user:null,

  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
      };
      case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user:null 
      };
    default:
      return state;
  }
};

export default userReducer;
