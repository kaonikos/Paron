import {Actions} from './actions'

const initState = {
    displayedScreen: 'splashscreen',
    tab: 'options',
}

const reducer = (currentState = initState, action) => {
    switch (action.type) {
        case Actions.SetDisplayedScreen:
            return{
                ...currentState,
                displayedScreen: action.payload
            }
        case Actions.SetTab:
            return{
                ...currentState,
                tab: action.payload
            }
        default: return currentState
    }
}

export default reducer