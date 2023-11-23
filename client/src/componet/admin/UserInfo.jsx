import React from 'react';

const UserInfo = ({ userInfo }) => {
    const reversedUserInfo = userInfo.slice().reverse();
    return (
        <div className="">
            {reversedUserInfo.length > 0 ? (
                <div className="overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className=" text-white">

                                <th scope="col" class="px-6 py-3">

                                    Name</th>
                                <th scope="col" class="px-6 py-3">
                                    Email</th>
                                <th scope="col" class="px-6 py-3">
                                    Phone number</th>
                                <th scope="col" class="px-6 py-3">
                                    Payment status</th>
                                <th scope="col" class="px-6 py-3">
                                    delivery Status</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-500">
                        {reversedUserInfo.map((user, index) => (
                                <tr key={index} scope="row" class="bg-white dark:bg-gray-800 text-white">
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.name || (user.deliveryInfo && user.deliveryInfo.firstName) || 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {(user.phone || (user.deliveryInfo && user.deliveryInfo.phone)) || 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-green-600">
                                        {user.paymentStatus}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200  text-green-600">
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

