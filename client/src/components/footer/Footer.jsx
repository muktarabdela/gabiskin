import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/images/logo.png"
function Footer() {
  return (
    <>
      <div className="max-w-1xl mx-auto mt-[4em]">
        <footer className="p-4 sm:p-6 bg-gray-800 shadow-md rounded-t-xl">

          <div className=" md:mb-0 ">
            <a href="/" className="flex items-center">
              <img
                src={logo}
                className="mr-2 h-[4em] w-[5em]"
                alt="FlowBite Logo"
              />
            </a>
          </div>

          <div className="md:flex md:justify-start">

            <div className="ml-[6em] relative bottom-16">
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div className="">
                  <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    link
                  </h3>
                  <ul>
                    <li className="">
                      <Link
                        to="/works"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        Our works
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pricing"
                        rel="nofollow"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        Price
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin"
                        rel="nofollow"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        Admin
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="relative md:right-[8em] lg:right-[8em]">
                  <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white ">
                    Follow us
                  </h3>
                  <ul>
                    <li className="">
                      <a
                        href="http://t.me/gabiskin"
                        target="_blank"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        Telegram                                        </a>
                    </li>
                    <li>
                      <a
                        href="https://www.tiktok.com/@gabiskin"
                        target="_blank"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        Tiktok
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="https://youtube.com/@gabiskin_?si=OKwEAlr-AWUkGtS0"
                        target="_blank"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        Youtube                                        </a>
                    </li>
                    <li>
                      <a
                        href="http://instagram.com/gabiskin_"
                        target="_blank"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        instagram                                        </a>
                    </li>

                  </ul>
                </div>

                <div className="relative right-[6em] lg:right-[25em] hidden lg:block">
                  <iframe
                    src="https://maps.google.com/maps?q=8.89652811296649,38.7720541236866&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="h-[17em]    lg:w-[50em] rounded-t-lg"
                    frameBorder={0}
                    allowFullScreen=""
                  />
                </div>

              </div>
            </div>
          </div>



          <div className="w-full mx-auto lg:hidden">
            <iframe
              src="https://maps.google.com/maps?q=8.89652811296649,38.7720541236866&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[17em] w-full rounded-t-lg"
              frameBorder={0}
              allowFullScreen=""
            />
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="text-left">
            <span className="text-sm mt-4  text-gray-500 text-left dark:text-gray-400 flex  ">
              Developed by {" "}
              <a
                href="https://muka10.com"
                target="_blank"
                className="underline ml-1 flex"
              >
                muktar
              </a>
            </span>
          </div>

        </footer>
      </div>
    </>


  );
}

export default Footer;
