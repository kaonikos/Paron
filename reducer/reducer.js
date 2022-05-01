import {Actions} from './actions'

const initState = {
    displayedScreen: 'splash',
    homeScreen: 'home',
}

const reducer = (currentState = initState, action) => {
    switch (action.type) {
        case Actions.SetDisplayedScreen:
            return{
                ...currentState,
                displayedScreen: action.payload
            }
        case Actions.SetHomeScreen:
            return{
                ...currentState,
                homeScreen: action.payload
            }
        default: return currentState
    }
}

export default reducer
