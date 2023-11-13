import { useState, useEffect } from 'react';
import { sendCartToOrders } from '../../store/CartSlice';
import axios from '../../Axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) => state.cart.stickers);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sendOrderToDatabase = async () => {
            try {
                if (user && cartItems.length > 0) {
                    // Calculate total price for the order
                    const totalPrice = cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    );

                    // Create order object
                    const orderData = {
                        userId: user.userId,
                        items: cartItems.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                        })),
                        deliveryInfo: {
                            // You can include delivery information here if needed
                            fullName: user.fullName,
                            address: user.address,
                            contactNumber: user.phone,
                        },
                        totalPrice: totalPrice,
                    };

                    // Send the order to the database
                    const response = await axios.post('/orders/add', orderData);

                    // Handle success response
                    console.log('Order placed successfully:', response.data);

                    // Clear the cart after placing the order
                    dispatch(sendCartToOrders([]));

                    // Navigate to a success page or display a success message
                    navigate('/order-success');
                }
            } catch (error) {
                // Handle errors
                console.error('Error placing order:', error.message);
                setError('Error placing order. Please try again later.');
            }
        };

        sendOrderToDatabase();
    }, [user, cartItems, dispatch, navigate]);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default AddOrder;
