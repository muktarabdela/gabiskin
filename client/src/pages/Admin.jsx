// AdminPage.js
import React, { useEffect, useState } from 'react';
import UserInfo from '../componet/admin/UserInfo';
import DeliveryInfo from '../componet/admin/DeliveryInfo';
import Orders from '../componet/admin/Orders';
import axios from '../Axios';

const Admin = ({ userId }) => {
    const [selectedSection, setSelectedSection] = useState('userInfo');
    const [userInfoData, setUserInfoData] = useState(null);
    const [deliveryInfoData, setDeliveryInfoData] = useState(null);
    const [ordersData, setOrdersData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace 'userId' with the actual user ID you want to fetch
                const response = await axios.get(`/users/get-user-info/${userId}?userInfo=true&deliveryInfo=true&orders=true`);
                // console.log(response)
                setUserInfoData(response.data.userInfo)
                setDeliveryInfoData(response.data.deliveryInfo)
                setOrdersData(response.data.orders)

                console.log("userinfo", userInfoData)
                console.log("delivery info", deliveryInfoData)
                console.log("orders", ordersData)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const renderSection = () => {
        switch (selectedSection) {
            case 'userInfo':
                return <UserInfo userInfo={userInfoData} />;
            case 'deliveryInfo':
                return <DeliveryInfo deliveryInfo={deliveryInfoData} />;
            case 'orders':
                return <Orders orders={ordersData} />;
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
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {renderSection()}
            </div>
        </div>
    );
};

export default Admin;
