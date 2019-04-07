import {GET_DATA} from '../actions/action-type'

const initialState = {
    notes: []
}

export const notesReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                notes: action.payload
            }
        default:
            return state
    }
}