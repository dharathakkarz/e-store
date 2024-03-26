import {FETCH_PRODUCT_DONE,FETCH_PRODUCT_FAIL} from '../../constant/ActionType'


const  initialState = {
    products:[],
    error: null,
}

export const productReducer =  (state=initialState, action) =>{
    switch(action.type){
        case FETCH_PRODUCT_DONE:
            return {...state,products:action.payload};
            case FETCH_PRODUCT_FAIL:
                return {...state,error:action.payload};    
        
        default :return state;
    }

}