import {ADD_TO_CART,REMOVE_FROM_CART,ADD_TO_CHECKOUT} from '../../constant/ActionType'



export const addToCart = (product,quantity) => ({
    type: ADD_TO_CART,
    payload: {...product,quantity}
  });

  
  export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
  });

  export const addToCheckout = (product) => ({
    type: ADD_TO_CHECKOUT,
    payload: product,
  });


  
  

 