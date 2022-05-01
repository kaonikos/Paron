import React,{useState,useEffect} from 'react'
import {Text, View,Image,Animated} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import splashScreenLogo from '../../assets/splashScreenLogo.jpg'
import styles from './styles.css'
import * as Font from 'expo-font';

const SplashScreen = () => {

    const dispatch = useDispatch();

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const [showLogo, setShowLogo] = useState(false)
    const [showName, setShowName] = useState(false)
    const [showText, setShowText] = useState(false)

    const fadeIn = new Animated.Value(0);
    const fadeIn2 = new Animated.Value(0)

    Animated.timing(fadeIn, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start();

    Animated.timing(fadeIn2, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        delay: 1000
    }).start();

    Font.loadAsync({
        'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
    })

    useEffect(
        () => {
            setTimeout(() => {
                setShowLogo(true);
                setTimeout(() => {
                    setShowName(true);
                    setShowText(true);
                    setTimeout(() => {
                        setDisplayedScreen('home');
                    }, 2800);
                }, 1000);
            }, 1000);
        }, []
    );

    return (
        <View className={styles.splashScreen}>
            <Image className={styles.logo} style={showLogo ? {} : {display: 'none'}} source={splashScreenLogo}/>
            <Animated.Text className={styles.name} style={showName ? { opacity: fadeIn, fontFamily: 'Montserrat-Light' } : {opacity: 0}}>
                Paron
            </Animated.Text>
            <Animated.Text className={styles.welcomeText} style={showText ? { opacity: fadeIn2 ,fontFamily: 'Montserrat-Light'} : {opacity: 0}}>
                Be a part of the campus
            </Animated.Text>
        </View>
    )
}

export default SplashScreen
