import React from 'react'
import './styles.css'
import {useDispatch} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation,faCamera,faCar} from "@fortawesome/free-solid-svg-icons";

const Options = () => {

    const dispatch = useDispatch();

    const setTab = (payload) => dispatch({ type: Actions.SetTab, payload });

    return (
        <div className='options'>
            <div className='hexagon' tabindex="0" >
                <div className='header' onClick={() => setTab('panic button')}>
                    <h3>Panic Button </h3>
                    <p>Send your location to the campus security</p>
                </div>
                <FontAwesomeIcon icon={faTriangleExclamation}/>
            </div>
            <div className='hexagon' tabindex="0">
                <div className='header'onClick={() => setTab('report issue')}>
                    <h3>Report Issue</h3>
                    <p>Take a photo and/or write a description of an issue you encountered</p>
                </div>
                <FontAwesomeIcon icon={faCamera}/>
            </div>
            <div className='hexagon' tabindex="0" >
                <div className='header'>
                    <h3>Carpooling</h3>
                    <p>Coming Soon</p>
                </div>
                <FontAwesomeIcon icon={faCar}/>
            </div>
        </div>
    )
}

export default Options
