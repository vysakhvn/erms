import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addUser } from '../../api/user';
import { useNavigate } from 'react-router';
import '../../styles/Signup.scss';

const signupSchema =  yup.object({
    email: yup.string().email('Email is not valid').required(),
    username: yup.string().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required('confirm password is a required field').oneOf([yup.ref('password'), null], "Passwords do not match"),
  }).required();

const Signup = () => {

    const navigation = useRef(useNavigate());

    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const signupAction = async (data) => {
        
        const result = await addUser({
            email: data.email,
            username: data.username,
            password: data.password
        });
        if (result.err) {
            setSuccess(false);
            setIsError(true);
            setErrorMsg(result.message?.response?.data?.details)
            setTimeout(() => {
                setIsError(false);
                setErrorMsg(null);
            }, 4000);
            return;
        }
        setSuccess(true);
        setTimeout(() => {
            navigation.current('/signin');
        }, 2000);
    }

    return (
        <div id='signup-container' className='container valign-wrapper'>
            <div className='card-panel center-align' id='form-container'>
                <header className='teal darken-1 white-text'>Create an account</header>
                <form onSubmit={handleSubmit(signupAction)} id='signup-form'>

                                    <input {...register("email")} placeholder='Email' autoComplete="off"/>
                                    <p>{errors.email?.message}</p>

                                    <input {...register("username")} placeholder='Username' autoComplete="off"/>
                                    <p>{errors.username?.message}</p>
 
                                    <input {...register("password")} type='password' placeholder='Password'/>
                                    <p>{errors.password?.message}</p>
   
                                    <input {...register("confirmPassword")} type='password' placeholder='Confirm Password'/>
                                    <p>{errors.confirmPassword?.message}</p>
 
                                    <input type="submit" value="Sign Up" className='btn deep-orange'/>
                </form>
                <div className='link-signin'><label>Already registered? <button onClick={() => navigation.current('/signin')}>Sign In</button></label></div>
            </div>
            <div id='signup-success-box' className={success ? 'scale-transition scale-out scale-in' : 'scale-transition scale-out'}>
                <i className='material-icons'>check_circle</i>
                 Sign Up Complete!
            </div>
            <div id='signup-failed-box' className={isError ? 'scale-transition scale-out scale-in' : 'scale-transition scale-out'}>
                <i className='material-icons'>error</i>
                 Sign Up Failed: {errorMsg}
            </div>
        </div>
    );
}

export default Signup;


