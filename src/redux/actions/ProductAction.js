import {FETCH_PRODUCT_DONE,FETCH_PRODUCT_FAIL} from '../../constant/ActionType'


import axios from 'axios'
export const fetchProduct =()=>{
    return async (dispatch)=>{
        try {
            const response = await axios.get('https://fakestoreapi.com/products')
            
       console.log('response',response)
       
            dispatch({type:FETCH_PRODUCT_DONE,payload:response.data}) 
            
        } catch (error) {
            dispatch({type:FETCH_PRODUCT_FAIL})
            
        }
    }
}