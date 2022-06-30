import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft,faUser,faCar} from "@fortawesome/free-solid-svg-icons";
import {Actions} from "../../../../reducer/actions";
import {useDispatch} from "react-redux";
import Map from '../../../../components/Map2'
import './styles.css'

const Carpooling = () => {

    const dispatch = useDispatch();

    const setTab = (payload) => dispatch({ type: Actions.SetTab, payload });

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    return (
        <div className='carpooling'>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => setTab('options')}/>
            <div className="role-selector">
                <div className="passenger" tabIndex="0">
                    <div className="unfocused-content">
                        <FontAwesomeIcon icon={faUser}/>
                        <p id="mode">Continue as a Passenger</p>
                    </div>
                    <div className="focused-content" onClick={() => setDisplayedScreen('passenger-map')}>
                        <p id="mode">To use the app as a passenger, you must move to the specified location.</p>
                        <p id="mode">You will then be notified when a driver is ready to pick you up.</p>
                        <p id="mode">Tap this window to view the map and enter the passenger queue.</p>
                    </div>
                </div>
                <div className="driver" tabIndex="0">
                    <div className="unfocused-content" >
                        <FontAwesomeIcon icon={faCar}/>
                        <p id="mode">Continue as a Driver</p>
                    </div>
                    <div className="focused-content" onClick={() => setDisplayedScreen('driver-map')}>
                        <p id="mode">To use this app as a driver, you must first register as a driver.</p>
                        <p id="mode">You can register as a driver from your profile page.</p>
                        <p id="mode">If you are already registered, tap this window to start the navigation.</p>
                    </div>
                </div>
            </div>
            {/*<Map/>*/}
        </div>
    )
}

export default Carpooling
