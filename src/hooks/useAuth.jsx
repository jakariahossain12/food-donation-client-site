import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';

const useAuth = () => {

    const Auth = useContext(AuthContext)

    return Auth
};

export default useAuth;