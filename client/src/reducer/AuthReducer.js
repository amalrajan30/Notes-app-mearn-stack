import { LOG_IN, LOG_OUT, SAVE_TOKEN, CLEAR_TOKEN, CHECK_TOKEN } from '../actions/action-type'

const initialState = {
    auth: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case LOG_IN:
            return { ...state, auth: payload, token: payload.token }

        case LOG_OUT:
            return { ...state, auth: [] }

        case SAVE_TOKEN:
            sessionStorage.setItem('token', state.token)
        /* falls through */

        case CHECK_TOKEN:
            if (sessionStorage.getItem('token')) {
                return { ...state, tokenPresent: true, token: sessionStorage.getItem('token') }
            }
        /* falls through */

        case CLEAR_TOKEN:
            sessionStorage.clear()
        /* falls through */

        default:
            return state
    }
}
