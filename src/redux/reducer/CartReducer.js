

import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CHECKOUT } from '../../constant/ActionType';

//  cart items from local storage if available
const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  product: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // find index of item in cart to add in qty
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        const updatedItems = [...state.items, action.payload];
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
        return {
          ...state,
          items: updatedItems,
        };
      }

  
    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      return {
        ...state,
        items: filteredItems,
      };


    case ADD_TO_CHECKOUT:
      return {
        ...state,
        product: action.payload
      }; 

    default:
      return state;
  }
};

export default cartReducer;  //2nd working

