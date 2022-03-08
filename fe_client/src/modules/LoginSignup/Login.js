import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import {userLogin, validateUserLocal} from '../../api/auth';
import {USER_DATA, AUTH_TOKEN} from '../../constants/session';
import '../../styles/Login.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const signinSchema =  yup.object({
    username: yup.string().required(),
    password: yup.string().required().min(6),
  }).required();

const LoginModule = ({loggedIn}) => {
    const navigate = useNavigate();
    const navigation = useRef(useNavigate());

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        async function alreadyLoggedIn() {
            if (validateUserLocal()) {
                navigation.current('/dashboard');
            }
        };
        alreadyLoggedIn();
    }, []);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(signinSchema),
    });

    const loginBtnClick = async (data) => {
        if (data.username && data.password) {
                const result = await userLogin(data);

                if (result.err) {
                    setIsError(true);
                    setErrorMsg(result.message?.response?.data?.details)
                    setTimeout(() => {
                        setIsError(false);
                        setErrorMsg(null);
                    }, 4000);
                    return;
                }

                const {username, token} = result;
                sessionStorage.setItem(AUTH_TOKEN,token);
                sessionStorage.setItem(
                    USER_DATA,
                    JSON.stringify({username}),
                );
                loggedIn(true);
                navigate('/dashboard');
        }
    }

    return (
        <div id='login-container' className='container valign-wrapper'>
            <div className='card-panel center-align' id='form-container-login'>
                <header className='teal darken-1 white-text'>Sign in to your account</header>
                <form id='signin-form' onSubmit={handleSubmit(loginBtnClick)}>
                    <input
                        {...register("username")} 
                        placeholder='Username' 
                        autoComplete="off"
                    />
                    <p>{errors.username?.message}</p>
                    <input
                        {...register("password")}
                        type='password' 
                        placeholder='Password' 
                        autoComplete="off"
                    />
                    <p>{errors.password?.message}</p>
                    <input
                        type='submit'
                        value='Sign In'
                        className='btn deep-orange'
                    />
                </form>
                <div className='link-signin'><label>Not registered? <button onClick={() => navigation.current('/signup')}>Sign Up</button></label></div>
            </div>
            <div id='signin-failed-box' className={isError ? 'scale-transition scale-out scale-in' : 'scale-transition scale-out'}>
                <i className='material-icons'>error</i>
                 Sign In Failed: {errorMsg}
            </div>
        </div>
    )
}

export default LoginModule;