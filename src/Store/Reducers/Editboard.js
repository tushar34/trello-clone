import { EDITBOARDSUCCESS, EDITBOARDFAILL } from '../ActionsTypes';


const initialState = {
    editboards: null,
    error: null,
    
};


const editsuccess = (state, action) => {
    return {
        editboards:action.data
    }
}
const editfaill = (state, action) => {
    return {
        error:action.error
    }
}
const EditBoards = (state = initialState, action) => {
    switch (action.type) {
        case EDITBOARDSUCCESS:
            return editsuccess(state, action);
        case EDITBOARDFAILL:
            return editfaill(state, action);
        default:
            return state;
    }
}
export default EditBoards;