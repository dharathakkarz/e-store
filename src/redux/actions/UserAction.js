


import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,LOGOUT_SUCCESS } from '../../constant/ActionType';


//for signup
export const signupRequest = (userData) => {
  return {
    type: SIGNUP_REQUEST,
    payload: userData,
  };
};



export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAIL,
    payload: error,
  };
};



// Login action
export const loginUser = (email, password,navigate, setError) => {
  return (dispatch) => {
    // Check if user exists in local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find(user => user.email === email && user.password === password);
    
    if (loggedInUser) {
        const token = generateToken(); // genrate token
      
      // Store the token in local storage
      localStorage.setItem('token', token);
      
      // Dispatch action to update user state in Redux
      dispatch({ type: 'LOGIN_SUCCESS', payload: loggedInUser });
      localStorage.setItem('isLoggedIn', true);

      
    } else {
      setError('Invalid email or password');
    }
  };
};

// to genrate the token
const generateToken = () => {
  return Math.random().toString(30).substr(2); //random token
};




// Logout action
export const logoutUser = () => {
  return (dispatch) => {
    // Remove login status from local storage
    //localStorage.removeItem('token');
    //localStorage.setItem('isLoggedIn', false);
    localStorage.clear();

 
    // Dispatch action to logout user
    dispatch({ type: LOGOUT_SUCCESS });
   
  
  };
};

  