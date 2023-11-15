import React from 'react';

const Orders = ({ users }) => {
    console.log(users)
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Orders</h2>
            {users.map((user, userIndex) => (
                <div key={userIndex} className="mb-4 bg-gray-100 rounded-md p-4">
                    <p className="text-gray-600 mb-2"><strong>User Name:</strong> {user.name}</p>
                    <p className="text-gray-600 mb-2"><strong>User Phone:</strong> {user.phone}</p>
                    {user.orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="mb-4">
                            <p className="text-gray-600 mb-2"><strong>Order ID:</strong> {order._id}</p>
                            <ul>
                                {order.stickers.map((sticker, stickerIndex) => (
                                    <li key={stickerIndex} className="text-gray-600 mb-2 border-b pb-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p><strong>Category:</strong> {sticker.category}</p>
                                                <p><strong>Size:</strong> {sticker.size}</p>
                                                <p><strong>Quantity:</strong> {sticker.quantity}</p>
                                            </div>
                                            <div>
                                                <p><strong>Price:</strong> ${sticker.price}</p>
                                                {/* Add other sticker information here */}
                                                <img
                                                    src={sticker.imageUrl}
                                                    alt={`Sticker ${stickerIndex + 1}`}
                                                    className="w-[7em] max-w-xs mx-auto mt-2"
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Orders;
