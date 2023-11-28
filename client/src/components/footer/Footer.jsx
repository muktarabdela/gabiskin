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
                        our works
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pricing"
                        rel="nofollow"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        price    </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin"
                        rel="nofollow"
                        className="text-gray-600 hover:underline dark:text-gray-400"
                      >
                        admin
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
                        Tik tok
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

                <iframe
                  src="https://maps.google.com/maps?q=  8.89652811296649,38.7720541236866 &t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="relative right-[4em] md:right-[10em] lg:right-[18em] w-[20em] md:w-[23em] lg:w-[36em] h-[17em] rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                  frameBorder={0}
                  allowFullScreen=""
                />
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="text-left">
            <span className="text-sm mt-4  text-gray-500 text-left dark:text-gray-400 flex  ">
              Developed{" "}
              <a
                href="https://www.linkedin.com/in/muktarabdela/"
                target="_blank"
                className="hover:underline ml-1 flex"
              >
                muktar
                <img
                  className="w-[1.5em] rounded-md ml-2"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-mMHBzCfB4uhXtDo_51TZwLexR3TPVsJ-JLY52A2Dag&s" alt="" />
              </a>
            </span>
          </div>

        </footer>
      </div>
    </>


  );
}

export default Footer;
