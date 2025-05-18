"use client";
import { AlignJustify } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideMenu from "./SideMenu";
import Image from "next/image";
import ModalManager from "../modal/ModalManager";
import { openModal } from "@/redux/slices/modalSlice";
import UserOption from "../UserOption";

const SideMenuControl = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userOptionOpen, setUserOptionOpen] = useState(false);
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  return (
    <>
      <div className="flex gap-5 relative">
        {/* Subscribe Button */}
        <button
          onClick={() => dispatch(openModal({modalName: "signup"}))}
          className="h-10 bg-gradient-to-b from-[#292F6E] to-[#B400CF] rounded-2xl px-2 py-1.5 border-[1px] border-[#F6E8E8] shadow-[0px_4px_43.7px_-1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] hover:scale-105 transition-all duration-300 font-roboto font-semibold cursor-pointer"
        >
          SUBSCRIBE
        </button>

        {/* User Image Icon (only if logged in) */}
        {user?.img && mounted && (
          <div className="relative w-8 h-8 lg:w-10 lg:h-10 mt-1 rounded-full overflow-hidden cursor-pointer">
            <Image
              src={user?.img || "/images/default-profile.jpg"}
              alt="User Profile"
              fill
              sizes="32px"
              style={{ objectFit: "cover" }}
              priority={true}
              onClick={()=> setUserOptionOpen(true)}
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        <AlignJustify
          className="md:hidden mt-2 shadow-2xl"
          onClick={() => setIsMenuOpen(true)}
        />

        {/* Mobile Side Menu */}
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {
          userOptionOpen && <UserOption setUserOptionOpen={setUserOptionOpen} />
        }
      </div>
      <ModalManager />
    </>
  );
};

export default SideMenuControl;
