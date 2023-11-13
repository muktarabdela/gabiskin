// UserAccountPage.js
import React, { useState, useEffect } from 'react';
import axios from '../../Axios'; // Import your Axios instance
import { useParams } from 'react-router-dom';

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`/users/get-user-info/${userId}`)
            .then(response => {
                setUserInfo(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userInfo) {
        return <p>User not found</p>;
    }

    return (
        <div className="container mx-auto p-8 mt-[60px]">
            <h1 className="text-3xl font-bold mb-4">User Account</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">User Information</h2>
                <p><span className="font-bold">Name:</span> {userInfo.name}</p>
                <p><span className="font-bold">Email:</span> {userInfo.email}</p>
                <p><span className="font-bold">Phone:</span> {userInfo.phone}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Delivery Information</h2>
                <p><span className="font-bold">First Name:</span> {userInfo.deliveryInfo.firstName}</p>
                <p><span className="font-bold">Last Name:</span> {userInfo.deliveryInfo.lastName}</p>
                <p><span className="font-bold">Phone:</span> {userInfo.deliveryInfo.phone}</p>
                <p><span className="font-bold">Sub City:</span> {userInfo.deliveryInfo.subCity}</p>
                <p><span className="font-bold">Delivery Location:</span> {userInfo.deliveryInfo.deliveryLocation}</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Orders</h2>
                {userInfo.orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <ul>
                        {userInfo.orders.map(order => (
                            <li key={order._id} className="mb-4">
                                <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
                                <ul>
                                    {order.stickers.map(sticker => (
                                        <li key={sticker.id} className="mb-2">
                                            <p><span className="font-bold">Sticker ID:</span> {sticker.id}</p>
                                            <p><span className="font-bold">Price:</span> ${sticker.price}</p>
                                            <p><span className="font-bold">Size:</span> {sticker.size}</p>
                                            <p><span className="font-bold">Quantity:</span> {sticker.quantity}</p>
                                            <p><span className="font-bold">Total Price:</span> ${sticker.totalPrice}</p>
                                            <img
                                                src={sticker.imageUrl}
                                                alt={`Sticker ${sticker.id}`}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Account;
