

import { combineReducers } from 'redux';
import {productReducer} from '../reducer/ProductReducer';

const rootReducer = combineReducers({
  products: productReducer
});

export default rootReducer;