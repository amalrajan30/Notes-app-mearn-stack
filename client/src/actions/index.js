import { GET_DATA, LOG_IN, LOG_OUT, SAVE_TOKEN, CHECK_TOKEN, CLEAR_TOKEN } from './action-type'

export const getData = (token) => dispatch => {
    fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'x-auth-token': token
        }
    })
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: GET_DATA,
                payload: data
            })
        )
        .catch(err => console.log(err))
}

export const editData = (data) => dispatch => {
    fetch(`http://localhost:5000/notes`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'x-auth-token': data.token
        }
    })
        .then(res => res.json())
        .then(data =>
            dispatch({
                type: GET_DATA,
                payload: data
            })
        )
}

export const deleteData = (id) => dispatch => {
    fetch(`http://localhost:5000/notes`, {
        method: 'DELETE',
        body: JSON.stringify({
            _id: id.id
        }),
        headers: {
            'content-type': 'application/json',
            'x-auth-token': id.token
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: GET_DATA,
                payload: data
            })
        })
}

export const createNote = (data) => dispatch => {
    fetch(`http://localhost:5000/notes`, {
        method: 'POST',
        body: JSON.stringify({
            title: data.title,
            body: data.body
        }),
        headers: {
            'content-type': 'application/json',
            'x-auth-token': data.token
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: GET_DATA,
                payload: data
            })
        })
}

export const signUp = (data) => dispatch => {
    console.log('SignUp Action')
    console.log(data)
    fetch(`http://localhost:5000/signup`, {
        method: 'POST',
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: LOG_IN,
                payload: data
            })
        })
        .catch(err => console.log(err))
}

export const logIn = (data) => dispatch => {
    fetch(`http://localhost:5000/login`, {
        method: "POST",
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: LOG_IN,
                payload: data
            })
        })
}

export const logOut = () => ({
    type: LOG_OUT
})

export const saveToken = () => ({
    type: SAVE_TOKEN
})

export const clearToken = () => ({
    type: CLEAR_TOKEN
})

export const checkToken = () => ({
    type: CHECK_TOKEN
})
