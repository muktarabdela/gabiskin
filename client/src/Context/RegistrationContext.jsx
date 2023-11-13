// // Context/RegistrationContext.js
// import { createContext, useContext, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//     setName,
//     setPhoneNumber,
//     setPassword,
// } from '../store/registrationSlice';

// const RegistrationContext = createContext();

// const RegistrationContextProvider = ({ children }) => {
//     const dispatch = useDispatch();

//     const [registrationData, setRegistrationData] = useState({
//         // Initial state...
//     });

//     const handleRegistrationInputChange = (name, value) => {
//         setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleRegistrationSubmit = () => {
//         dispatch(setName(registrationData.name));
//         dispatch(setPhoneNumber(registrationData.phoneNumber));
//         dispatch(setPassword(registrationData.password));
//         console.log('Registration submitted:', registrationData);
//     };

//     return (
//         <RegistrationContext.Provider value={{ registrationData, handleRegistrationInputChange, handleRegistrationSubmit }}>
//             {children}
//         </RegistrationContext.Provider>
//     );
// };

// const useRegistrationContext = () => {
//     const context = useContext(RegistrationContext);
//     if (!context) {
//         throw new Error('useRegistrationContext must be used within a RegistrationContextProvider');
//     }
//     return context;
// };

// export { RegistrationContext, RegistrationContextProvider, useRegistrationContext };
