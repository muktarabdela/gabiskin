// AdminPage.js
import React, { useEffect, useState } from 'react';
import UserInfo from '../componet/admin/UserInfo';
import DeliveryInfo from '../componet/admin/DeliveryInfo';
import Orders from '../componet/admin/Orders';
import PaymentInfo from '../componet/admin/PaymentInfo';
import axios from '../Axios';

const Admin = ({ userId }) => {
    const [selectedSection, setSelectedSection] = useState('userInfo');
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/users/admin');
                console.log(response.data);
                setUsersData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userId]);

    const renderSection = () => {
        switch (selectedSection) {
            case 'userInfo':
                return <UserInfo userInfo={usersData} />;
            case 'deliveryInfo':
                return <DeliveryInfo users={usersData
                } />;
            case 'orders':
                return <Orders users={usersData} />;
            case 'PaymentInfo':
                return <PaymentInfo users={usersData} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen mt-[4em]">
            {/* Sidebar */}
            <div className="bg-gray-200 w-1/5 p-4">
                <button
                    className={`w-full py-2 mb-2 ${selectedSection === 'userInfo' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                    onClick={() => setSelectedSection('userInfo')}
                >
                    User Info
                </button>
                <button
                    className={`w-full py-2 mb-2 ${selectedSection === 'deliveryInfo' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
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
                    PaymentInfo
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
