// UserAccountDetails.js
import React from 'react';

const UserAccountDetails = ({ userInfo }) => {

    return (
        <div className="container mx-auto p-8 mt-[60px]">

            {/* User Information */}
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="font-bold">Name:</p>
                        <p>{userInfo.name}</p>
                    </div>
                </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Delivery Information</h2>
                {userInfo.deliveryInfo ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <p className="font-bold">First Name:</p>
                            <p>{userInfo.deliveryInfo.firstName}</p>
                        </div>
                        <div>
                            <p className="font-bold">Last Name:</p>
                            <p>{userInfo.deliveryInfo.lastName}</p>
                        </div>
                        <div>
                            <p className="font-bold">Phone:</p>
                            <p>{userInfo.deliveryInfo.phone}</p>
                        </div>
                        <div>
                            <p className="font-bold">Sub City:</p>
                            <p>{userInfo.deliveryInfo.subCity}</p>
                        </div>
                        <div>
                            <p className="font-bold">Delivery Location:</p>
                            <p>{userInfo.deliveryInfo.deliveryLocation}</p>
                        </div>
                    </div>
                ) : (
                    <p>No delivery information found. Order now to provide delivery details!</p>
                )}
            </div>

            {/* Payment Information */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Payment Information</h2>
                <p className="font-bold">Payment Status:</p>
                <p>{userInfo.paymentStatus}</p>
                <p className="font-bold">paymentMethod:</p>
                <p>{userInfo.paymentMethod}</p>
                <img src={userInfo.receiptScreenshot} alt="" className="mt-4 max-w-full h-auto" />
            </div>

            {/* Orders */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Orders</h2>
                {userInfo.orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <ul>
                        {userInfo.orders.map((order) => (
                            <li key={order._id} className="mb-4">
                                <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
                                <ul>
                                    {order.stickers.map((sticker) => (
                                        <li key={sticker.id} className="mb-2">
                                            <p className="font-bold">Sticker ID:</p>
                                            <p>{sticker.id}</p>
                                            <p className="font-bold">Price:</p>
                                            <p>${sticker.price}</p>
                                            <p className="font-bold">Size:</p>
                                            <p>{sticker.size}</p>
                                            <p className="font-bold">Quantity:</p>
                                            <p>{sticker.quantity}</p>
                                            <p className="font-bold">Total Price:</p>
                                            <p>${sticker.totalPrice}</p>
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

export default UserAccountDetails;
