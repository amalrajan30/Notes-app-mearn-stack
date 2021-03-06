import React, { createContext, useState } from 'react';
import history from '../history';
import { API_BASE } from '../config'

export const NotesContext = createContext();

const NotesContextProvider = (props) => {
    const [notes, setNotes] = useState([])
    const getNotes = () => {
        fetch(`${API_BASE}/notes`, {
            method: 'GET',
            headers: {
                'x-auth-token': sessionStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    sessionStorage.removeItem('isTokenValid')
                    history.push('/loginHook')
                } else {
                    res.json().then(data => setNotes(data))
                }
            })
            .catch(err => console.log(err))
    }
    const editNotes = (data) => {
        fetch(`${API_BASE}/notes`, {
            method: 'PUT',
            body: JSON.stringify({
                _id: data.id,
                title: data.title,
                body: data.body
            }),
            headers: {
                'content-type': 'application/json',
                'x-auth-token': sessionStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    sessionStorage.removeItem('isTokenValid')
                    history.push('/loginHook')
                } else {
                    res.json().then(data => setNotes(data))
                }
            })
            .catch(err => console.log(err))
    }
    const deleteNotes = (_id) => {
        fetch(`${API_BASE}/notes`, {
            method: 'DELETE',
            body: JSON.stringify({
                _id
            }),
            headers: {
                'content-type': 'application/json',
                'x-auth-token': sessionStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    sessionStorage.removeItem('isTokenValid')
                    history.push('/loginHook')
                } else {
                    res.json().then(data => setNotes(data))
                }
            })
            .catch(err => console.log('err', err));
    }
    const createNotes = (title, body, time) => {
        console.log('Create Notes Data---------', title, body, time);
        fetch(`${API_BASE}/notes`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                body,
                time
            }),
            headers: {
                'content-type': 'application/json',
                'x-auth-token': sessionStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    sessionStorage.removeItem('isTokenValid')
                    history.push('/loginHook')
                } else {
                    res.json().then(data => setNotes(data))
                }
            })
            .catch(err => console.log('err', err))
        history.push('/lists')
    }
    return (
        <NotesContext.Provider value={{ getNotes, notes, editNotes, deleteNotes, createNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider;
