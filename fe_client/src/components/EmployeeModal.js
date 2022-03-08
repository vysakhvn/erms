import React, { useState } from'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import '../styles/Modal.scss';

const mobileRegEx = /^(\+?\d{1,3}[ -]?)?\d{10}$/
const employeeSchema = yup.object({
    id: yup.string().required(),
    email: yup.string().email('Email is not valid').required(),
    name: yup.string().required(),
    address: yup.string().required(),
    age: yup.number().typeError("Age invalid").integer('Decimals not accepted').min(14,'Employee should be 14 years or older').required(),
    mobile: yup.string().matches(mobileRegEx, 'Phone number is not valid').required(),
  }).required();

const EmployeeModal = ({data, readOnly, createAction, updateAction, closeModal}) => {
    const formInitializer = !data 
    ? {resolver: yupResolver(employeeSchema)}
    : {resolver: yupResolver(employeeSchema), defaultValues: {...data}};

    const { register, handleSubmit, formState:{ errors }, reset  } = useForm(formInitializer);

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const currentId = data ? data.id : null;

    const handleCreate = async (data) => {
        const result = await createAction(data);
        if (result.err) {
            setIsError(true);
            setErrorMsg(result.message)
            setTimeout(() => {
                setIsError(false);
                setErrorMsg(null);
            }, 4000);
            return;
        }
        reset();
        closeModal();
    }

    const handleUpdate = async (data) => {
        const result = await updateAction(data,currentId);
        if (result.err) {
            setIsError(true);
            setErrorMsg(result.message)
            setTimeout(() => {
                setIsError(false);
                setErrorMsg(null);
            }, 4000);
            return;
        }
        closeModal();
    }

    return (
        <div className='container bgoverlay'>
            <form className='card-panel' id='employee-modal' onSubmit={(!data) ? handleSubmit(handleCreate) : handleSubmit(handleUpdate)} autoComplete="off">
                <div id='modal-fields'>
                    <div className='row'>
                        <div className='col s9'>
                            <label htmlFor='txt-emp-id'>Employee ID *</label>
                            <input {...register("id")} id='txt-emp-id' readOnly={readOnly} placeholder='Employee ID'/>
                            <p>{errors.id?.message}</p>
                        </div>

                        <div className='col s3'>
                            <label htmlFor='txt-age'>Age *</label>
                            <input {...register("age")} type='number' id='txt-age' readOnly={readOnly} placeholder='Age'/>
                            <p>{errors.age?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col s12'>
                            <label htmlFor='txt-full-name'>Full Name *</label>
                            <input {...register("name")} id='txt-full-name' readOnly={readOnly} placeholder='Full Name'/>
                            <p>{errors.name?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col s8'>
                            <label htmlFor='txt-email'>Email *</label>
                            <input {...register("email")} id='txt-email' readOnly={readOnly} placeholder='Email'/>
                            <p>{errors.email?.message}</p>
                        </div>

                        <div className='col s4'>
                        <label for='txt-mobile'>Mobile *</label>
                        <input {...register("mobile")} id='txt-mobile' readOnly={readOnly} placeholder='Mobile'/>
                        <p>{errors.mobile?.message}</p>
                        </div>
                    </div>
                    
                    
                    <div className='row'>
                        <div className='col s9'>    
                            <label htmlFor='txt-address'>Address *</label>
                            <textarea {...register("address")} id='txt-address' readOnly={readOnly} placeholder='Address' rows={3}/>
                            <p>{errors.address?.message}</p>
                        </div>
                    </div>
                </div>

                <div id='modal-footer'>
                    <button type="button" onClick={closeModal} className='btn caution'>Close</button>
                    <div id='action-failed-box' className={isError ? 'scale-transition scale-out scale-in' : 'scale-transition scale-out'}>
                        <i className='material-icons'>error</i>
                        Request Failed: {errorMsg}
                    </div>
                    {!readOnly ?<input type="submit" value={!data ? "Add" : "Update"} className='btn primary'/> : <></>}
                </div>
            </form>
        </div>
    );
}

export default EmployeeModal;