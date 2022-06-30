import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft,faUser} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { TabView, TabPanel } from 'primereact/tabview';
import {L} from '../../utils/localization'
import './styles.css'

const Profile = () => {

    const dispatch = useDispatch();

    const language = useSelector((state) => state.language)
    const setLanguage = (payload) => dispatch({ type: Actions.SetLanguage, payload });

    const darkMode = useSelector((state) => state.darkMode)
    const setDarkMode = (payload) => dispatch({ type: Actions.SetDarkMode, payload });

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    const [languageValue, setLanguageValue] = useState('English')
    const [registerDialog, setRegisterDialog] = useState(false)
    const [carModel, setCarModel] = useState('')
    const [carPlate, setCarPlate] = useState('')

    useEffect(
        () => {
            setLanguage(L[languageValue])
        }, [languageValue]
    )

    const renderFooter = () => {
        return (
            <Button label="Submit" onClick={() => setRegisterDialog(false)} />
        )
    }

    return (
        <div className='profile'>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => setDisplayedScreen('home')}/>
            <div className='settings'>
                <InputSwitch checked={darkMode} onChange={(e) => setDarkMode(e.value)} />
                <Dropdown value={languageValue} options={['English','Greek']} onChange={(e) => setLanguageValue(e.value)} />
            </div>
            <div className='information-container'>
                <FontAwesomeIcon id='user-icon' icon={faUser}/>
                <TabView>
                    <TabPanel header={language.ProfileTabData}>
                        <div className="user-data">
                            <p id="mode">Click the button below to register as a driver</p>
                            <Button label="Register" onClick={() => setRegisterDialog(true)} />
                        </div>
                        <Dialog header="Register Form" visible={registerDialog} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setRegisterDialog(false)}>
                            <div className="register-form">
                                <p>Please enter the model of you car</p>
                                <InputText value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder="Car Model"/>
                                <p>Please enter your Licence Plate</p>
                                <InputText value={carPlate} onChange={(e) => setCarPlate(e.target.value)} placeholder="Licence Plate"/>
                                <p>Please upload up to 3 clear pictures of your car</p>
                                <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" multiple accept="image/*" maxFileSize={1000000}
                                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                            </div>
                        </Dialog>
                    </TabPanel>
                    <TabPanel header={language.ProfileTabStats}>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}

export default Profile
