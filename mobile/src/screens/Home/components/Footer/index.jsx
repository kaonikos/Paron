import React from 'react'
import './styles.css'
import {useSelector} from "react-redux";

const Footer = () => {

    const language = useSelector((state) => state.language)

    return(
        <div className='footer'>
            <p id='mode'>{language.FooterMessage}</p>
        </div>
    )
}

export default Footer
