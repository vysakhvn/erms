import request from './apiClient';
import {USER_DATA, AUTH_TOKEN} from '../constants/session';


export const validateUser = async () => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    const user = sessionStorage.getItem(USER_DATA);
    if (token && user) {
        const response = await request.post(
            `/v1/auth/isValid`,
            { ...JSON.parse(user)},
            {
                headers: {
                  'Authorization': `Bearer ${token}` 
                }
            }
        );
        const isValid = response.data.result;
        if (!isValid) {
            clearSession();
        }
        return isValid;
    }
    return false;
}

export const validateUserLocal = () => {
    const token = sessionStorage.getItem(AUTH_TOKEN);
    const user = sessionStorage.getItem(USER_DATA);

    if (token && user) {
        return true;
    }
    clearSession();
    return false;
}

export const userLogin = async (reqBody) => {
    try {
        const response = await request.post(
            `/v1/auth/signin`,
            { ...reqBody},
        );
        return response.data;
    } catch(ex) {
        return {err: true, message: ex}
    }
}

export const clearSession = () => {
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(USER_DATA);
}