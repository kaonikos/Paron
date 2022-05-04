import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft,faUser} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { TabView, TabPanel } from 'primereact/tabview';
import {L} from '../../utils/localization'
import './styles.css'

const Profile = () => {

    const dispatch = useDispatch();

    const language = useSelector((state) => state.language)
    const setLanguage = (payload) => dispatch({ type: Actions.SetLanguage, payload });

    const darkMode = useSelector((state) => state.darkMode)
    const setDarkMode = (payload) => dispatch({ type: Actions.SetDarkMode, payload });

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const [languageValue, setLanguageValue] = useState('English')

    useEffect(
        () => {
            setLanguage(L[languageValue])
        }, [languageValue]
    )


    return (
        <div className='profile'>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => setDisplayedScreen('home')}/>
            <div className='settings'>
                <InputSwitch checked={darkMode} onChange={(e) => setDarkMode(e.value)} />
                <Dropdown value={languageValue} options={['English','Greek']} onChange={(e) => setLanguageValue(e.value)} />
            </div>
            <div className='information-container'>
                <FontAwesomeIcon id='user-icon' icon={faUser}/>
                <TabView>
                    <TabPanel header={language.ProfileTabData}>
                    </TabPanel>
                    <TabPanel header={language.ProfileTabStats}>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}

export default Profile
