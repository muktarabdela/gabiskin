import React from 'react';

const UserInfo = ({ userInfo }) => {
    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            {userInfo ? (
                userInfo.map((user) => (
                    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                        <div className="overflow-y-hidden rounded-lg border">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-5 py-3"> Name</th>
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Phone number</th>
                                        <th className="px-5 py-3">Payment status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-500">
                                    <tr>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="whitespace-no-wrap">{user.name}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap">{user.email}</p>
                                        </td>

                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap">{user.phone}</p>
                                        </td>

                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                                                {user.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
