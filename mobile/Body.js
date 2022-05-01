import React from 'react'
import SplashScreen from "./screens/SplashScreen";
import Home from './screens/Home'
import {Platform, SafeAreaView, StatusBar, Text} from "react-native";
import { useSelector,useDispatch} from "react-redux";
import {Actions} from './reducer/actions'
import styles from "./styles.css";

const Body = () => {

    const dispatch = useDispatch();

    const displayedScreen = useSelector((state) => state.displayedScreen)
    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const renderScreen = () => {
        switch (displayedScreen) {
            case 'splash': return <SplashScreen/>
            case 'home': return <Home/>
            default: return null
        }
    }

    return (
        <SafeAreaView
            className={styles.body}
            // style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}
        >
            {renderScreen()}
        </SafeAreaView>
    )
}

export default Body

