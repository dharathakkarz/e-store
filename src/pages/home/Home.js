import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../assets/home.scss'; 

const Home = () => {
  return (
    <div className="home-container">
      <Link to="/product" className="product-link">
       Shop Like Your Own Store
      </Link>
    </div>
  );
};

export default Home;
