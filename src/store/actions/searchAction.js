import * as types from './types';


export function searchProducts(data){
    return {type: types.SEARCH_PRODUCTS, data}
}