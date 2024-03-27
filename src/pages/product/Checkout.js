
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/checkout.scss'; 

const Checkout = () => {
  return (
    <div className="checkout-container">
      <p>Thank you for your purchase!</p>
      <div className="button-container">
        <Link to="/cart">
          <button className="primary-button">View Cart</button>
        </Link>
        <Link to="/product">
          <button className="primary-button">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;


