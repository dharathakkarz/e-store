

import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CHECKOUT } from '../../constant/ActionType';

// Load cart items from local storage if available
const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  product: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedItems = [...state.items, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
      return {
        ...state,
        items: updatedItems,
      };
      case REMOVE_FROM_CART:
        const filteredItems = state.items.filter(item => item && item.id !== action.payload);
        localStorage.setItem('cartItems', JSON.stringify(filteredItems)); // Update local storage
        return {
          ...state,
          items: filteredItems,
        };
    case ADD_TO_CHECKOUT:
      return { 
        ...state,
        product: action.payload 
      }; // Store product in the checkout 
    default:
      return state;
  }
};

export default cartReducer;


