import React, { useState, useEffect } from 'react';
import axios from '../../Axios';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { jwtDecode } from 'jwt-decode';
import AuthForm from '../auth/AuthForm';
import UserAccountDetails from './UserAccountDetails';

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        
        const token = localStorage.getItem('acc2essToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                const userIdFromToken = decodedToken.userId;

                if (userIdFromToken) {
                    axios
                        .get(`/users/get-user-info/${userIdFromToken}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        })
                        .then(response => {
                            setUserInfo(response.data);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching user data:', error);
                            setLoading(false);
                        });
                } else {
                    // userId is not available, indicating a new user
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setLoading(false);
            }
        } else {
            // No token available, indicating a new user
            setLoading(false);
        }
    }, [userId, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userInfo) {
        return <AuthForm />;
    }

    // Render user account details if userId is available
    return (
        <UserAccountDetails userInfo={userInfo} />
    );
};

export default Account;