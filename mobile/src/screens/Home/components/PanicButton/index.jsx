import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
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

    const language = useSelector((state) => state.language)

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
                <p id='mode'>{language.PanicButtonTitle}</p>
                <Ripple />
            </div>
            <Dialog  header="Success" visible={confirmationDialog} style={{ width: '50vw' }} onHide={() => setConfirmationDialog(false)}>
                <p id='mode'>{language.PanicButtonSuccessMessage}</p>
            </Dialog>
        </div>
    )
}

export default PanicButton
