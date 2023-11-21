import React, { useEffect, useState } from 'react'
import axios from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../store/authSlice';

const AdminAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Error, setError] = useState(null)
    const [hasNavigated, setHasNavigated] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    useEffect(() => {
        console.log('useEffect is running');
        const token = localStorage.getItem('accessToken');
        if (token && !hasNavigated) {
            console.log('Token found, navigating to /admin');
            navigate('/admin');
            setHasNavigated(true);
        }
    }, [navigate, hasNavigated]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("users/admin/login", formData)
            .then((response) => {
                console.log(response.data);
                const token = response.data.token;
                console.log("console fro token", token)
                localStorage.setItem('accessToken', token);

                dispatch(loginSuccess(response.data));
                console.log("navigate to admin")
                navigate("/admin");
            })
            .catch((error) => {
                error.response.data
                console.error(error.response.data.error);
                setError(error.response.data.error)
            });
    };
    return (
        <section className=" mt-[5em]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to your  account
                        </h1>
                        {Error && <p className="text-red-500 text-sm">{Error}</p>}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                            >
                                LogIn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default AdminAuth