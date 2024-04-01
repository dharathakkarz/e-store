
import '../../assets/Card.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction'; 
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.products); 
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrollPosition(prevPosition => {
        const newPosition = prevPosition + 300;
        return newPosition >= products.length * 300 ? 0 : newPosition;
      });
    }, 3000); // automatic scroll every 4 seconds

    return () => clearInterval(intervalId); // clear interval when unmount or product.length change
  }, [products.length]); 

  const handleCardClick = () => {
    navigate('/product');
    console.log('Clicked on a card. Navigating to product page...');
  };

  return (
    <div className="carousel-container-51" >
      <div className="product-details-wrapper-51" style={{ display: 'flex', flexDirection: 'row', width: `${products.length * 300}px`, transform: `translateX(-${scrollPosition}px)` }}>
        {products.map((product, index) => (
          <div key={product.id} className="card-51" onClick={handleCardClick} >
            <img className="card-img-top-51" src={product.image} alt={product.title}  />
            <div className="card-body-51">
              <h5 className="card-title-51">{product.title}</h5>
              <p className="card-text-51">Price: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Card;
