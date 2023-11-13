// DeliveryInfo.js
import React from 'react';

const DeliveryInfo = ({ deliveryInfo }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
            <p className="text-gray-600 mb-2"><strong>First Name:</strong> {deliveryInfo.firstName}</p>
            <p className="text-gray-600 mb-2"><strong>Last Name:</strong> {deliveryInfo.lastName}</p>
            <p className="text-gray-600 mb-2"><strong>Phone:</strong> {deliveryInfo.phone}</p>
            <p className="text-gray-600 mb-2"><strong>SubCity:</strong> {deliveryInfo.subCity}</p>
            <p className="text-gray-600 mb-2"><strong>Delivery Location:</strong> {deliveryInfo.deliveryLocation}</p>
        </div>
    );
};

export default DeliveryInfo;
