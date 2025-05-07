"use client";

import { FaGraduationCap, FaHandshake, FaLaptopCode, FaUsers, FaFileAlt, FaUserTie } from "react-icons/fa";

const items = [
  {
    title: "Higher Study Opportunities",
    color: "bg-orange-500",
    description:
      "Get regular updates on scholarships, fellowships, and degree programs from top global universities. We include application deadlines, eligibility criteria, and direct links to apply.",
    icon: <FaGraduationCap className="text-4xl text-white" />,
  },
  {
    title: "Research & Academic Programs",
    color: "bg-green-600",
    description:
      "Receive calls for research assistants, conferences, academic grants, and international exchange programs suited for undergraduate and postgraduate students.",
    icon: <FaHandshake className="text-4xl text-white" />,
  },
  {
    title: "Jobs & Remote Internships",
    color: "bg-emerald-600",
    description:
      "Find curated listings of international job openings and virtual internships from reputed organizations—perfect for students and early-career professionals.",
    icon: <FaLaptopCode className="text-4xl text-white" />,
  },
  {
    title: "Specialized Programs & Contests",
    color: "bg-indigo-600",
    description:
      "Access exclusive updates on youth summits, global competitions, training bootcamps, and leadership initiatives.",
    icon: <FaUsers className="text-4xl text-white" />,
  },
  {
    title: "Application Tools & Resources",
    color: "bg-purple-600",
    description:
      "Gain access to career-building tools including CV templates, SOP guides, email formats, and interview preparation tips.",
    icon: <FaFileAlt className="text-4xl text-white" />,
  },
  {
    title: "Career tools and direction guidance",
    color: "bg-rose-500",
    description:
      "Each newsletter includes links to recent blog posts covering career planning, study abroad strategies, and success stories to inspire your next step.",
    icon: <FaUserTie className="text-4xl text-white" />,
  },
];

const OpportunitiesSection = () => {
  return (
    <div className="overflow-x-auto py-10 px-4 bg-white">
      <div className="flex gap-4 min-w-[1200px] w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative w-64 min-h-[370px] flex flex-col justify-between text-white rounded-lg shadow-lg ${item.color} p-4`}
          >
            {/* Arrow shape on left */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white z-10"></div>

            <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
            <p className="text-sm flex-1">{item.description}</p>
            <div className="mt-4 flex justify-center">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesSection;
