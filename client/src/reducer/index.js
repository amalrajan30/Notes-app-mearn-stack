import { combineReducers } from 'redux'
import { notesReducer } from './NotesReducers'
import AuthReducer from './AuthReducer';

export default combineReducers({
    notes: notesReducer,
    auth: AuthReducer
})