import React from 'react'
import {Text, TouchableNativeFeedback, View} from "react-native";
import styles from './styles.css'

const PanicButton = () => {

    return (
        <View className={styles.default}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#31195b', true)}>
                <View style={styles.button}>
                    <Text style={styles.text} >HELP!</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default PanicButton
