
import { EDITLISTBOARDFAILL, EDITLISTBOARDSUCCESS } from "../ActionsTypes";

const intialState ={
    edit_data:null,
    error:null
}

const success = (state,action) => {
    return {
        edit_data:action.data
    }
}
const faill = (state,action) => {
    return {
        error:action.error
    }
}


const Editlistofboard = (state=intialState, action) => {
    switch (action.type) {
        case EDITLISTBOARDSUCCESS:
            return success(state, action);
        case EDITLISTBOARDFAILL:
            return faill(state, action);
        default:
            return state;

    }
}
export default Editlistofboard;