import React from 'react'
import './styles.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown,faUser} from "@fortawesome/free-solid-svg-icons";

const Menu = () => {

    return (
        <div id='menu' className='menu' tabindex="0">
            <div  className='background'>
                <p>Paron</p>
                <div className='profile'>
                    <FontAwesomeIcon icon={faUser}/>
                    <p>Profile</p>
                </div>
            </div>
            <div className='hex' onClick={() => {
                document.getElementById('menu').focus()
            }}>
                <FontAwesomeIcon id='arrow' icon={faAngleDown}/>
            </div>
        </div>
    )
}

export default Menu
