
import PricingCard from "@/components/PricingCard";
import pricingData from "@/data/pricing";


const page = () => {
  return (
    <main>
          <div className="relative mt-10 mb-12 animate-fade-in">
      <div className="px-4 sm:px-7 md:px-4 lg:px-6 xl:px-20">
        <h3 className="font-extrabold font-centuryGothic h-[2.5em] md:h-[1.6em] xl:h-[1.1em] text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300  hover:bg-gradient-to-r hover:from-[#00EEFF] hover:to-[#00F49F] transition-all duration-500" style={{ WebkitTextStroke: "0.0002px #E34DD4" }}>
          Our Packages – Tailored for Every Dreamer
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 sm:mt-10 xl:mt-16 gap-4 xl:gap-8">
          {pricingData.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
    </main>
  );
}

export default page;
