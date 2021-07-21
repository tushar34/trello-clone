import axios from 'axios';
import {
    EDITCARDSUCCESS,
    EDITCARDFAILL,
    DELCARDSUCCESS,
    GETCARDBYIDSUCCESS,
    GETCARDBYIDFAILL,
    DELCARDFAILL, GETALLCARDSUCCESS, GETALLCARDFAILL, GETCARDSUCCESS, GETCARDFAILL, ADDCARDSUCCESS, ADDCARDFAILL, EDITLISTBOARDSUCCESS, EDITLISTBOARDFAILL, DELLISTBOARDSUCCESS, DELLISTBOARDFAILL, CREATELISTBOARDSUCCESS, CREATELISTBOARDFAILL, LISTBOARDSUCCESS, LISTBOARDFAILL, EDITBOARDSUCCESS, EDITBOARDFAILL, DELBOARDSUCCESS, DELBOARDFAILL, AUTHLOGINFAIIL, AUTHLOGINSUCCESS, AUTHLOGOUT, FETCHBOARDSSUCCESS, FETCHBOARDSFAIL, ADDBOARDFAILL, ADDBOARDSUCCESS
} from '../ActionsTypes';
import history from '../../history';
const authSuccess = (token, user_id) => {
    return {
        type: AUTHLOGINSUCCESS,
        token: token,
        id: user_id,
    }
}

const authFail = (error) => {
    return {
        type: AUTHLOGINFAIIL,
        error: error
    }
}

export const Authlogin = (email, password, props) => {
    return dispatch => {
        axios.post('http://localhost:8000/user/login', {
            email: email,
            password: password
        })
            .then(res => {
                console.log(res);
                const token = res.data.token;
                const user_id = res.data.user.id;
                localStorage.setItem("token", token);
                console.log("token", token);
                dispatch(authSuccess(token, user_id));
                dispatch(FetchBords(token));
                props.history.push('/boards');

            })
            .catch(err => {
                // console.log(err);
                dispatch(authFail(err));
            })
    }
}

export const Authlogout = () => {
    localStorage.removeItem("token");

    return {
        type: AUTHLOGOUT,
    };
}


const fetchBordsSuccess = (data) => {
    return {
        type: FETCHBOARDSSUCCESS,
        data: data,
    }
}

const fetchBordsFaill = (err) => {
    return {
        type: FETCHBOARDSFAIL,
        error: err
    }
}

export const FetchBords = (token, props) => {
    console.log('token', token);
    return dispatch => {
        axios.get('http://localhost:8000/user/board/allboards', {
            headers: { "x-auth-token": `${token}` }

        })
            .then(res => {
                console.log(res);
                dispatch(fetchBordsSuccess(res));
                props.history.push('/boards');

            })
            .catch(err => {
                console.log(err);
                dispatch(fetchBordsFaill(err));
            })
    }
}
const addBordsSuccess = (data) => {
    return {
        type: ADDBOARDSUCCESS,
        data: data

    }
}

const faillBordsFaill = (err) => {
    return {
        type: ADDBOARDFAILL,
        error: err
    }
}


export const AddBoard = (token, id, name, props) => {
    const data = {
        name: name,
        userId: id
    }
    return dispatch => {
        axios.post('http://localhost:8000/user/board/createboard', data, {
            headers: { "x-auth-token": `${token}` }

        })
            .then(res => {
                console.log(res);
                dispatch(addBordsSuccess(res));
                dispatch(FetchBords(token, props));
                // props.history.push('/');

            })
            .catch(err => {
                console.log(err);
                dispatch(faillBordsFaill(err));
                // dispatch(authFail(err));
            })
    }
}

const dellBordsSuccess = () => {
    return {
        type: DELBOARDSUCCESS
    }
}

