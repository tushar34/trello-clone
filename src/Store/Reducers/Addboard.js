
import { ADDBOARDFAILL, ADDBOARDSUCCESS } from '../ActionsTypes';

const initialState = {
    addboard: null,
    error: null,
}

const success = (state, action) => {
    return {
        addboard: action.data,
    }
}

const faill = (state, action) => {
    return {
        error: action.error,
    }
}
const AddBoard = (state = initialState, action) => {
    switch (action.type) {
        case ADDBOARDSUCCESS:
            return success(state, action);
        case ADDBOARDFAILL:
            return faill(state, action);
        default:
            return state;
    }
}
export default AddBoard;