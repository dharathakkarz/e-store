export const isLoggedIn = () => {
    // get  token from local storage
    const token = localStorage.getItem('token');
     return token !== null;
  };


