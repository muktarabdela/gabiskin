import React from 'react';

const UserInfo = ({ userInfo }) => {
    console.log(userInfo)
    return (
        <div className="">
            {userInfo ? (
                <div className="overflow-x-auto">
                    <table className="w-full  bg-white shadow-md rounded-l overflow-hidden sm:mt-8">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-6 text-left"> Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Phone number</th>
                                <th className="py-3 px-6 text-left">Payment status</th>
                                <th className="py-3 px-6 text-left">delivery Status</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-500">
                            {userInfo.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.name || (user.deliveryInfo && user.deliveryInfo.firstName) || 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {(user.phone || (user.deliveryInfo && user.deliveryInfo.phone)) || 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.paymentStatus}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.deliveryStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No delivery information found. Order now to provide delivery details!</p>
            )}
        </div>
    );
};

export default UserInfo;

