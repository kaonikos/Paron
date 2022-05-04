import React, {useEffect} from 'react'
import './styles.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown,faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";

const Menu = () => {

    const dispatch = useDispatch();

    const language = useSelector((state) => state.language)

    const toggleMenu = useSelector((state) => state.toggleMenu)
    const setToggleMenu = (payload) => dispatch({ type: Actions.SetToggleMenu, payload });

    const setDisplayedScreen = (payload) => dispatch({ type: Actions.SetDisplayedScreen, payload });

    useEffect(
        () => {
            if (toggleMenu) {
                const element = document.getElementById('menu')
                if (element) {
                    element.id = 'menu-toggled'
                }
            } else {
                const element = document.getElementById('menu-toggled')
                if (element) {
                    element.id = 'menu'
                }

            }
        }, [toggleMenu]
    )

    return (
        <div id='menu' className='menu' tabindex="0">
            <div  className='background'>
                <p >Paron</p>
                <div className='profile-button' onClick={() => setDisplayedScreen('profile')}>
                    <FontAwesomeIcon icon={faUser}/>
                    <p >{language.MenuProfile}</p>
                </div>
            </div>
            <div className='hex' onClick={() => setToggleMenu(!toggleMenu)}>
                <FontAwesomeIcon id='arrow' icon={faAngleDown}/>
            </div>
        </div>
    )
}

export default Menu
