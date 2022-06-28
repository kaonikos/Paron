import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Actions} from "../../../../reducer/actions";
import {useDispatch} from "react-redux";
import Map from '../../../../components/Map2'
import './styles.css'

const Carpooling = () => {

    const dispatch = useDispatch();

    const setTab = (payload) => dispatch({ type: Actions.SetTab, payload });

    return (
        <div className='carpooling'>
            <FontAwesomeIcon id='back-button' icon={faArrowLeft} onClick={() => setTab('options')}/>
            <div className="role-selector">
                <div className="passenger">

                </div>
                <div className="driver">

                </div>
            </div>
            <Map/>
        </div>
    )
}

export default Carpooling
