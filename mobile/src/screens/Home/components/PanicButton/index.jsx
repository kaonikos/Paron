import React,{useState} from 'react'
import {useDispatch} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { Ripple } from 'primereact/ripple';
import { Geolocation } from '@capacitor/geolocation';
import './styles.css'
import ReportingService from "../../../../httpService/reportingService";
import {Dialog} from "primereact/dialog";

const PanicButton = () => {

    const dispatch = useDispatch();

    const setTab = (payload) => dispatch({ type: Actions.SetTab, payload });

    const [confirmationDialog, setConfirmationDialog] = useState(false)

    const sendSignal = async () => {
        await Geolocation.getCurrentPosition()
            .then(res => {
                console.log([res.coords.latitude,res.coords.longitude])
                setConfirmationDialog(true)
                // ReportingService.sendLocation([res.coords.latitude,res.coords.longitude])
                //     .then(() => {
                //         setConfirmationDialog(true)
                //     })
            })
    };

    return(
        <div className='panic-button'>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => setTab('options')}/>
            <div className="p-ripple" onClick={() => sendSignal()} >
                <p>Panic button</p>
                <Ripple />
            </div>
            <Dialog  header="Success" visible={confirmationDialog} style={{ width: '50vw' }} onHide={() => setConfirmationDialog(false)}>
                <p>Your location was sent successfully</p>
            </Dialog>
        </div>
    )
}

export default PanicButton
