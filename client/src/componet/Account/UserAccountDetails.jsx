import React from 'react';
import { Link } from 'react-router-dom';

const UserAccountDetails = ({ userInfo }) => {
  if (!userInfo.name) {

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
  return (
    <div className="container mx-auto p-8 mt-[60px]">
      {/* User Information */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="font-bold text-lg text-right">Hello: {userInfo.name}</p>
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
      <div>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {userInfo.orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-md p-4">
            <table className="w-full my-0 align-middle text-black border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-md text-secondary-black">
                  <th className="pb-3 text-start min-w-[175px]">Image</th>
                  <th className="pb-3 text-center min-w-[100px]">Category</th>
                  <th className="pb-3 text-center min-w-[100px]">Price</th>
                  <th className="pb-3 text-center min-w-[175px]">Size</th>
                  <th className="pb-3 text-center min-w-[100px]">Quantity</th>
                  <th className="pb-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {userInfo.orders.map((order) =>
                  order.stickers.map((sticker, index) => (
                    <tr key={sticker.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white border-b border-dashed last:border-b-0'}>
                      <td className="p-3 pl-0">
                        <img src={sticker.imageUrl} className="w-[100px] h-auto rounded-md" alt="" />
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-semibold text-light-inverse">{sticker.category}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-success bg-success-light rounded-lg p-2">
                          {sticker.price} ETB
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-primary bg-primary-light rounded-lg p-2">
                          {sticker.size}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-semibold text-light-inverse">{sticker.quantity}</span>
                      </td>
                      <td className="p-3 text-center">
                        <button className="text-secondary-black bg-light-dark hover:text-primary hover:bg-gray-200 px-3 py-1 rounded-md">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountDetails;
