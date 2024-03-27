
import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/UserAction'; 
import { isLoggedIn } from '../utils/authUtils'; 

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Ecommerce-store</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                     {/* show  Product button  if the current page is not /product */}
         {location.pathname !== "/product" && (
             <Link className="nav-item nav-link" to="/product">Product</Link>
           )}
          
          {!loggedIn && <Link className="nav-item nav-link" to="/login">Login</Link>}
          {loggedIn && <button className="nav-item nav-link btn btn-link" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Nav;