const dellBordsFaill = () => {
    return {
        type: DELBOARDFAILL
    }
}
export const DelBoard = (id, token, props) => {
    return dispatch => {
        axios.delete(`http://localhost:8000/user/board/deleteboard/${id}`, {
            headers: { "x-auth-token": `${token}` }

        })
            .then(res => {
                console.log(res);
                dispatch(dellBordsSuccess(res));
                dispatch(FetchBords(token, props));
                // props.history.push('/boards');

            })
            .catch(err => {
                console.log(err);
                dispatch(dellBordsFaill(err));
            })
    }
}


const editBordsSuccess = (data) => {
    return {
        type: EDITBOARDSUCCESS,
        data: data
    }
}
const editBordsFaill = (err) => {
    return {
        type: EDITBOARDFAILL,
        error: err
    }
}
export const EditBoard = (id, name, token, props) => {
    console.log(id)
    const data = {
        name: name
    }
    return dispatch => {
        axios.patch(`http://localhost:8000/user/board/updateboard/${id}`, data, {
            headers: { "x-auth-token": `${token}` }

        })
            .then(res => {
                console.log(res);
                dispatch(editBordsSuccess(res));
                dispatch(FetchBords(token, props));
                props.history.push('/boards');

            })
            .catch(err => {
                console.log(err);
                dispatch(editBordsFaill(err));
            })
    }
}

const listBordsSuccess = (data) => {
    return {
        type: LISTBOARDSUCCESS,
        data: data
    }
}
const listBordsFaill = (err) => {
    return {
        type: LISTBOARDFAILL,
        error: err
    }
}
export const ListOfBoard = (id, token, props) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/board/getlistsofboard/${id}`, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(listBordsSuccess(res));
                // dispatch(FetchBords(token,props));
                props.history.push('/lists', { boardid: id });
                // props.history.push('/list ');

            })
            .catch(err => {
                console.log(err);
                dispatch(listBordsFaill(err));
            })
    }
}


const createListBordsSuccess = (data) => {
    return {
        type: CREATELISTBOARDSUCCESS,
        data: data

    }
}
const createListBordsFaill = (err) => {
    return {
        type: CREATELISTBOARDFAILL,
        error: err
    }
}


export const CreateListOfBoard = (id,order, name, token, props) => {
    const data = {
        boardId: id,
        order: order,
        name: name
    }
    return dispatch => {
        axios.post('http://localhost:8000/user/list/createlist', data, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(createListBordsSuccess(res));
                dispatch(ListOfBoard(id, token, props));
                // props.history.push('/list');

            })
            .catch(err => {
                console.log(err);
                dispatch(createListBordsFaill(err));
            })
    }
}



const delListBoardsSuccess = (data) => {
    return {
        type: DELLISTBOARDSUCCESS,
        data: data,
    }
}
const delListBoardsFaill = (err) => {
    return {
        type: DELLISTBOARDFAILL,
        error: err,
    }
}
export const DelListOfBoard = (list_id, board_id, token, props) => {

    return dispatch => {
        axios.delete(`http://localhost:8000/user/list/deletelist/${list_id}`, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(delListBoardsSuccess(res));
                dispatch(ListOfBoard(board_id, token, props));

            })
            .catch(err => {
                console.log(err);
                dispatch(delListBoardsFaill(err));
            })
    }
}


const editListBoardsSuccess = (data) => {
    return {
        type: EDITLISTBOARDSUCCESS,
        data: data

    }
}
const editListBoardsFaill = (err) => {
    return {
        type: EDITLISTBOARDFAILL,
        error: err
    }
}
export const EditListOfBoard = (list_id, name, board_id, token, props) => {
    const data = {
        name: name
    }
    return dispatch => {
        axios.patch(`http://localhost:8000/user/list/updatelist/${list_id}`, data, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(editListBoardsSuccess(res));
                dispatch(ListOfBoard(board_id, token, props));

            })
            .catch(err => {
                console.log(err);
                dispatch(editListBoardsFaill(err));
            })
    }
}






const addCardSuccess = (data) => {
    return {
        type: ADDCARDSUCCESS,
        data: data,

    }
}
const addCardFaill = (err) => {
    return {
        type: ADDCARDFAILL,
        error: err,

    }
}


