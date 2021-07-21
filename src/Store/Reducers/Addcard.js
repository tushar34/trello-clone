import { ADDCARDSUCCESS, ADDCARDFAILL } from '../ActionsTypes';

const intialState = {
    data: null,
    error: null
}

const success = (state,action) =>{
    return{
        data:action.data
    }
}
const faill = (state,action) =>{
    return{
        error:action.error

    }
}

const Addcard = (state = intialState, action) => {
    switch (action.type) {
        case ADDCARDSUCCESS:
            return success(state, action);
        case ADDCARDFAILL:
            return faill(state, action);
        default:
            return state;
    }
}
export default Addcard;