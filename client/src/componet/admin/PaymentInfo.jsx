import React, { useState } from 'react';
import axios from '../../Axios';

const PaymentInfo = ({ users }) => {
    const [paymentStatus, setPaymentStatus] = useState({});

    const handleUpdatePaymentStatus = async (userId) => {
        try {
            const response = await axios.put(`/stickers/update-payment-status/${userId}`, {
                newPaymentStatus: paymentStatus[userId],
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    const handleStatusChange = (userId, newStatus) => {
        setPaymentStatus((prevStatus) => ({
            ...prevStatus,
            [userId]: newStatus,
        }));
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Information</h2>

            {Array.isArray(users) &&
                users.map((user) => (
                    <div key={user._id} className="bg-white p-6 rounded-md shadow-md mb-8">
                        <p className="text-gray-800">
                            <span className="font-bold">User ID:</span> {user._id}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-bold">Name:</span> {user.name}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-bold">Email:</span> {user.email}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-bold">Phone:</span> {user.phone}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-bold">Payment Method:</span> {user.paymentMethod}
                        </p>
                        <img src={user.receiptScreenshot} alt="" className="mt-4 max-w-full h-auto rounded-md" />

                        <div className="mt-4">
                            <label htmlFor={`paymentStatus-${user._id}`} className="text-black">
                                Select Payment Status:
                            </label>
                            <select
                                className="text-black w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none"
                                id={`paymentStatus-${user._id}`}
                                value={paymentStatus[user._id] || ''}
                                onChange={(e) => handleStatusChange(user._id, e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={() => handleUpdatePaymentStatus(user._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Update Payment Status to {paymentStatus[user._id]}
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PaymentInfo;
