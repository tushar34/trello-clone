
import { FETCHBOARDSSUCCESS, FETCHBOARDSFAIL, DELBOARDSUCCESS, DELBOARDFAILL } from '../ActionsTypes';

const initialState = {
    boards: null,
    error: null,
   
};

const success = (state, action) => {
    return {
        boards: action.data
    }
}
const faill = (state, action) => {
    return {
        error: action.error
    }
}



const AllBoards = (state = initialState, action) => {
    switch (action.type) {
        case FETCHBOARDSSUCCESS:
            return success(state, action);
        case FETCHBOARDSFAIL:
            return faill(state, action);
        default:
            return state;
    }
}
export default AllBoards;