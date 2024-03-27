

import { combineReducers } from 'redux';
import {productReducer} from '../reducer/ProductReducer';
import userReducer from '../reducer/UserReducer';
import cartReducer from './CartReducer';

const rootReducer = combineReducers({
  products: productReducer,
  users: userReducer,
  cart:cartReducer
});

export default rootReducer;