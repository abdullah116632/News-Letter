import BlurCircle from "./helper/BlurCircle";

const OurServices = () => {
    return (
      <div className="relative mt-[-5rem] sm:mt-[-3rem] lg:mt-[-3rem] xl:mt-[-15rem] w-[100vw] h-[25rem] md:h-[76vw] bg-[url('/images/serviceDescription.png')] bg-no-repeat bg-contain">
        <BlurCircle left="left-[-7.5rem]" className="hidden md:block" opacity="opacity-70" height="h-[400px]" width="w-[400px]" />
        <div className="absolute left-[6vw] top-[-4rem] md:top-0 lg:top-[-4rem] xl:top-0 flex flex-col items-start max-w-full">
        <h4 className="text-lg xxs:text-2xl lg:text-4xl xl:text-6xl font-bold lg:w-[75vw] xl:mt-10 bg-gradient-to-r from-[#FF8800] to-[#B700FF] bg-clip-text text-transparent">
            Our Deliverables – What You’will Receive in Every Issue
          </h4>
          <p className="text-xs md:text-base lg:text-lg md:font-sans mt-1 xl:mt-4 lg:mt-7 w-[90vw] lg:pr-8 text-justify">At OpT. National, we deliver well-organized, purpose-driven newsletters packed with curated opportunities and actionable resources. Each email is designed to inform, guide, and empower.</p>
        </div>
      </div>
    );
  }
  
  export default OurServices;
  