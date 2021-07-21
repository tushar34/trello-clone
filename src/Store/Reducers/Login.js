
import { AUTHLOGINFAIIL, AUTHLOGINSUCCESS, AUTHLOGOUT } from '../ActionsTypes';

const initialState = {
    token: null,
    error: null,
    id: null
};

const authSuccess = (state, action) => {
    return {
        token: action.token,
        id: action.id,
    }
}
const authFaill = (state, action) => {
    return {
        error: action.error,
    }
}
const authLogout = () => {
    return {
        token: null,
    }
}

const Login = (state = initialState, action) => {
    switch (action.type) {
        case AUTHLOGINSUCCESS:
            return authSuccess(state, action);
        case AUTHLOGINFAIIL:
            return authFaill(state, action);
        case AUTHLOGOUT:
            return authLogout();
        default:
            return state;
    }
}
export default Login;