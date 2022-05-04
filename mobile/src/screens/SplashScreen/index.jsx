import React,{useState,useEffect} from 'react'
import {useDispatch} from "react-redux";
import {Actions} from "../../reducer/actions";
import splashScreenLogo from '../../assets/images/splashscreen/splashScreenLogo.jpg'
import './styles.css'

const SplashScreen = () => {

    const dispatch = useDispatch();

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const [showLogo, setShowLogo] = useState(false)
    const [showName, setShowName] = useState(false)
    const [showText, setShowText] = useState(false)

    useEffect(
        () => {
            setTimeout(() => {
                setShowLogo(true);
                setTimeout(() => {
                    setShowName(true);
                    setTimeout(() => {
                        setShowText(true);
                        setTimeout(() => {
                            setDisplayedScreen('login');
                        }, 1800);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, []
    );

    return (
        <div className='splash-screen'>
            {showLogo? <img src={splashScreenLogo} alt='logo'/> : <></>}
            {showName? <p className='name'>Paron</p> : <></>}
            {showText? <p className='welcomeText'>Be a part of the campus</p> : <></>}
        </div>
    )
}

export default SplashScreen
