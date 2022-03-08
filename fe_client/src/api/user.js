import request from './apiClient';


export const addUser = async (reqBody) => {
    try {
        const response = await request.post(
            `/v1/signup/user`,
            { ...reqBody},
        );
        return response.data;
    } catch(ex) {
        return {err: true, message: ex}
    }
}