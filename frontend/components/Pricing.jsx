import pricingData from "@/data/pricing";
import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <div id="subscribe-section" className="relative mt-[-8rem] xs:mt-[-20vw] sm:mt-[-35vw] md:mt-[-20vw] xl:mt-[-15rem] animate-fade-in">
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
  );
};

export default Pricing;

// const pricingData = [
//   {
//     title: "ScholarTrack.",
//     titleColor: "text-[#FF0000]",
//     focus: "Higher Education, Scholarships, Research Opportunities",
//     idealFor: "Undergraduate, postgraduate students, research aspirants",
//     features: [
//       "Weekly curated list of scholarships and higher education programs",
//       "Country-wise research opportunities and application deadlines",
//       "Guidance content on SOPs, CVs, recommendations, etc.",
//       "Exclusive webinar invites with scholars & alumni",
//     ],
//     price: "30",
//   },
//   {
//     title: "CareerCatch.",
//     titleColor: "text-[#FFFFFF]",
//     focus: "Jobs and Internships (Remote & International)",
//     idealFor: "Graduates, young professionals, skill-ready students",
//     features: [
//       "Curated global job & internship circulars",
//       "Remote and hybrid international work opportunities",
//       "Weekly skill-based opportunity lists",
//       "Tips for job interviews, resume building & portfolio creation",
//     ],
//     price: "30",
//   },
//   {
//     title: "OpT. All-Access",
//     titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-[#FD0000] to-[#FFFFFF]",
//     focus: "Complete Package + Exclusive Content",
//     idealFor: "Those who want full access to every opportunity",
//     features: [
//       "Weekly curated list of scholarships and higher education programs",
//       "Country-wise research opportunities and application deadlines",
//       "Guidance content on SOPs, CVs, recommendations, etc.",
//       "Exclusive webinar invites with scholars & alumni",
//     ],
//     price: "50",
//   },
// ];
