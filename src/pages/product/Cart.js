



import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/cart.scss';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/authUtils';
import { warnmessage, toaststyle } from '../../constant/Message';
import { removeFromCart } from '../../redux/actions/CartAction'; 
import { useDispatch } from 'react-redux';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [moreDescriptions, setMoreDescriptions] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cart items or set them from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, [cartItems]);


  
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.warn(warnmessage.CARTREMOVE, { ...toaststyle });
  };
  


  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/product');
    }
  }, [navigate]);

  const handleContinueShopping = () => {
    navigate('/product');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const toggleDescription = (productId) => {
    setMoreDescriptions(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <div className="card-container-4">
        {cartItems.map(product => (
          product && product.id ? (
            <div key={product.id} className="card-4">
                {product.image && (
                <img src={product.image} alt={product.title} className="card-image4" style={{ width: '100px', height: '100px' }} />
              )}
              <div className="card-details-4" >
              <h3 className="card-title-4">{product.title}</h3>
              <p className="card-description3">
                  {moreDescriptions[product.id] ? product.description : `${product.description.slice(0, 100)}...`}
                  <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => toggleDescription(product.id)}>
                    {moreDescriptions[product.id] ? ' Show Less' : ' Show More'}
                  </span>
                </p>
                <p className="card-price-4">Price: {product.price}</p>
                {product.category && <p className="card-category-4">Category: {product.category}</p>}
                {product.rating && (
                  <div className="card-rating-4">
                    <p>Rating: {product.rating.rate}</p>
                    {/* <p>Count: {product.rating.count}</p> */}
                    <p>Count: {product.rating.count - cartItems.reduce((total, item) => item.id === product.id ? total + item.quantity : total, 0)}</p>
                  
                  </div>
                )}

              </div>
              <div className="quantity-dropdown">
                Quantity:
                <select
                  value={product.quantity} 
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                >
                  {[...Array(10).keys()].map((quantity) => (
                    <option key={quantity} value={quantity}>{quantity}</option>
                  ))}
                </select>
              </div>
              <div className='twobtn-4'>
                  <button className='remove btn btn-primary' onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
                  <button className='checkout btn btn-primary' onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
          ) : null
        ))}
      </div>
      <button className='continue-shopping btn btn-primary' onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default Cart; //updated


