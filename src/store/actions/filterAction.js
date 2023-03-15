import * as types from './types';


export function filterProducts(data){
    return {type: types.FILTER_PRODUCTS, data}
}