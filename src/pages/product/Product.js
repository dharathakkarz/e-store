
import React, { useState, useEffect } from 'react';
import '../../assets/product.scss';
import { isLoggedIn } from '../../utils/authUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/actions/CartAction';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], error } = useSelector(state => state.products);
  const [sortByPrice, setSortByPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [moreDescriptions, setmoreDescriptions] = useState({});

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    setOriginalProducts(products);
  }, [products]);

  //searching with title and category
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery)
  );

  //selected category
  let categoryFilteredProducts = filteredProducts;
  if (selectedCategories.length > 0) {
    categoryFilteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category.toLowerCase())
    );
  }

  //sorting
  let sortedProducts = [...categoryFilteredProducts];
  if (sortByPrice === 'lowToHigh') {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortByPrice === 'highToLow') {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  const handleSort = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'reset') {
      // Reset all filters and fetch original products
      setSearchQuery('');
      setSortByPrice('');
      setSelectedCategories([]);
      setCurrentPage(1);
      dispatch(fetchProduct()); // Fetch original products
    } else if (categories.includes(selectedValue)) {
      handleCategoryFilter(e);
    } else {
      setSortByPrice(selectedValue);
    }
  };

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value.toLowerCase();
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1);
  };

  const categories = [...new Set(products.map(product => product.category.toLowerCase()))];

  //  adding  product to the cart

  const handleAddToCart = (product) => {
    if (isLoggedIn()) {
      dispatch(addToCart(product));
      toast.success('Item added to cart successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/cart');
      }, 3000);
    } else {
      toast.error('Please complete the registration', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };
  const toggleDescription = (productId) => {
    setmoreDescriptions(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };
  return (
    <div className="product-container">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select onChange={handleSort}>
          <option value="" disabled selected placeholder="filter">Filter</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option disabled="disabled">Select category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
          <option value="reset">Reset</option>
        </select>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="card-container">
        {currentItems.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} className="card-image" style={{ width: '100px', height: '100px' }} />
            <div className="card-details">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-description">
                {moreDescriptions[product.id] ? product.description : `${product.description.slice(0, 100)}...`}
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => toggleDescription(product.id)}>
                  {moreDescriptions[product.id] ? ' Show Less' : ' Show More'}
                </span>
              </p>
              <p className="card-price">Price: {product.price}</p>
              <p className="card-category">Category: {product.category}</p>
              <div className="card-rating">
                <p>Rating: {product.rating.rate}</p>
                <p>Count: {product.rating.count}</p>
              </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* if no data found btn not show */}
      {sortedProducts.length > 0 && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedProducts.length / itemsPerPage)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Product;



