

import React from 'react';
import '../../assets/cart.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../redux/actions/CartAction';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleContinueShopping = () => {
    navigate('/product');
  };

  const handleCheckout = () => {
    
    navigate('/checkout');
  };

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <div className="card-container">
        {cartItems.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} className="card-image" style={{ width:'100px',height:'100px' }}/>
            <div className="card-details">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-description">Description: {product.description}</p>
              <p className="card-price">Price: {product.price}</p>
              <p className="card-category">Category: {product.category}</p>
              <div className="card-rating">
                <p>Rating: {product.rating.rate}</p>
                <p>Count: {product.rating.count}</p>
              </div>
              <div className='twobtn'>
              <button className='remove btn btn-primary' onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
              <button className='checkout btn btn-primary' onClick={handleCheckout}>Checkout</button>
           
              </div>
               </div>
          </div>
        ))}
      </div>
     
      <button className='continue-shopping btn btn-primary' onClick={handleContinueShopping}>Continue Shopping</button>
     
    </div>
  );
};

export default Cart;
