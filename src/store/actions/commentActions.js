import * as types from './types';


export function createComment(data){
      return {type: types.CREATE_COMMENT, data}
}

export function getComment({id}){
    return {type: types.GET_COMMENT, id}
}

