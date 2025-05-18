import { RxCross2 } from "react-icons/rx";
import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";

const UserOption = ({ setUserOptionOpen }) => {
  
  const dispatch = useDispatch();

  return (
    <>
      {/* Sidebar Panel */}
      <div className="absolute top-14 right-6 h-[50vh] w-64 bg-[#1e2761] border rounded-2xl shadow-xl z-50 transition-transform duration-300 translate-x-0">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-4 text-2xl text-white cursor-pointer"
          onClick={() => setUserOptionOpen(false)}
        >
          <RxCross2 />
        </button>

        {/* User Options */}
        <ul className="mt-16 p-4 space-y-4 text-white">
          <Link href="/profile" className="block">
            <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer rounded-md">
              My Profile
            </li>
          </Link>

          <Link href="/update-password" className="block">
            <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer rounded-md">
              Update Password
            </li>
          </Link>

          <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer rounded-md">
            My subscription
          </li>

          <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer rounded-md" onClick={() => dispatch(openModal({modalName: "logout"}))}>
            Logout
          </li>

          <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer rounded-md">
            Delete account
          </li>
        </ul>
      </div>

      {/* Overlay (optional) */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50 z-0"
        onClick={() => setUserOptionOpen(false)}
      ></div>
    </>
  );
};

export default UserOption;
