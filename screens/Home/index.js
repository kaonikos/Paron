import React from 'react'
import {View} from "react-native";
import {AppBar,Default,PanicButton,ReportIssue,Profile} from './components'
import styles from './styles.css'
import { useSelector} from "react-redux";

const Home = () => {

    const homeScreen = useSelector((state) => state.homeScreen)

    const renderPage = () => {
        switch (homeScreen) {
            case 'home': return <Default/>
            case 'panic': return <PanicButton/>
            case 'report': return <ReportIssue/>
            case 'profile': return <Profile/>
            default: return <Default/>
        }
    }

    return (
        <View className={styles.home}>
            <AppBar/>
            {renderPage()}
        </View>
    )
}

export default Home
