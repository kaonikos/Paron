import React from 'react'
import {Menu,Footer,Options,PanicButton,ReportIssue} from './components'
import './styles.css'
import {useSelector} from "react-redux";

const Home = () => {

    const tab = useSelector((state) => state.tab)

    const renderTab = () => {
        switch (tab) {
            case 'options': return <Options/>
            case 'panic button': return <PanicButton/>
            case 'report issue': return <ReportIssue/>
            default : return <Options/>
        }
    }

    return (
        <div className='home'>
            <Menu/>
            {renderTab()}
            <Footer/>
        </div>
    )
}

export default Home
