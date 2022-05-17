import React from 'react'
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation,faCamera,faCar} from "@fortawesome/free-solid-svg-icons";

const Options = () => {

    const dispatch = useDispatch();

    const language = useSelector((state) => state.language)

    const setTab = (payload) => dispatch({ type: Actions.SetTab, payload });

    return (
        <div className='options'>
            <div className='hexagon' tabindex="0" >
                <div className='header' onClick={() => setTab('panic button')}>
                    <h3 id='mode'>{language.HomeOptionsPanicTitle}</h3>
                    <p id='mode'>{language.HomeOptionsPanicDescription}</p>
                </div>
                <FontAwesomeIcon icon={faTriangleExclamation}/>
            </div>
            <div className='hexagon' tabindex="0">
                <div className='header'onClick={() => setTab('report issue')}>
                    <h3 id='mode'>{language.HomeOptionsReportTitle}</h3>
                    <p id='mode'>{language.HomeOptionsReportDescription}</p>
                </div>
                <FontAwesomeIcon icon={faCamera}/>
            </div>
            <div className='hexagon' tabindex="0" >
                <div className='header' onClick={() => setTab('carpooling')}>
                    <h3 id='mode'>{language.HomeOptionsCarpoolingTitle}</h3>
                    <p id='mode'>{language.HomeOptionsCarpoolingDescription}</p>
                </div>
                <FontAwesomeIcon icon={faCar}/>
            </div>
        </div>
    )
}

export default Options
