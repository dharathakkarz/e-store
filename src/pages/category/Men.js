

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction';
import '../../assets/category.scss'; 

const Men = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Filter men's clothing products
  const menClothingProducts = products.filter(
    (product) => product.category === "men's clothing"
  );

  return (
    <div>
      <h2>Men's Clothing</h2>
      <div className="responsive25">
        {menClothingProducts.map((product) => (
          <div key={product.id} className="gallery25">
            <a target="blank" href={product.image}>
              <img src={product.image} alt={product.title} className="card-image" />
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

export default Men;

