import React,{useState,useEffect} from 'react'
import {Image, Text, View} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {CameraView} from './components'
import { TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import styles from './styles.css'
import noImage from "../../../../assets/noImage.jpg";

const ReportIssue = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [description, setDescription] = useState('')
    const [toggleCamera, setToggleCamera] = useState(false)
    const [photo, setPhoto] = useState()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <View className={styles.report }>
            {toggleCamera? <CameraView setToggleCamera={setToggleCamera} setPhoto={setPhoto}/> : <View/>}
            <View style={styles.header}>
                <Text style={styles.title}>Report an Issue</Text>
                <Text style={styles.information}>Take a photo and/or write a description of the issue you wish to report. Then press the report button to send the information along with your location</Text>
            </View>
            <View style={styles.photo}>
                <Feather name="camera" size={36} color="#31195b" onPress={() => setToggleCamera(true)}/>
                <Image style={styles.image} source={noImage}/>
            </View>
            <View>
                <TextInput label="Description" value={description} onChangeText={text => setDescription(text)}/>
            </View>
            {/*<View>*/}
            {/*    <Text>{JSON.stringify(location)}</Text>*/}
            {/*</View>*/}
        </View>
    )
}

export default ReportIssue
