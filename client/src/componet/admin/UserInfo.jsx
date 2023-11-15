import React from 'react';

const UserInfo = ({ userInfo }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
            {userInfo ? (
                userInfo.map((user) => (
                    <div key={user._id} className="mb-6 bg-gray-100 rounded-md p-4">
                        <h2 className="text-3xl font-semibold mb-4 text-black">{user.name}'s Profile</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-700 mb-2 ">
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Phone:</strong> {user.phone}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <strong>Payment Status:</strong> {user.paymentStatus}
                                </p>
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">Loading user info...</p>
            )}
        </div>
    );
};

export default UserInfo;
