
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../redux/actions/CartAction';
import { isLoggedIn } from '../../utils/authUtils';
import {warnmessage,toaststyle} from '../../constant/Message'


const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [moreDescriptions, setMoreDescriptions] = React.useState({});

  const handleRemoveFromCart = (productId) => {
    console.log("Removing product with ID:", productId);
    dispatch(removeFromCart(productId));
    toast.warn(warnmessage.CARTREMOVE, {
      ...toaststyle
      
     
    });
  };

  useEffect(()=>{
    if(!isLoggedIn()){
      navigate('/product')
    }
  })
 

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
                <img src={product.image} alt={product.title} className="card-image4" style={{ width:'100px',height:'100px' }}/>
              )}
              <div className="card-details-4">
                <h3 className="card-title-4">{product.title}</h3>
                {/* {product.description && <p className="card-description-4">Description: {product.description}</p>} */}
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
                    <p>Count: {product.rating.count}</p>
                  </div>
                )}
                <div className='twobtn-4'>
                  <button className='remove btn btn-primary' onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
                  <button className='checkout btn btn-primary' onClick={handleCheckout}>Checkout</button>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>
      <button className='continue-shopping btn btn-primary' onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
