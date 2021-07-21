
import {CREATELISTBOARDSUCCESS, CREATELISTBOARDFAILL} from '../ActionsTypes';

const initialState = {
    created_data: null,
    error: null
}

const success = (state,action) => {
    return {
        created_data:action.data
    }
}
const faill = (state,action) => {
    return {
        error:action.error
    }
}

const CreateListOfBoard = (state = initialState, action) => {
    switch (action.type) {
        case CREATELISTBOARDSUCCESS:
            return success(state, action);
        case CREATELISTBOARDFAILL:
            return faill(state, action);
        default:
            return state;
    }
}
export default CreateListOfBoard;