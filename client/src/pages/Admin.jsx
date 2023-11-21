// AdminPage.js
import React, { useEffect, useState } from 'react';
import UserInfo from '../componet/admin/UserInfo';
import DeliveryInfo from '../componet/admin/DeliveryInfo';
import Orders from '../componet/admin/Orders';
import PaymentInfo from '../componet/admin/PaymentInfo';
import axios from '../Axios';
import { useNavigate } from 'react-router-dom';
import AdminAuth from '../componet/Account/AdminAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
const Admin = ({ userId }) => {
    const [selectedSection, setSelectedSection] = useState('userInfo');
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    return (
        <div className=" flex flex-col h-screen mt-[5em]">
            <div className='text-right mr-9'>
                <button
                    onClick={handleLogout}
                    className="w-20 text-white bg-primary-600 rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Logout
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
        </div>
    );
};

export default Admin;

