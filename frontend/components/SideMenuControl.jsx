"use client";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import SideMenu from "./SideMenu";
import LoginModal from "./LoginModal";
import SignupPage from "./SignupModal";

const SideMenuControl = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="flex gap-5">
        {/* Subscribe Button */}
        <button
          onClick={() => setShowSubscribeModal(true)}
          className="h-10 bg-gradient-to-b from-[#292F6E] to-[#B400CF] rounded-2xl px-2 py-1.5 border-[1px] border-[#F6E8E8] shadow-[0px_4px_43.7px_-1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] hover:scale-105 transition-all duration-300 font-roboto font-semibold cursor-pointer"
        >
          SUBSCRIBE
        </button>

        {/* Mobile Menu Button */}
        <AlignJustify
          className="md:hidden mt-2 shadow-2xl"
          onClick={() => setIsMenuOpen(true)}
        />

        {/* Mobile Side Menu */}
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Subscribe (Signup) Modal */}
      {showSubscribeModal && (
        <SignupPage
          onClose={() => setShowSubscribeModal(false)}
          onSwitchToLogin={() => {
            setShowSubscribeModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSubscribeModal(true);
          }}
          onForgotPassword={() => {
            // Optional: open forgot password modal here
            alert("Forgot Password functionality is not yet implemented.");
          }}
        />
      )}
    </>
  );
};

export default SideMenuControl;
