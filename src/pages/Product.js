

import React, { useState, useEffect } from 'react';
import '../assets/product.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../redux/actions/ProductAction';

const Product = () => {
  const dispatch = useDispatch();
  const { products = [], error } = useSelector(state => state.products);
  const [sortByPrice, setSortByPrice] = useState(''); // State for sorting
  const [searchQuery, setSearchQuery] = useState(''); // State for searching
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const [itemsPerPage] = useState(6); // Number of items to display per page

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Apply search filter to all products
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery) || // Search by title
    product.category.toLowerCase().includes(searchQuery) // Search by category
  );

  // Sort current items based on price if sorting option is enabled
  let sortedProducts = [...filteredProducts];
  if (sortByPrice === 'lowToHigh') {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortByPrice === 'highToLow') {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Calculate index of the first and last item of current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get current items for the current page
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  // Handle sorting option change
  const handleSort = (e) => {
    setSortByPrice(e.target.value);
  };

  return (
    <div className="product-container">
      <div>
        {/* Searching */}
        <input 
          type="text" 
          placeholder="Search Products" 
          value={searchQuery} 
          onChange={handleSearch} 
        />
        
        {/* Sorting option */}
        <select onChange={handleSort}>
          <option value="">Filter</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="card-container">
        {currentItems.map(product => (
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
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : null}>{i + 1}</button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedProducts.length / itemsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default Product;  // with searching(title and category) pagination, and sorting per page
