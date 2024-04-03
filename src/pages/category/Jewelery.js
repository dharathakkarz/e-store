



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction';
import '../../assets/category.scss'; 

const Jewelery = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // ( jewelery')
  const jeweleryProducts = products.filter(
    (product) => product.category === "jewelery"
  );

  return (
    <div>
      <h2>Jewelery</h2>
      <div className="responsive25">
        {jeweleryProducts.map((product) => (
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

export default Jewelery;
