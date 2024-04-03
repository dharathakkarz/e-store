
import Slide from '../../pages/home/Slide'
import React, { useState, useEffect } from 'react';
import '../../assets/product.scss';
import { isLoggedIn } from '../../utils/authUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../redux/actions/ProductAction';
import { useNavigate } from 'react-router-dom';
import { addToCart ,updateProductCount} from '../../redux/actions/CartAction';
import { message, errormessage,warnmessage, toaststyle } from '../../constant/Message';

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
  const [moreDescriptions, setMoreDescriptions] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    setOriginalProducts(products);
  }, [products]);

  const handleQuantityChange = (productId, quantityChange) => {
    const newQuantity = quantityChange;
    if (newQuantity < 0) return; //  negative quantities not allowed
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };


  const handleAddToCart = (product) => {
    if (isLoggedIn()) {
      const quantityInCart = quantities[product.id] || 0;
      const totalQuantity = quantityInCart+1; 
      if (totalQuantity > 9) {
        // Display warning message if the limit is reached
        toast.warn(warnmessage.MOREADDED, {
          ...toaststyle
        });
      } else {
        //  add the item to the cart
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [product.id]: totalQuantity
        }));
        dispatch(addToCart(product, totalQuantity));
        toast.success(message.ADDCART, {
          ...toaststyle
        });
      }
    } else {
      toast.error(errormessage.CARTFAIL, {
        ...toaststyle,
        onClose: () => navigate('/login')
      });
    }
  };
  


  const toggleDescription = (productId) => {
    setMoreDescriptions(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery)
  );

  let categoryFilteredProducts = filteredProducts;
  if (selectedCategories.length > 0) {
    categoryFilteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category.toLowerCase())
    );
  }

  let sortedProducts = [...categoryFilteredProducts];
  if (sortByPrice === 'lowToHigh') {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortByPrice === 'highToLow') {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  const handleSort = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'reset') {
      setSearchQuery('');
      setSortByPrice('');
      setSelectedCategories([]);
      setCurrentPage(1);
      dispatch(fetchProduct());
    } else if (categories.includes(selectedValue)) {
      handleCategoryFilter(e);
    } else {
      setSortByPrice(selectedValue);
    }
  };

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

  return (
    <div>
 
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
      <Slide/>
      {error && <p>Error: {error}</p>}
      <div className="card-container">
        {currentItems.map(product => (
          <div key={product.id} className="card3">
            <img src={product.image} alt={product.title} className="card-image3"  />
            <div className="card-details3">
              <h3 className="card-title3">{product.title}</h3>
              <p className="card-description3">
                {moreDescriptions[product.id] ? product.description : `${product.description.slice(0, 100)}...`}
                <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => toggleDescription(product.id)}>
                  {moreDescriptions[product.id] ? ' Show Less' : ' Show More'}
                </span>
              </p>
              <p className="card-price3">Price: {product.price}</p>
              <p className="card-category3">Category: {product.category}</p>
              <div className="card-rating3">
                <p>Rating: {product.rating.rate}</p>
                {/* <p>Count: {product.rating.count}</p> */}
                <p>Count: {product.rating.count - (quantities[product.id] || 0)}</p>
                

              </div>
              <div className="quantity-dropdown">
                Quantity:<select value={quantities[product.id] || 1} onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}>
                  {[...Array(10).keys()].map((quantity) => (
                    <option key={quantity} value={quantity}>{quantity}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {sortedProducts.length > 0 && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedProducts.length / itemsPerPage)}>Next</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Product;  //working with dynamic add



