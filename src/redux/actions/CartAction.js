import {ADD_TO_CART,REMOVE_FROM_CART,ADD_TO_CHECKOUT,UPDATE_PRODUCT_COUNT} from '../../constant/ActionType'



export const addToCart = (product,quantity) => ({
    type: ADD_TO_CART,
    payload: {...product,quantity}
  });
// export const addToCart = (product, quantity) => {
//   return (dispatch) => {
//     // Dispatch an action to update product count in the Redux store
//     dispatch(updateProductCount(product.id, product.count - quantity));

//     // Dispatch an action to add the product to the cart
//     dispatch({
//       type: ADD_TO_CART,
//       payload: {
//         product,
//         quantity
//       }
//     });
//   };
// };
  
  export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
  });

  export const addToCheckout = (product) => ({
    type: ADD_TO_CHECKOUT,
    payload: product,
  });

  // export const updateProductCount = (productId, newCount) => ({
  //   type: UPDATE_PRODUCT_COUNT,
  //   payload: {
  //     productId,
  //     newCount
  //   }
  // });
  
  

 