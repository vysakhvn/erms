import request from './apiClient';
import {AUTH_TOKEN} from '../constants/session';


export const addEmployee = async (reqBody) => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    if (token) {
        try {
            const response = await request.post(
                `/v1/employee`,
                { ...reqBody},
                {
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                }
            );
            const result = response.data;
            return result;
        } catch(ex) {
            return {err: true, message: ex}
        }
    }
    return {err: true, message: 'Token Missing', needAuth: true}
}

export const listEmployee = async (optionalParams = undefined) => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    if (token) {
        try {
            const response = await request.get(
                `/v1/employee`,
                {
                    params: optionalParams,
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                }
            );
            const result = response.data;
            return result;
        } catch(ex) {
            return {err: true, message: ex.message}
        }
    }
    return {err: true, message: 'Token Missing', needAuth: true}
}

export const deleteEmployee = async (empId) => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    if (token) {
        try {
            const response = await request.delete(
                `/v1/employee/${empId}`,
                {
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                }
            );
            const result = response.data;
            return result;
        } catch(ex) {
            return {err: true, message: ex.message}
        }
    }
    return {err: true, message: 'Token Missing', needAuth: true}
}

export const updateEmployee = async (reqBody, id) => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    if (token) {
        try {
            const response = await request.put(
                `/v1/employee/${id}`,
                { ...reqBody},
                {
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                }
            );
            const result = response.data;
            return result;
        } catch(ex) {
            return {err: true, message: ex}
        }
    }
    return {err: true, message: 'Token Missing', needAuth: true}
}

