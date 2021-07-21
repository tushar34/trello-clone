import { LISTBOARDSUCCESS, LISTBOARDFAILL } from '../ActionsTypes';

const initialState={
    listboard:null,
    error:null
}
const  success = (state,action) =>{
    return{
        listboard:action.data
    }
}
const faill = (state,action) =>{
    return{
        error:action.error
    }
}

const ListBoard = ( state=initialState,action) =>{
    switch(action.type){
        case LISTBOARDSUCCESS:
            return success(state,action);
        case LISTBOARDFAILL:
            return faill(state,action);
        default:
            return state;
        }
    }
    export default ListBoard;