import { GETCARDBYIDSUCCESS, GETCARDBYIDFAILL } from '../ActionsTypes'

const initialState = {
    data: null,
    error: null
}
const Getcardsbyid = (state = initialState, action) => {
    console.log(action.data)
    switch (action.type) {
        case GETCARDBYIDSUCCESS:
            return { data: action.data }
        case GETCARDBYIDFAILL:
            return { error: action.error }
        default:
            return state;
    }
}
export default Getcardsbyid;