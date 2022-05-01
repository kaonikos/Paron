import React, {useEffect} from 'react'
import {Text, TouchableNativeFeedback, View} from "react-native";
import styles from './styles.css'
import {Camera} from "expo-camera";
import * as Location from "expo-location";

const Default = () => {

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
        })();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
        })();
    }, []);

    return (
        <View className={styles.default}>
            {/*<TouchableNativeFeedback*/}
            {/*    background={TouchableNativeFeedback.Ripple('#685656', true)}>*/}
            {/*    <View style={styles.button}>*/}
            {/*        <Text style={styles.text} >HELP!</Text>*/}
            {/*    </View>*/}
            {/*</TouchableNativeFeedback>*/}
        </View>
    )
}

export default Default
