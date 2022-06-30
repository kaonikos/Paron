import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import SplashScreen from "./screens/SplashScreen";
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import PassengerMap from './screens/PassengerMap'
import DriverMap from './screens/DriverMap'
import ParticlesComponent from "./components/ParticlesComponent";
import {L} from './utils/localization'

import 'mapbox-gl/dist/mapbox-gl.css';

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './App.css';

import PrimeReact from 'primereact/api';
import {Actions} from "./reducer/actions";

PrimeReact.ripple = true;

const App = () => {

    const dispatch = useDispatch();

    const displayedScreen = useSelector((state) => state.displayedScreen)
    const darkMode = useSelector((state) => state.darkMode)

    const setLanguage = (payload) => dispatch({ type: Actions.SetLanguage, payload });

    useEffect(
        () => {
            setLanguage(L.English)
        },[]
    )

    useEffect(
        () => {
            if (darkMode) {
                changeMode('darkMode.css')
                changeTheme('themeBlack.css')
            } else {
                changeMode('lightMode.css')
                changeTheme('themeWhite.css')
            }
        }, [darkMode]
    )

    const changeTheme = (value) => {
        const element = document.getElementById('theme-css');
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;
        const newURL = urlTokens.join('/');
        replaceLink(element, newURL);
    }

    const changeMode = (value) => {
        const element = document.getElementById('mode-css');
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;
        const newURL = urlTokens.join('/');
        replaceLink(element, newURL);
    };

    const replaceLink = (linkElement, href) => {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    };


    const renderScreen = () => {
        switch (displayedScreen) {
            case 'splashscreen': return <SplashScreen/>
            case 'home': return <Home/>
            case 'login': return <Login/>
            case 'profile': return <Profile/>
            case 'passenger-map': return <PassengerMap/>
            case 'driver-map': return <DriverMap/>
            default: return null
        }
    }

    return (
        <div className="app" id='mode'>
            <ParticlesComponent />
            {renderScreen()}
        </div>
    );
}

export default App;
