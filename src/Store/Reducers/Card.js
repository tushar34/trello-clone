import { EDITCARDSUCCESS,
    EDITCARDFAILL,DELCARDSUCCESS, DELCARDFAILL, GETALLCARDSUCCESS, GETALLCARDFAILL, GETCARDSUCCESS, GETCARDFAILL } from '../ActionsTypes'

const initialState = {
    carddata: [],
    error: null
}


const Card = (state = initialState, action) => {
    console.log(state.carddata)
    console.log(action.data)
    switch (action.type) {
        case GETALLCARDSUCCESS:
            return { carddata: action.data }
        case GETALLCARDFAILL:
            return { error: action.error }
        case DELCARDSUCCESS:
            return { ...state, carddata: state.carddata.data.filter(data => data._id !== action.data._id) }
        case DELCARDFAILL:
            return {}
        case EDITCARDSUCCESS:
            return { ...state, carddata: state.carddata.data.map((Data) => Data._id === action.data._id ? action.data : Data) }
        case EDITCARDFAILL:

        default:
            return state;
    }

}
export default Card;