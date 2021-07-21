import { DELLISTBOARDFAILL, DELLISTBOARDSUCCESS } from '../ActionsTypes'


const initialState = {
    del_data: null,
    error: null
}


const success = (state, action) => {
    return {
        del_data: action.data
    }
}
const faill = (state, action) => {
    return {
        error: action.error
    }
}

const Dellistboard = (state=initialState, action) => {
    switch (action.type) {
        case DELLISTBOARDSUCCESS:
            return success(state, action);
        case DELLISTBOARDFAILL:
            return faill(state, action);
        default:
            return state;
    }
}
export default Dellistboard;