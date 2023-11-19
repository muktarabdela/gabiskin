import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleForm = () => {
        setIsRegistering((prevState) => !prevState);
    };

    return (
        <div>
            {isRegistering ? (
                <Register onToggleForm={toggleForm} />
            ) : (
                <Login onToggleForm={toggleForm} />
            )}
        </div>
    );
};

export default AuthForm;
