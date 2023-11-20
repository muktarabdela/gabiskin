import React from 'react';

const DeliveryInfo = ({ users }) => {
    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            <h2 className="text-3xl font-semibold mb-4">Delivery Information</h2>

            {users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden sm:mt-8">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-6 text-left">First Name</th>
                                <th className="py-3 px-6 text-left">Last Name</th>
                                <th className="py-3 px-6 text-left">Phone Number</th>
                                <th className="py-3 px-6 text-left">SubCity</th>
                                <th className="py-3 px-6 text-left">Delivery Location</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {users.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.deliveryInfo ? user.deliveryInfo.firstName : 'No delivery info'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.deliveryInfo ? user.deliveryInfo.lastName : 'No delivery info'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.deliveryInfo ? user.deliveryInfo.phone : 'No delivery info'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.deliveryInfo ? user.deliveryInfo.subCity : 'No delivery info'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        {user.deliveryInfo ? user.deliveryInfo.deliveryLocation : 'No delivery info'}
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

export default DeliveryInfo;
