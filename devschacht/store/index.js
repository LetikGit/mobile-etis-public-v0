import {createStore, combineReducers} from 'redux'

const initState = {
    action: ""
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLOSE_MENU':
            return { action: "closeMenu" }
        case 'OPEN_MENU':
            return { action: "openMenu" }
        default:
            return state
    }
}

export default createStore(rootReducer)