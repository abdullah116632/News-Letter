"use client";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import SideMenu from "./SideMenu";

const SideMenuControl = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex gap-5">
      <button className="h-10 bg-gradient-to-b from-[#292F6E] to-[#B400CF] rounded-2xl px-2 py-1.5 border-[1px] border-[#F6E8E8] shadow-[0px_4px_43.7px_-1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] hover:scale-105 transition-all duration-300 font-roboto font-semibold cursor-pointer ">
        SUBSCRIBE
      </button>
      <AlignJustify className="md:hidden mt-2 shadow-2xl" onClick={() => setIsMenuOpen(true)} />
      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default SideMenuControl;
