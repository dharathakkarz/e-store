
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/UserAction';
import { isLoggedIn } from '../utils/authUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore,faCartShopping,faShop,faUser} from '@fortawesome/free-solid-svg-icons';
import '../assets/nav.scss'


const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <FontAwesomeIcon icon={faStore} className='animationicon' />
      <a className="navbar-brand" href="/product">Ecommerce-store</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
         
          {/* show  Product button  if the current page is not /product */}
          {location.pathname !== "/product" && (
            <Link className="nav-item nav-link" to="/product">
               <FontAwesomeIcon icon={faShop} className='animationicon'/>
               Product
            </Link>
          )}
          
          {location.pathname !== "/cart" && (            
            <Link className="nav-item nav-link" to="/cart">
               <FontAwesomeIcon icon={faCartShopping}className='animationicon' /> 
               Cart
            </Link>
          )}

         

          {!loggedIn && <Link className="animationicon nav-item nav-link" to="/login">
          <FontAwesomeIcon icon={faUser} />
          Login
            </Link>}
          {loggedIn && <button className="nav-item nav-link btn btn-link" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUser} />
          Logout
            </button>}
        </div>
      </div>
      <div>
      <a className="navbar-brand" href="/men">MEN</a>
      <a className="navbar-brand" href="/women">WOMEN</a>
      <a className="navbar-brand" href="/jewelery">JEWELERY</a>
      <a className="navbar-brand" href="/electronics">ELECTRONICS</a>
      </div>
    </nav>
  );
};

export default Nav;  
