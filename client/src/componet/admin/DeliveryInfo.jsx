import React from 'react';

const DeliveryInfo = ({ users }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
            <h2 className="text-3xl font-semibold mb-4">Delivery Information</h2>
            {users.map((user, index) => (
                <div key={index} className="mb-6 bg-gray-100 rounded-md p-4">
                    <p className="text-gray-600 mb-2"><strong>First Name:</strong> {user.deliveryInfo.firstName}</p>
                    <p className="text-gray-600 mb-2"><strong>Last Name:</strong> {user.deliveryInfo.lastName}</p>
                    <p className="text-gray-600 mb-2"><strong>Phone:</strong> {user.deliveryInfo.phone}</p>
                    <p className="text-gray-600 mb-2"><strong>SubCity:</strong> {user.deliveryInfo.subCity}</p>
                    <p className="text-gray-600 mb-2"><strong>Delivery Location:</strong> {user.deliveryInfo.deliveryLocation}</p>
                </div>
            ))}
        </div>
    );
};

export default DeliveryInfo;
