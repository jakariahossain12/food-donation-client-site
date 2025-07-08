import React from 'react';
import useAuth from '../../hooks/useAuth';
import Loading from '../../Component/Loading/Loading';

const Home = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <div>
           <h1>jakeia</h1>
        </div>
    );
};

export default Home;