import React from 'react';

const PaymentInfo = ({ users }) => {
    return (
        <div>
            <h2>Payment Information</h2>
            {Array.isArray(users) && users.map((user) => (
                <div key={user._id}>
                    <p>User ID: {user._id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Payment Status: {user.paymentStatus}</p>
                    <p>payment method: {user.paymentMethod}</p>
                    <img src={user.receiptScreenshot} alt="" />
                </div>
            ))}
        </div>
    );
};

export default PaymentInfo;
