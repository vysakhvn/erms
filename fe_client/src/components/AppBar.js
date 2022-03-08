import React, { useRef } from 'react';
import { useNavigate } from "react-router";

const AppBar = ({isVisible, logout}) => {
    const navigation  = useRef(useNavigate());

    const handleClick =() => {
        logout(); 
        console.log(navigation.current);
        navigation.current('/');
    }

    return (
        <div id='appbar' className={ !isVisible ? 'logged-out teal darken-2 white-text' : 'logged-in teal darken-2 white-text'}>
            <span>{!isVisible ? 'Employee Record Management System' : 'ERMS'}</span>
            { 
                isVisible 
                ? <i type='button' className='material-icons deep-orange-text text-accent-2' onClick={handleClick} title='Logout'>logout</i> 
                : <></>
            }
        </div>
    );
};

export default AppBar;