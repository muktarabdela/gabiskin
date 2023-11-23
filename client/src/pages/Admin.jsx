// AdminPage.js
import React, { useEffect, useState } from 'react';
import UserInfo from '../componet/admin/UserInfo';
import DeliveryInfo from '../componet/admin/DeliveryInfo';
import Orders from '../componet/admin/Orders';
import PaymentInfo from '../componet/admin/PaymentInfo';
import axios from '../Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import EditProfilePopup from '../componet/admin/EditProfilePopup';
import { jwtDecode } from 'jwt-decode';
const Admin = ({ userId }) => {
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [selectedSection, setSelectedSection] = useState('userInfo');
    const [error, setError] = useState(null)
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem('accessToken');

    const isValidToken = typeof token === 'string' && token.length > 0;
    const decodedToken = isValidToken ? jwtDecode(token) : null;
    const userIdFromToken = decodedToken ? decodedToken.id : null;
    console.log(decodedToken)
    console.log(userIdFromToken)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/users/admin');
                console.log(response.data);
                setUsersData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, [userId]);

    const renderSection = () => {
        switch (selectedSection) {
            case 'userInfo':
                return <UserInfo userInfo={usersData} />;
            case 'deliveryInfo':
                return <DeliveryInfo users={usersData} />;
            case 'orders':
                return <Orders users={usersData} />;
            case 'PaymentInfo':
                return <PaymentInfo users={usersData} />;
            default:
                return null;
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const openEditPopup = (user) => {
        setUserToUpdate(user);
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setUserToUpdate(null);
        setIsEditPopupOpen(false);
    };

    const handleUpdateProfile = async ({ newEmail, newPassword, confirmPassword, currentPassword }) => {
        try {
            const response = await axios.put('/users/update-profile', {
                userId: userIdFromToken,
                newEmail,
                newPassword,
                confirmPassword,
                currentPassword,
            });

            console.log('Profile Update:', response.data);

            // If successful, close the popup
            closeEditPopup();
        } catch (error) {
            console.log(error)
            setError(error.response.data.error);
        }
    };
    console.log(error)
    return (
        <div className=" flex flex-col h-screen mt-[5em]">
            <div className='text-right mr-6 mb-5'>
                <button
                    onClick={() => openEditPopup(userToUpdate)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
                >
                    Edit Profile
                </button>
            </div>
            <div className="flex w-[45vh] mx-auto">
                <button
                    className={`w-full  py-2 mb-2 ${selectedSection === 'userInfo' ? 'bg-blue-300 text-white' : 'text-blue-500'}`}
                    onClick={() => setSelectedSection('userInfo')}
                >
                    User Info
                </button>
                <button
                    className={`w-full  mb-2 ${selectedSection === 'deliveryInfo' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                    onClick={() => setSelectedSection('deliveryInfo')}
                >
                    Delivery Info
                </button>
                <button
                    className={`w-full py-2 ${selectedSection === 'orders' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                    onClick={() => setSelectedSection('orders')}
                >
                    Orders
                </button>
                <button
                    className={`w-full py-2 ${selectedSection === 'PaymentInfo' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                    onClick={() => setSelectedSection('PaymentInfo')}
                >
                    Payment Info
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {renderSection()}
            </div>
            <EditProfilePopup
                isOpen={isEditPopupOpen}
                closePopup={closeEditPopup}
                handleUpdateProfile={handleUpdateProfile}
                error={error}
            />
        </div>
    );
};

export default Admin;

