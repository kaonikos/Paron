import React, {useState} from 'react'
import './styles.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft,faCamera} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import ReportingService from '../../../../httpService/reportingService'

const ReportIssue = () => {

    const dispatch = useDispatch();

    const setTab = (payload) => dispatch({ type: Actions.SetTab, payload });

    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const [imageDialog, setImageDialog] = useState(false)
    const [confirmationDialog, setConfirmationDialog] = useState(false)

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });

        var imageUrl = image.webPath;
        setImageUrl(imageUrl)
    };

    const getLocation = async () => {
        await Geolocation.getCurrentPosition()
            .then(res => {
                console.log(text,imageUrl,[res.coords.latitude,res.coords.longitude])
                setConfirmationDialog(true)
                // ReportingService.sendIssueReport(text,imageUrl,[res.coords.latitude,res.coords.longitude])
                //     .then(() => {
                //         setConfirmationDialog(true)
                //     })
            })
    };

    return (
        <div className='report-issue'>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => setTab('options')}/>
            <div className='header'>
                <h2>Report an Issue</h2>
                <p>Take a photo and/or write a description of an issue you encountered. Then press the "Submit" button</p>
            </div>
            <div className='camera'>
                <FontAwesomeIcon icon={faCamera} onClick={() => takePicture()}/>
                {imageUrl !== '' ? <img src={imageUrl} alt='photo' onClick={() => setImageDialog(true)} /> : <></>}
            </div>
            <span className="p-float-label">
                        <InputText id="description" value={text} onChange={(e) => setText(e.target.value)} />
                        <label htmlFor="username">Write a Description</label>
                    </span>
            <Button label="Submit" onClick={() => getLocation()}/>
            <Dialog className='image-preview' header="Preview" visible={imageDialog} style={{ width: '50vw' }} onHide={() => setImageDialog(false)} dismissableMask>
                <img src={imageUrl} alt='photo' />
            </Dialog>
            <Dialog  header="Success" visible={confirmationDialog} style={{ width: '50vw' }} onHide={() => setConfirmationDialog(false)}>
                <p>Your report was sent successfully</p>
            </Dialog>
        </div>
    )
}

export default ReportIssue
