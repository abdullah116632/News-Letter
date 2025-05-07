// import { RiMenuUnfold3Line } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { openModal } from "../redux/modalSlice";
// import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const SideMenu = ({ isMenuOpen, setIsMenuOpen }) => {

//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch()

//   const navigate = useNavigate()
// console.log(isMenuOpen)


  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#050A2A]  shadow-xl z-50 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-4 text-2xl text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <X />
        </button>

        {/* Menu Items */}
        <ul className="mt-16 p-4 space-y-4 text-white hover:bg-amber-700">
          <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer" >
            Home
          </li>
          <li className="p-2 md:hidden hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer" >
            Review
          </li>
          <li className="p-2 md:hidden hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer" >
            Blogs
          </li>
          <li className="p-2 md:hidden hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer" onClick={()=> console.log("clicked")} >
            About us
          </li>
          <li className="p-2 md:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer" >
            Logout
          </li>
        </ul>
      </div>

      {/* Overlay (click outside to close) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideMenu;
