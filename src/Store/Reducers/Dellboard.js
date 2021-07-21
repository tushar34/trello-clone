import { DELBOARDSUCCESS, DELBOARDFAILL } from '../ActionsTypes';

const initialState = {
    delboards: null,
    error: null,
    
};


const delsuccess = (state, action) => {
    return {
        delboards:action.data
    }
}
const delfaill = (state, action) => {
    return {
        error:action.error
    }
}
const DelBoards = (state = initialState, action) => {
    switch (action.type) {
        case DELBOARDSUCCESS:
            return delsuccess(state, action);
        case DELBOARDFAILL:
            return delfaill(state, action);
        default:
            return state;
    }
}
export default DelBoards;