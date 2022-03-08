import React, {useEffect, useRef} from "react";
import {validateUser} from '../api/auth';
import { useNavigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const navigation = useRef(useNavigate());

    useEffect(() => {
        async function notLoggedIn() {
            const isValid = await validateUser();
            if (!isValid) {
                navigation.current('/signin');
            }
        };
        notLoggedIn();
    }, []);

    return  (
        <div className='rootContainer'>
            <Outlet />
        </div>
    );
};

export default PrivateRoute;