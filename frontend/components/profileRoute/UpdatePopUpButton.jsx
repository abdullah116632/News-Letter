"use client";

import { RiPencilLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";

const UpdatePopUpButton = () => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(openModal({ modalName: "updateProfile" }));
      }}
      className="absolute -top-6 right-4 md:-top-8 md:right-8 lg:-top-10 lg:right-10
                 bg-white text-[#65558F] shadow-lg border border-[#ddd]
                 hover:bg-[#f0eefb] hover:scale-105 transition-all duration-200
                 cursor-pointer flex items-center justify-center
                 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg"
      title="Update Profile"
    >
      <RiPencilLine className="text-xl md:text-2xl lg:text-3xl" />
    </div>
  );
};

export default UpdatePopUpButton;
