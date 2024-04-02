

import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CHECKOUT ,UPDATE_PRODUCT_COUNT} from '../../constant/ActionType';

// Load cart items from local storage if available
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

export default cartReducer;  //2nd working


// import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_CHECKOUT, UPDATE_PRODUCT_COUNT } from '../../constant/ActionType';

// // Load cart items from local storage if available
// const initialState = {
//   items: JSON.parse(localStorage.getItem('cartItems')) || [],
//   product: null
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       // find index of item in cart to add in qty
//       const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
//       if (existingItemIndex !== -1) {
//         const updatedItems = [...state.items];
//         updatedItems[existingItemIndex].quantity += action.payload.quantity;
//         localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
//         return {
//           ...state,
//           items: updatedItems,
//         };
//       } else {
//         const updatedItems = [...state.items, action.payload];
//         localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
//         return {
//           ...state,
//           items: updatedItems,
//         };
//       }

//     case REMOVE_FROM_CART:
//       const filteredItems = state.items.filter(item => item && item.id !== action.payload);
//       localStorage.setItem('cartItems', JSON.stringify(filteredItems)); // Update local storage
//       return {
//         ...state,
//         items: filteredItems,
//       };

//     case ADD_TO_CHECKOUT:
//       return {
//         ...state,
//         product: action.payload
//       }; // Store product in the checkout 

//       case UPDATE_PRODUCT_COUNT:
//         const { productId, newCount } = action.payload;
//         const updatedItems = state.items.map(item => {
//           if (item.id === productId) {
//             return {
//               ...item,
//               count: newCount
//             };
//           }
//           return item;
//         });
//         localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
//         return {
//           ...state,
//           items: updatedItems
//         };
  

//       return state; // If product is not found, return current state

//     default:
//       return state;
//   }
// };

// export default cartReducer;
