import React from 'react';

const DeliveryInfo = ({ users }) => {
    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            <h2 className="text-3xl font-semibold mb-4">Delivery Information</h2>

            {users.length > 0 ? (
                users.map((user, index) => (
                    <div key={index} className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                        <div className="overflow-y-hidden rounded-lg border">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-5 py-3">First Name</th>
                                        <th className="px-5 py-3">Last Name</th>
                                        <th className="px-5 py-3">Phone number</th>
                                        <th className="px-5 py-3">SubCity</th>
                                        <th className="px-5 py-3">Delivery Location</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-500">
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="whitespace-no-wrap">
                                                    {user.deliveryInfo ? user.deliveryInfo.firstName : 'no delivery info'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                            {user.deliveryInfo ? user.deliveryInfo.lastName : 'no delivery info'}
                                        </p>
                                    </td>

                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                            {user.deliveryInfo ? user.deliveryInfo.phone : 'no delivery info'}
                                        </p>
                                    </td>

                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                            {user.deliveryInfo ? user.deliveryInfo.subCity : 'no delivery info'}
                                        </p>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">
                                            {user.deliveryInfo ? user.deliveryInfo.deliveryLocation : 'no delivery info'}
                                        </p>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                <p>No delivery information found. Order now to provide delivery details!</p>
            )}
        </div>
    );
};

export default DeliveryInfo;
