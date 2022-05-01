import React, {useEffect, useState} from 'react'
import {Text, View, Dimensions, TouchableNativeFeedback} from "react-native";
import { Camera } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./styles.css";

const CameraView = (props) => {

    const {setToggleCamera,setPhoto} = props

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View className={styles.cameraContainer} style={{width: windowWidth, height: windowHeight}}>
            <Camera style={styles.camera} type={type}>

            </Camera>
            <View style={styles.back}>
                <Ionicons name="chevron-back-circle-outline" size={36} color="white" onPress={() => setToggleCamera(false)}/>
            </View>
            <View style={styles.takePhoto}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#212121', true)}>
                    <View style={styles.ripple}>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default CameraView

