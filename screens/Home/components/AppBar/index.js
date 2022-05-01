import React, {useState} from 'react'
import {Text, View,StyleSheet,StatusBar,TouchableNativeFeedback} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from './styles.css';
import {Actions} from "../../../../reducer/actions";
import {useDispatch} from "react-redux";

const AppBar = () => {

    const dispatch = useDispatch();

    const setHomeScreen = (payload) => dispatch({ type: Actions.SetHomeScreen, payload });

    return (
        <View style={styles.appBar}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#212121', false)} onPress={() => setHomeScreen('home')}>
                <View style={styles.option} onPress={() => setHomeScreen('home')}>
                    <Ionicons name="md-home" size={24} color="#31195b" />
                    <Text style={styles.text}>Home</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.divider} />
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#212121', false)} onPress={() => setHomeScreen('panic')}>
                <View style={styles.option}>
                    <Ionicons name="md-alert-circle" size={24} color="#31195b" />
                    <Text style={styles.text}>Panic Button</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.divider}/>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#212121', false)} onPress={() => setHomeScreen('report')}>
                <View style={styles.option}>
                    <MaterialIcons name="report-problem" size={24} color="#31195b" />
                    <Text style={styles.text}>Report an issue</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.divider}/>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#212121', false)} onPress={() => setHomeScreen('profile')}>
                <View style={styles.option}>
                    <Feather name="user" size={24} color="#31195b" />
                    <Text style={styles.text}>Profile</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default AppBar
