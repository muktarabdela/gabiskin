// Orders.js
import React from 'react';

const Orders = ({ orders }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            {orders.map((order) => (
                <div key={order._id.$oid} className="mb-4">
                    <p className="text-gray-600 mb-2"><strong>Order ID:</strong> {order._id.$oid}</p>
                    <ul>
                        {order.stickers.map((sticker) => (
                            <li key={sticker.id.$oid} className="text-gray-600">{sticker.category} - {sticker.size}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Orders;
