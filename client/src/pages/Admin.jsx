// AdminPage.js
import React, { useEffect, useState } from 'react';
import UserInfo from '../components/admin/UserInfo';
import DeliveryInfo from '../components/admin/DeliveryInfo';
import Orders from '../components/admin/Orders';
import PaymentInfo from '../components/admin/PaymentInfo';
import axios from '../Axios';
import EditProfilePopup from '../components/admin/EditProfilePopup';
import { jwtDecode } from 'jwt-decode';
const Admin = ({ userId }) => {
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [selectedSection, setSelectedSection] = useState('userInfo');
    const [error, setError] = useState(null)
    const [usersData, setUsersData] = useState([]);

    const token = localStorage.getItem('accessToken');

    const isValidToken = typeof token === 'string' && token.length > 0;
    const decodedToken = isValidToken ? jwtDecode(token) : null;
    const userIdFromToken = decodedToken ? decodedToken.id : null;
    console.log(decodedToken)
    console.log(userIdFromToken)

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/users/admin');
                setUsersData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, [userId]);

    const renderSection = () => {
        const sectioncomponents = {
            userInfo: <UserInfo userInfo={usersData} />,
            deliveryInfo: <DeliveryInfo users={usersData} />,
            orders: <Orders users={usersData} />,
            PaymentInfo: <PaymentInfo users={usersData} />,
        };
        return sectioncomponents[selectedSection] || null;
    };
    const openEditPopup = (user) => {
        setUserToUpdate(user);
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setUserToUpdate(null);
        setIsEditPopupOpen(false);
    };

    const handleUpdateProfile = async ({ newEmail, newPassword, confirmPassword, currentPassword }) => {
        try {
            const response = await axios.put('/users/update-profile', {
                userId: userIdFromToken,
                newEmail,
                newPassword,
                confirmPassword,
                currentPassword,
            });

            console.log('Profile Update:', response.data);

            // If successful, close the popup
            closeEditPopup();
        } catch (error) {
            console.log(error)
            setError(error.response.data.error);
        }
    };
    console.log(error)
    return (
        <div className=" flex flex-col h-screen mt-[5em]">
            <div className='text-right mr-6 mb-5'>
                <button
                    onClick={() => openEditPopup(userToUpdate)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
                >
                    Edit Profile
                </button>
            </div>

            <div className="flex w-[45vh] mx-auto">
                {['userInfo', 'deliveryInfo', 'orders', 'PaymentInfo'].map((section) => (
                    <button
                        key={section}
                        className={`w-full py- mb- ${selectedSection === section ? ' border-b  p-1 rounded-lg text-orange-400 ' : 'text-blue-500'}`}
                        onClick={() => setSelectedSection(section)}
                    >
                        {section.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>
            <div className="flex-1 p-8">{renderSection()}</div>
            <EditProfilePopup
                isOpen={isEditPopupOpen}
                closePopup={closeEditPopup}
                handleUpdateProfile={handleUpdateProfile}
                error={error}
            />
        </div>
    );
};

export default Admin;

