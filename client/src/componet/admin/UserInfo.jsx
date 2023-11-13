import React, { useState, useEffect } from 'react'
import axios from '../../Axios'

const UserInfo = ({userInfo}) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
            {userInfo ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">{userInfo.name}'s Profile</h2>
                    <div>
                        <p className="text-gray-600 mb-2">
                            <strong>Email:</strong> {userInfo.email}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong>Phone:</strong> {userInfo.phone}
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-gray-700 text-sm mb-2">
                            <strong>Additional Information:</strong>
                        </p>
                        {/* Add additional information here */}
                    </div>
                </>
            ) : (
                <p className="text-gray-600">Loading user info...</p>
            )}
        </div>
    );
}

export default UserInfo