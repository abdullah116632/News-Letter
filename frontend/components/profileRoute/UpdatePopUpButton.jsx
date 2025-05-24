"use client"

import { RiPencilLine } from "react-icons/ri";
import UpdateProfileForm from "./UpdateUserModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";

const UpdatePopUpButton = () => {
    const [isUpdateFromOpen, setIsUpdateFormOpen] = useState(false);
    const dispatch = useDispatch();

  return (
    <div className="absolute -top-8 right-5 lg:right-10 rounded-2xl text-6xl text-[#65558F] bg-white cursor-pointer" onClick={() => {console.log("clicked"); dispatch(openModal({modalName: "updateProfile"}))}}>
        <RiPencilLine />
        {/* {
            isUpdateFromOpen && <UpdateProfileForm />
        } */}
      </div>
  );
}

export default UpdatePopUpButton;
