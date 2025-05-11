"use client"

import { RiPencilLine } from "react-icons/ri";
import UpdateProfileForm from "./UpdateProfileForm";
import { useState } from "react";

const UpdatePopUpButton = () => {
    const [isUpdateFromOpen, setIsUpdateFormOpen] = useState(false)
  return (
    <div className="absolute -top-1 lg:right-10 rounded-2xl text-6xl text-[#65558F] bg-white cursor-pointer" onClick={() => {setIsUpdateFormOpen(true)}}>
        <RiPencilLine />
        {
            isUpdateFromOpen && <UpdateProfileForm />
        }
      </div>
  );
}

export default UpdatePopUpButton;
