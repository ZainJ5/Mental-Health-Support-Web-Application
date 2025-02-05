'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import {
  Fa500Px,
  FaCog,
  FaComment,
  FaFileAlt,
  FaPaperPlane,
  FaPrescription,
  FaSmile
} from 'react-icons/fa';

const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen border-r-2">
      <div className="w-[280px] bg-gray-600 h-screen p-5 pt-8 relative duration-300">
        <Link href="/">
          <div className="flex gap-x-4 -mt-8 items-center">
            <div>
              <h1
                className={`text-[20px] mt-10  text-white origin-left duration-200 ${
                  !open && 'scale-0'
                }`}
              >
                Mental Health Support
              </h1>
            </div>
          </div>
        </Link>
        <ul className="pt-6 mt-2">
          <Link href="/mood-tracking">
            <li
              className={`flex rounded-md  cursor-pointer hover:bg-light-white text-sm items-center gap-x-3 ${'bg-white text-black'} ${
                open
                  ? 'px-[16px] py-[12px]'
                  : 'px-[16px] justify-center items-center py-[12px]'
              }`}
            >
              <FaSmile className="w-6 h-6" />
              <span className={`origin-left duration-200 ${!open && 'hidden'}`}>
                Mood Tracker
              </span>
            </li>
          </Link>
          <Link href="">
            <li
              className={`flex rounded-md mt-4  cursor-pointer hover:bg-light-white text-sm items-center gap-x-3 ${'bg-white text-black'} ${
                open
                  ? 'px-[16px] py-[12px]'
                  : 'px-[16px] justify-center items-center py-[12px]'
              }`}
            >
              <FaPrescription className="w-6 h-6" />
              <span className={`origin-left duration-200 ${!open && 'hidden'}`}>
                AI Predictor
              </span>
            </li>
          </Link>
          <Link href="/meditative-chatbot">
            <li
              className={`flex rounded-md mt-4  cursor-pointer hover:bg-light-white text-sm items-center gap-x-3 ${'bg-white text-black'} ${
                open
                  ? 'px-[16px] py-[12px]'
                  : 'px-[16px] justify-center items-center py-[12px]'
              }`}
            >
              <FaPaperPlane className="w-6 h-6" />
              <span className={`origin-left duration-200 ${!open && 'hidden'}`}>
                Meditative Chatbot
              </span>
            </li>
          </Link>
        </ul>

        <ul className="pt-6 mt-24">
          <Link href="/report">
            <li
              className={`flex rounded-md  cursor-pointer hover:bg-light-white text-sm items-center gap-x-3 ${'bg-white text-black'} ${
                open
                  ? 'px-[16px] py-[12px]'
                  : 'px-[16px] justify-center items-center py-[12px]'
              }`}
            >
              <FaFileAlt className="w-6 h-6" />
              <span className={`origin-left duration-200 ${!open && 'hidden'}`}>
                Report
              </span>
            </li>
          </Link> 
          <Link href="/contact-us">
            <li
              className={`flex rounded-md mt-4  cursor-pointer hover:bg-light-white text-sm items-center gap-x-3 ${'bg-white text-black'} ${
                open
                  ? 'px-[16px] py-[12px]'
                  : 'px-[16px] justify-center items-center py-[12px]'
              }`}
            >
              <FaComment className="w-6 h-6" />
              <span className={`origin-left duration-200 ${!open && 'hidden'}`}>
                Contact us
              </span>
            </li>
          </Link>
          <Link href="/settings">
            <li
              className={`flex rounded-md mt-4  cursor-pointer hover:bg-light-white text-sm items-center gap-x-3 ${'bg-white text-black'} ${
                open
                  ? 'px-[16px] py-[12px]'
                  : 'px-[16px] justify-center items-center py-[12px]'
              }`}
            >
              <FaCog className="w-6 h-6" />
              <span className={`origin-left duration-200 ${!open && 'hidden'}`}>
                Settings
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
