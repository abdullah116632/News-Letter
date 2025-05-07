import BlurCircle from "./helper/BlurCircle"
import Image from "next/image";
import SideMenuControl from "./SideMenuControl";


const Navbar = () => {
  return (
    <nav className=" relative z-20">
      <BlurCircle top="top-[-7.5rem]" left="left-[-7.5rem]" className="hidden md:block" />
      <div className="mt-5 h-16">
        <div className="flex m-auto w-full md:w-[90%] h-7">
          {/* logo */}
            <div className="flex-grow z-10">
                <Image src="/images/navLogo.png" alt="nav-image" height={200} width={120} className="relative top-[-1.5rem] md:top-[-1rem] cursor-pointer" />
            </div>

            {/* navlink */}
            <div className="flex">
                <div className=" mr-12">
                    <ul className="hidden md:flex gap-10 pt-1.5 font-roboto">
                        <li className="cursor-pointer hover:text-pink-700">Home</li>
                        <li className="cursor-pointer hover:text-pink-700">Review</li>
                        <li className="cursor-pointer hover:text-pink-700">Blogs</li>
                        <li className="whitespace-nowrap cursor-pointer hover:text-pink-700">About us</li>
                    </ul>
                </div>
                <div className="mr-2 md:mr-0">
                    <SideMenuControl />
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