export const AddCardOfList = (list_id, name, board_id, order, token, props) => {
    const data = {
        name: name,
        listId: list_id,
        boardId: board_id,
        order: order
    }
    return dispatch => {
        axios.post('http://localhost:8000/user/card/createcard', data, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(addCardSuccess(res));
                dispatch(GetAllCards(token))
                //dispatch(ListOfBoard(board_id, token, props));

            })
            .catch(err => {
                console.log(err);
                dispatch(addCardFaill(err));
            })
    }
}



const getCardSuccess = (data) => {
    return {
        type: GETCARDSUCCESS,
        data: data
    }
}
const getCardFaill = (err) => {
    return {
        type: GETCARDFAILL,
        error: err
    }
}


export const GetCardsOfList = (list_id, token, props) => {

    return dispatch => {
        axios.get(`http://localhost:8000/user/list/getcardsoflist/${list_id}`, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(getCardSuccess(res));
                //dispatch(ListOfBoard(board_id, token, props));

            })
            .catch(err => {
                console.log(err);
                dispatch(getCardFaill(err));
            })
    }
}




const getAllCardSuccess = (res) => {
    return {
        type: GETALLCARDSUCCESS,
        data: res
    }
}
const getAllCardFaill = (err) => {
    return {
        type: GETALLCARDFAILL,
        error: err
    }
}


export const GetAllCards = (token) => {
    console.log('kfjgbnk')
    return dispatch => {
        axios.get('http://localhost:8000/user/card/allcards', {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(getAllCardSuccess(res));
                //dispatch(ListOfBoard(board_id, token, props));

            })
            .catch(err => {
                console.log(err);
                dispatch(getAllCardFaill(err));
            })
    }
}


const delCardSuccess = (data) => {
    return {
        type: DELCARDSUCCESS,
        data: data
    }
}
const delCardFaill = (err) => {
    return {
        type: DELCARDFAILL,
        error: err
    }
}
export const DelCard = (id, token, props) => {

    return dispatch => {
        axios.delete(`http://localhost:8000/user/card/deletecard/${id}`, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(delCardSuccess(res));
                // dispatch(GetAllCards(token));
                dispatch(GetAllCards(token));

            })
            .catch(err => {
                console.log(err);
                dispatch(delCardFaill(err));
            })
    }
}


const editCardSuccess = (data) => {
    return {
        type: EDITCARDSUCCESS,
        data: data

    }
}
const editCardFaill = (err) => {
    return {
        type: EDITCARDFAILL,
        error: err
    }
}


export const EditCard = (image, name, id, token, discription, props) => {
    console.log(image)

    const formdata = new FormData();
    formdata.append('name', name)
    if (discription == null) {
        formdata.append('description', '')
    }
    else {
        formdata.append('description', discription)
    }
    formdata.append('image', image);
    // const data={
    //     name:name,
    //     description:discription,
    //     image:image
    // }

    return dispatch => {
        axios.patch(`http://localhost:8000/user/card/updatecard/${id}`, formdata, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(editCardSuccess(res));
                // dispatch(GetAllCards(token));
                dispatch(GetAllCards(token));

            })
            .catch(err => {
                console.log(err);
                dispatch(editCardFaill(err));
            })
    }
}





const getCardByIdSuccess = (res) => {
    return {
        type: GETCARDBYIDSUCCESS,
        data: res

    }
}
const getCardByIdFaill = (err) => {
    return {
        type: GETCARDBYIDFAILL,
        error: err
    }
}

export const GetCardById = (id, token, props) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/card/getcard/${id}`, {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res);
                dispatch(getCardByIdSuccess(res));
                const description = res.data.description;
                const name = res.data.name;
                console.log(description)
                console.log(name)
                // props.history.push('/lists');
                // props.history.push('/lists', { description:description,name:name });

            })
            .catch(err => {
                console.log(err);
                dispatch(getCardByIdFaill(err));
            })
    }
}