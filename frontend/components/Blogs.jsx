import { blogs } from "@/data/blogs";
import BlogSlider from "./BlogSlider";


const Blogs = () => {
  return (
    <div className="relative w-full mt-10">
      {/* Background Image Layer */}
      <div className='absolute inset-0 -z-10 w-full h-full bg-[url("/images/blogBg.png")] bg-no-repeat bg-contain' />

      {/* Foreground Content */}
      <div className="w-full relative z-10">
        <div className="flex justify-between px-4 md:px-14 lg:px-24 py-3 md:pb-12 md:mb-7">
          <h5 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FB] to-[#FFAE00] w-fit lg:h-[1.2em] text-sm sm:text-xl md:text-3xl lg:text-5xl font-bold">
            Our Blogs: Your Guide to Growth
          </h5>
          <button className="text-[#FF0000] border-2 border-[#FF0000] h-8 sm:h-12 rounded-3xl text-sm lg:text-2xl bg-gradient-to-r from-[#FFFFFF] to-[#999999] font-dmSans font-bold px-2 sm:px-4 cursor-pointer">
            View All
          </button>
        </div>
        <div className="px-6 md:px-3 lg:px-10 xl:px-20">
          <BlogSlider blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Blogs;

