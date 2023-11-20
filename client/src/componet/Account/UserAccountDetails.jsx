import React from 'react';
import { Link } from 'react-router-dom';

const UserAccountDetails = ({ userInfo }) => {
  if (!userInfo.paymentStatus) {
    return (
      <div className="container mx-auto p-8 mt-[60px] text-center">
        <p className="mt-10 text-gray-300 text-4xl animate__animated animate__fadeInDown">
          Welcome to Gabi Skin
        </p>
        <p className="text-gray-400 text-xl animate__animated animate__fadeInUp">
          Home of Sticker
        </p>
        <div className="mt-4 animate__animated animate__fadeIn">
          <p className="text-gray-400">
            You haven't placed any orders yet. Explore our collection and
            <Link to="/" className="text-blue-500 hover:underline"> order now!</Link>
          </p>
        </div>
      </div>
    );
  }

  const totalAmountWithoutDiscount = userInfo.orders.reduce((total, order) => {
    return total + order.stickers.reduce((orderTotal, sticker) => orderTotal + sticker.totalPrice, 0);
  }, 0);
  const totalAmountWithDiscount = totalAmountWithoutDiscount / 5
  return (
    <div className="container mx-auto p-8 mt-[60px]">
      {/* User Information */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="font-bold text-lg text-right">Hello: {userInfo.name || userInfo.deliveryInfo.firstName}</p>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="">
        <div className="mx-auto md:col-span-2 md:flex lg:flex md:ml-[10em] lg:ml-[10em]">
          <div className="mb-4 md:mr-[6em] lg-[6em]">
            <h2 className="text-xl font-bold mb-2">Delivery Information</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold">First Name:</td>
                  <td>{userInfo.deliveryInfo.firstName}</td>
                </tr>
                <tr className='mx-5'>
                  <td className="font-semibold">Last Name:</td>
                  <td>{userInfo.deliveryInfo.lastName}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Phone:</td>
                  <td>{userInfo.deliveryInfo.phone}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Sub City:</td>
                  <td>{userInfo.deliveryInfo.subCity}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Delivery Location:</td>
                  <td>{userInfo.deliveryInfo.deliveryLocation}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Payment Information */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mt-14 md:mt-0 lg:mt-0 xl:mx-[300px]">
            <div className="md:col-span-2">
              <div className="">
                <h2 className="text-xl font-bold mb-2">Payment Information</h2>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold ">Payment Status:</td>
                      <td className='text-blue-600 rounded  p-2 bg-blue-200'>{userInfo.paymentStatus}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Payment Method:</td>
                      <td>{userInfo.paymentMethod}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="md:col-span-1 mb-4 md:mb-0">
                  <h2 className="text-xl font-bold mb-2">Payment Screenshot Receipt</h2>
                  <img src={userInfo.receiptScreenshot} alt="Payment Screenshot" className="w-[15em] rounded-md" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Orders */}


      <div className="mx-2 cart-items-container my-6 rounded-md bg-gray-100 p-6">
        <h2 className="text-black text-2xl font-bold mb-4">Your Orders</h2>
        <hr className="border-black" />
        <ul className="mt-4">
          {userInfo.orders.map((order) =>
            order.stickers.map((sticker, index) => (
              <li key={sticker.id} className="mb-6 border-b pb-4">
                <div className="flex items-center justify-evenly">
                  <img className="w-20 h-20 object-cover mr-[2em] md:mr-[20em] lg-[60em]" src={sticker.imageUrl} alt="" />

                  <div>
                    <p className="text-black mb-2 md:text-lg font-mono">
                      <span className="mr-2 text-gray-600">Category:</span>
                      {sticker.category}
                    </p>
                    <p className="text-black mb-2 md:text-lg font-mono">
                      <span className="mr-2 text-gray-600">Sticker Price:</span>
                      {sticker.totalPrice}
                    </p>
                    <p className="text-black md:text-lg font-mono">
                      <span className="mr-2 text-gray-600">Quantity:</span>
                      {sticker.quantity}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-6">
          <p className="text-black font-bold">
            Total Price: {totalAmountWithoutDiscount} ETB
          </p>
        </div>
        <div className="mt-6">
          <p className="text-black font-bold">
            Initial Price: {totalAmountWithDiscount} ETB
          </p>
        </div>
        <h2 className='text-gray-600 text-center mt-6 text-lg font-semibold'>visit our social media</h2>
      </div>
    </div>
  );
};

export default UserAccountDetails;
