// // DeliveryContext.js
// import { createContext, useContext, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import {
//     setFirstName,
//     setLastName,
//     setPhone,
//     setSubCity,
//     setDeliveryLocation,
// } from "../store/deliverySlice"
// const DeliveryContext = createContext();

// const DeliveryContextProvider = ({ children }) => {
//     const dispatch = useDispatch();

//     const [formData, setFormData] = useState({
//         // Initial form data
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         subCity: '',
//         deliveryLocation: '',
//         // ... other fields for registration and payment
//     });

//     const handleInputChange = (name, value) => {
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };


//     const handleSubmit = () => {
//         dispatch(setFirstName(formData.firstName));
//         dispatch(setLastName(formData.lastName));
//         dispatch(setPhone(formData.phone));
//         dispatch(setSubCity(formData.subCity));
//         dispatch(setDeliveryLocation(formData.deliveryLocation));
//         // console.log('Form submitted:', formData);
//     };

//     return (
//         <DeliveryContext.Provider value={{ formData, handleInputChange, handleSubmit }}>
//             {children}
//         </DeliveryContext.Provider>
//     );
// };

// const useDeliveryContext = () => {
//     const context = useContext(DeliveryContext);
//     if (!context) {
//         throw new Error('useDeliveryContext must be used within a DeliveryContextProvider');
//     }
//     return context;
// };

// export { DeliveryContext, DeliveryContextProvider, useDeliveryContext };
