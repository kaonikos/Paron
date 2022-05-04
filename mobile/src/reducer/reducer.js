import {Actions} from './actions'

const initState = {
    displayedScreen: 'splashscreen',
    tab: 'options',
    toggleMenu: false,
    language: {},
    darkMode: false,
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
        case Actions.SetToggleMenu:
            return{
                ...currentState,
                toggleMenu: action.payload
            }
        case Actions.SetLanguage:
            return {
                ...currentState,
                language: action.payload
            }
        case Actions.SetDarkMode:
            return {
                ...currentState,
                darkMode: action.payload
            }
        default: return currentState
    }
}

export default reducer