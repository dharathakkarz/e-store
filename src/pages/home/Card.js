

import '../../assets/Card.scss'

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction'; 
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.products); 
  const containerRef = useRef(null); 
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleNextClick = () => {
    containerRef.current.scrollLeft += 290; 
  };

  const handlePrevClick = () => {
    containerRef.current.scrollLeft -= 290; 
  };
  const handleCardClick = () => {
    navigate('/product');
 
    console.log('Clicked on a card. Navigating to product page...');
  };

  return (
    <div className="carousel-container-51" onClick={handleCardClick} ref={containerRef}>
      <button className="carousel-button-51 prev" onClick={handlePrevClick}>Previous</button>
      <div className="product-details-wrapper-51">
        <div ref={containerRef} className="product-details-51">
          {products.map((product, index) => (
            <div key={product.id} className="card-51" style={{ width: '17rem', height: '20rem' }}>
              <img className="card-img-top-51" src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
              <div className="card-body-51">
                <h5 className="card-title-51">{product.title}</h5>
                <p className="card-text-51">Price: {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button-51 next" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default Card;

