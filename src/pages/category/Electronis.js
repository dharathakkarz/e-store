

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction';
import '../../assets/category.scss'; 

const Electronics = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);


  const electronicsProducts = products.filter(
    (product) => product.category === "electronics"
  );

  return (
    <div>
      <h2>Electronic Items</h2>
      <div className="responsive25">
        {electronicsProducts.map((product) => (
          <div key={product.id} className="gallery25">
            <a target="blank" href={product.image}>
              <img src={product.image} alt={product.title} width="600" height="400" />
            </a>
            <div className="desc25">
              <h3>{product.title}</h3>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating.rate}</p>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Electronics;
